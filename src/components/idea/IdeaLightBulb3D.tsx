import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { heroMouse } from '../hero/heroSceneState'

function Bulb({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const glow = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.4) * 0.15 + heroMouse.current.x * 0.08
      group.current.position.y = Math.sin(t * 0.8) * 0.04
    }
    if (glow.current) {
      const base = active ? 1.6 : 0.85
      glow.current.intensity = base + Math.sin(t * 2) * 0.12
    }
  })

  return (
    <group ref={group}>
      <pointLight ref={glow} position={[0, 0.4, 0.6]} color="#8D4DFF" intensity={0.85} distance={4} />
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFF9E8"
          emissive="#6C19FF"
          emissiveIntensity={active ? 0.35 : 0.12}
          roughness={0.15}
          metalness={0.05}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.22, 24]} />
        <meshStandardMaterial color="#d4c8ee" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.12, 0.02, 12, 32]} />
        <meshStandardMaterial color="#6C19FF" emissive="#6C19FF" emissiveIntensity={active ? 0.8 : 0.3} />
      </mesh>
    </group>
  )
}

type Props = {
  active?: boolean
  className?: string
}

export function IdeaLightBulb3D({ active = false, className = '' }: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div
        className={`flex h-40 w-40 items-center justify-center rounded-full bg-lavender/60 ${className}`}
        aria-hidden
      >
        <div className="h-16 w-16 rounded-full bg-primary/20" />
      </div>
    )
  }

  return (
    <div className={`h-44 w-44 ${className}`} aria-hidden>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 3, 2]} intensity={0.6} />
        <Suspense fallback={null}>
          <Bulb active={active} />
        </Suspense>
      </Canvas>
    </div>
  )
}