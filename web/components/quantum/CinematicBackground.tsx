'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(20, 12, 1, 1);

    const simplex = `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g, l.zxy); vec3 i2 = max(g, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857; vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y); vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m; return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uNoiseSeed: { value: Math.random() * 1000 },
      // Existing 6 colors: deep dark red, vanta black, saffron, green, royal dark blue
      uColor1: { value: new THREE.Color(0x000000) },   // Vanta Black
      uColor2: { value: new THREE.Color(0x002366) },   // Royal Dark Blue
      uColor3: { value: new THREE.Color(0xFFB800) },   // Saffron
      uColor4: { value: new THREE.Color(0x001a0f) },   // Dark Green
      uColor5: { value: new THREE.Color(0x8B0000) },   // Deep Dark Red
      uColor6: { value: new THREE.Color(0xE5E5E5) },   // Platinum - replaces saffron variation
      // NEW: 3 additional colors added seamlessly
      uColor7: { value: new THREE.Color(0xB76E79) },   // Rose Gold
      uColor8: { value: new THREE.Color(0x856798) },   // Lavender Purple
      uColor9: { value: new THREE.Color(0x006400) },   // Dark Green (additional)
    } as const;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms as any,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `
        precision highp float;
        ${simplex}
        varying vec2 vUv;
        uniform float uTime; uniform float uNoiseSeed;
        uniform vec3 uColor1, uColor2, uColor3, uColor4, uColor5, uColor6, uColor7, uColor8, uColor9;
        // Palette function for 5 colors - wider bell curves for better visibility and smoother flow
        vec3 palette5(float n, vec3 a, vec3 b, vec3 c, vec3 d, vec3 e){
          float t = n * 0.5 + 0.5;
          // Wider, more overlapping bell curves for smoother organic flow
          float w1 = smoothstep(0.0, 0.3, t) * smoothstep(0.6, 0.3, t); // Color a - wider range
          float w2 = smoothstep(0.1, 0.4, t) * smoothstep(0.7, 0.4, t); // Color b - wider range
          float w3 = smoothstep(0.25, 0.55, t) * smoothstep(0.8, 0.55, t); // Color c - wider range
          float w4 = smoothstep(0.4, 0.7, t) * smoothstep(0.9, 0.7, t); // Color d - wider range
          float w5 = smoothstep(0.55, 0.85, t) * smoothstep(1.0, 0.85, t); // Color e - wider range
          // Wrap around for seamless transition
          w1 += smoothstep(0.85, 1.0, t) * 0.6; // Stronger wrap for continuity
          // Normalize weights
          float totalWeight = w1 + w2 + w3 + w4 + w5 + 0.001;
          w1 /= totalWeight; w2 /= totalWeight; w3 /= totalWeight; w4 /= totalWeight; w5 /= totalWeight;
          return a * w1 + b * w2 + c * w3 + d * w4 + e * w5;
        }
        // Palette function for 4 colors - wider bell curves for better visibility and smoother flow
        vec3 palette4(float n, vec3 a, vec3 b, vec3 c, vec3 d){
          float t = n * 0.5 + 0.5;
          // Wider, more overlapping bell curves for smoother organic flow
          float w1 = smoothstep(0.0, 0.35, t) * smoothstep(0.65, 0.35, t); // Color a - wider range
          float w2 = smoothstep(0.15, 0.5, t) * smoothstep(0.8, 0.5, t); // Color b - wider range
          float w3 = smoothstep(0.35, 0.7, t) * smoothstep(0.95, 0.7, t); // Color c - wider range
          float w4 = smoothstep(0.55, 0.9, t) * smoothstep(1.0, 0.9, t); // Color d - wider range
          // Wrap around for seamless transition
          w1 += smoothstep(0.9, 1.0, t) * 0.6; // Stronger wrap for continuity
          // Normalize weights
          float totalWeight = w1 + w2 + w3 + w4 + 0.001;
          w1 /= totalWeight; w2 /= totalWeight; w3 /= totalWeight; w4 /= totalWeight;
          return a * w1 + b * w2 + c * w3 + d * w4;
        }
        void main(){
          vec2 base = vUv - 0.5;
          base *= (1.0 - sin(uTime * 0.015) * 0.04); // Smoother, slower breathing
          base += vec2(uTime * 0.008, uTime * 0.004); // Slower drift for organic flow

          float tA = uTime * 0.08; // Slower for smoother organic flow
          float nA1 = snoise(vec3(base * 1.2 + uNoiseSeed, tA));
          float nA2 = snoise(vec3(base * 2.5 + nA1 * 0.2, tA));
          // Palette A: 5 colors (vanta black, navy, rose gold, lavender purple, platinum)
          // All colors evenly distributed - no saffron here
          vec3 colA = palette5(nA2, uColor1, uColor2, uColor7, uColor8, uColor6);

          float tB = uTime * 0.06; // Slower for smoother organic flow
          float nB1 = snoise(vec3(base * 1.0 + uNoiseSeed + 10.0, tB));
          float nB2 = snoise(vec3(base * 3.5 + nB1 * 0.3, tB));
          // Palette B: 4 colors (dark green, dark red, saffron, dark green additional)
          // Saffron appears only once here, ensuring equal treatment
          vec3 colB = palette4(nB2, uColor4, uColor5, uColor3, uColor9);

          float mask = snoise(vec3(base * 0.6 + uNoiseSeed - 20.0, uTime * 0.05)); // Slower mask animation
          float mixThreshold = 0.1; float mixSharp = 0.25; // Wider blend zone for smoother transitions
          float mixF = smoothstep(mixThreshold, mixThreshold + mixSharp, mask);

          vec3 finalColor = mix(colA, colB, mixF);
          float vignette = 1.0 - pow(length(vUv - 0.5) * 1.2, 2.0);
          finalColor *= vignette * 0.9;
          finalColor += (snoise(vec3(vUv * 800.0, uTime * 1.5)) * 0.5 + 0.5) * 0.008; // Slower, subtler grain
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      (material.uniforms as any).uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if ((material.uniforms as any).uResolution) {
        (material.uniforms as any).uResolution.value.set(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    // store refs
    rendererRef.current = renderer; sceneRef.current = scene; cameraRef.current = camera; meshRef.current = mesh;

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
}
