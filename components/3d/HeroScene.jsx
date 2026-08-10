// components/3d/HeroScene.jsx
'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Preload, Environment } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/logo.glb');

function RendererPatch() {
  const { gl } = useThree();
  useEffect(() => {
    gl.shadowMap.enabled = false;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);
  return null;
}

function LogoModel({ mouse }) {
  const wrapRef = useRef();
  const spinRef = useRef();
  const { scene } = useGLTF('/logo.glb');
  const smooth = useRef({ x: 0, y: 0 });
  const intro = useRef(0);

  const { cloned, logoScale, offset } = useMemo(() => {
    const cloned = scene.clone(true);

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e0f2fe'),
      metalness: 1.0,
      roughness: 0.12,
      envMapIntensity: 3.0,
      emissive: new THREE.Color('#3b82f6'),
      emissiveIntensity: 0.5,
    });

    cloned.traverse((c) => {
      if (c.isMesh) {
        c.material = mat;
        c.castShadow = false;
        c.receiveShadow = false;
        c.frustumCulled = false;
        if (c.geometry) c.geometry.computeVertexNormals();
      }
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const s = 3.0 / Math.max(size.x, size.y, size.z);
    const center = box.getCenter(new THREE.Vector3());
    return { cloned, logoScale: s, offset: center.negate() };
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (!wrapRef.current || !spinRef.current) return;
    const t = clock.elapsedTime;
    const d = Math.min(delta, 0.033); // Cap at ~30fps delta for consistency

    // Smooth intro with exponential ease
    intro.current += (1 - intro.current) * d * 2.5;
    intro.current = Math.min(intro.current, 0.9999);
    wrapRef.current.scale.setScalar(intro.current * logoScale);

    // Ultra-smooth mouse follow (exponential interpolation)
    const mx = mouse?.x ?? 0;
    const my = mouse?.y ?? 0;
    const lerpFactor = 1 - Math.pow(0.05, d); // Frame-rate independent smoothing
    smooth.current.x += (mx - smooth.current.x) * lerpFactor;
    smooth.current.y += (my - smooth.current.y) * lerpFactor;

    // Continuous rotation + mouse influence
    spinRef.current.rotation.y = t * 0.45 + smooth.current.x * 0.25;
    spinRef.current.rotation.x = smooth.current.y * 0.15 + Math.sin(t * 0.35) * 0.04;
    spinRef.current.rotation.z = Math.sin(t * 0.25) * 0.02;

    // Organic floating
    spinRef.current.position.y =
      Math.sin(t * 0.6) * 0.05 +
      Math.sin(t * 1.1) * 0.015 +
      Math.sin(t * 0.3) * 0.01;
    spinRef.current.position.x = Math.cos(t * 0.4) * 0.02;
  });

  return (
    <group ref={wrapRef} scale={0}>
      <group ref={spinRef}>
        <group position={[offset.x, offset.y, offset.z]}>
          <primitive object={cloned} />
        </group>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} color="#bfdbfe" />
      <directionalLight position={[2, 3, 4]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-3, 2, -3]} intensity={2.0} color="#60a5fa" />
      <pointLight position={[0, -2, 3]} intensity={1.8} color="#06b6d4" distance={10} decay={2} />
      <pointLight position={[3, 0, 2]} intensity={1.4} color="#818cf8" distance={8} decay={2} />
      <pointLight position={[-2, -1, 2]} intensity={0.8} color="#3b82f6" distance={8} decay={2} />
    </>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <RendererPatch />
      <Lights />
      <Environment preset="city" background={false} environmentIntensity={0.7} />
      <LogoModel mouse={mouse} />
      <Preload all />
    </>
  );
}

export default function HeroScene({ mouse }) {
  return (
    <Canvas
      shadows={false}
      camera={{ position: [0, 0, 4.5], fov: 42, near: 0.1, far: 15 }}
      dpr={[1, 2]}
      frameloop="always"
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}