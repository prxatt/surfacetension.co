'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';

export default function ContactBackground() {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = containerRef.current;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let rippleVisual: THREE.Points;
    let clock: THREE.Clock;
    let animationId: number;

    const getAdaptiveParticleCount = (base: number) => {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      if (isMobile || isLowEnd) return Math.floor(base * 0.3);
      return base;
    };

    const vertexShader = `
      attribute float aParticleType;
      uniform float uTime;
      uniform float uRippleProgress;
      uniform float uRippleMix;
      varying float vAlpha;
      varying vec3 vColor;
      
      void main() {
        vec3 pos = position;
        float dist = length(pos.xy);
        float originalAnimZ = sin(dist * 1.2 - uTime * 0.15) * 1.5 * exp(-dist * 0.1);
        float rippleTravel = uRippleProgress * 80.0;
        float rippleWidth = 7.0;
        float rippleAmplitude = 10.0;
        float profile = sin((dist - rippleTravel) / rippleWidth * 3.14159);
        profile = max(0.0, profile);
        profile = pow(profile, 2.0);
        float cinematicAnimZ = profile * rippleAmplitude;
        pos.z += mix(originalAnimZ, cinematicAnimZ, uRippleMix);
        float zFactor = 1.0 - clamp(abs(pos.z / 20.0), 0.0, 1.0);
        gl_PointSize = (zFactor * zFactor) * 3.0 + 1.0;
        vAlpha = zFactor * 1.2;
        
        vec3 color1 = vec3(1.0, 0.27, 0.0);
        vec3 color2 = vec3(0.0, 1.0, 0.75);
        vColor = mix(color1, color2, aParticleType);
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying float vAlpha;
      varying vec3 vColor;
      
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        float strength = 1.0 - dist * 2.0;
        vec3 finalColor = clamp(vColor, 0.0, 1.5);
        gl_FragColor = vec4(finalColor, strength * vAlpha);
      }
    `;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2;
      
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const pCount = getAdaptiveParticleCount(80000);
      const geometry = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      const particleTypes = new Float32Array(pCount);
      
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        const r = Math.random() * 30;
        const a = Math.random() * Math.PI * 2;
        pos.set([r * Math.cos(a), r * Math.sin(a), (Math.random() - 0.5) * 12], i3);
        particleTypes[i] = Math.random() < 0.2 ? 1.0 : 0.0;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geometry.setAttribute('aParticleType', new THREE.BufferAttribute(particleTypes, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uRippleProgress: { value: 0 },
          uRippleMix: { value: 0 },
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      rippleVisual = new THREE.Points(geometry, material);
      scene.add(rippleVisual);

      clock = new THREE.Clock();
      
      const startMasterAnimation = () => {
        const uniforms = (rippleVisual.material as THREE.ShaderMaterial).uniforms;
        
        function runRippleCycle() {
          uniforms.uRippleProgress.value = 0;
          gsap
            .timeline({
              onComplete: () => {
                setTimeout(runRippleCycle, 8000);
              },
            })
            .to(uniforms.uRippleProgress, {
              value: 1,
              duration: 20,
              ease: 'power1.inOut',
            })
            .fromTo(
              uniforms.uRippleMix,
              { value: 0 },
              {
                value: 1,
                duration: 7,
                ease: 'sine.in',
              },
              0
            )
            .to(
              uniforms.uRippleMix,
              {
                value: 0,
                duration: 7,
                ease: 'sine.out',
              },
              '>-7'
            );
        }
        
        setTimeout(runRippleCycle, 6000);
      };

      startMasterAnimation();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        if (rippleVisual) {
          (rippleVisual.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsedTime;
          renderer.render(scene, camera);
        }
      };

      animate();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <canvas
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-80 pointer-events-none"
      aria-hidden="true"
    />
  );
}
