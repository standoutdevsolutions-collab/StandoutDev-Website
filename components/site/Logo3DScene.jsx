// components/site/Logo3DScene.jsx
'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/logo.glb')

function Logo3D() {
  const { scene } = useGLTF('/logo.glb')
  const ref = useRef(null)

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref} scale={1.5} position={[0, -0.8, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

function OrbitRings() {
  const ring1 = useRef(null)
  const ring2 = useRef(null)
  const ring3 = useRef(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) ring1.current.rotation.z = t * 0.2
    if (ring2.current) ring2.current.rotation.z = -t * 0.15
    if (ring3.current) ring3.current.rotation.z = t * 0.1
  })

  return (
    <group position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={ring1}>
        <ringGeometry args={[2.2, 2.22, 128]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2}>
        <ringGeometry args={[2.6, 2.62, 128]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring3}>
        <ringGeometry args={[3.0, 3.02, 128]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function Logo3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[5, -2, 3]} intensity={1.2} color="#6366f1" />
        <spotLight position={[0, 8, 0]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
        <Logo3D />
        <OrbitRings />
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.6}
          scale={8}
          blur={2.5}
          far={4}
          color="#1e3a8a"
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}