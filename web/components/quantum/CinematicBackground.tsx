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
      uColor1: { value: new THREE.Color().setHSL(0.6, 0.7, 0.1) },
      uColor2: { value: new THREE.Color().setHSL(0.75, 0.8, 0.45) },
      uColor3: { value: new THREE.Color().setHSL(0.2, 0.9, 0.65) },
      uColor4: { value: new THREE.Color().setHSL(0.1, 0.6, 0.1) },
      uColor5: { value: new THREE.Color().setHSL(0.2, 0.7, 0.5) },
      uColor6: { value: new THREE.Color().setHSL(0.6, 0.8, 0.7) },
    } as const;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms as any,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `
        precision highp float;
        ${simplex}
        varying vec2 vUv;
        uniform float uTime; uniform float uNoiseSeed;
        uniform vec3 uColor1, uColor2, uColor3, uColor4, uColor5, uColor6;
        vec3 palette(float n, vec3 a, vec3 b, vec3 c){
          vec3 color = mix(a, b, smoothstep(-0.2, 0.2, n));
          color = mix(color, c, smoothstep(0.2, 0.4, n));
          return color;
        }
        void main(){
          vec2 base = vUv - 0.5;
          base *= (1.0 - sin(uTime * 0.02) * 0.05);
          base += vec2(uTime * 0.01, uTime * 0.005);

          float tA = uTime * 0.1;
          float nA1 = snoise(vec3(base * 1.2 + uNoiseSeed, tA));
          float nA2 = snoise(vec3(base * 2.5 + nA1 * 0.2, tA));
          vec3 colA = palette(nA2, uColor1, uColor2, uColor3);

          float tB = uTime * 0.08;
          float nB1 = snoise(vec3(base * 1.0 + uNoiseSeed + 10.0, tB));
          float nB2 = snoise(vec3(base * 3.5 + nB1 * 0.3, tB));
          vec3 colB = palette(nB2, uColor4, uColor5, uColor6);

          float mask = snoise(vec3(base * 0.6 + uNoiseSeed - 20.0, uTime * 0.06));
          float mixThreshold = 0.1; float mixSharp = 0.2;
          float mixF = smoothstep(mixThreshold, mixThreshold + mixSharp, mask);

          vec3 finalColor = mix(colA, colB, mixF);
          float vignette = 1.0 - pow(length(vUv - 0.5) * 1.2, 2.0);
          finalColor *= vignette * 0.9;
          finalColor += (snoise(vec3(vUv * 800.0, uTime * 2.0)) * 0.5 + 0.5) * 0.01;
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

