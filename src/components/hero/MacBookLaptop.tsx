import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createMacBookTextures } from './macbookTextures'
import { damp, heroMouse } from './heroSceneState'

const SILVER = new THREE.MeshStandardMaterial({
  color: '#c8ccd4',
  metalness: 0.86,
  roughness: 0.28,
})
const SILVER_EDGE = new THREE.MeshStandardMaterial({
  color: '#e2e5eb',
  metalness: 0.9,
  roughness: 0.2,
})
const KEY_MAT = new THREE.MeshStandardMaterial({
  color: '#2f3339',
  metalness: 0.25,
  roughness: 0.55,
})
const TRACKPAD = new THREE.MeshStandardMaterial({
  color: '#4a4f57',
  metalness: 0.35,
  roughness: 0.42,
})
const BEZEL = new THREE.MeshStandardMaterial({ color: '#16181d', metalness: 0.35, roughness: 0.45 })

/** Laptop width (X), depth (Z), hinge at -Z */
const W = 1.65
const D = 1.1
const BASE_H = 0.048
const HINGE_Z = -D / 2 + 0.02
const LID_OPEN = -1.12

function KeyboardKeys() {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { positions } = useMemo(() => {
    const cols = 12
    const rows = 4
    const positions: [number, number][] = []
    const kx = 0.1
    const kz = 0.075
    const startX = -((cols - 1) * kx) / 2
    const startZ = D / 2 - 0.38
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push([startX + c * kx, startZ + r * kz])
      }
    }
    return { positions }
  }, [])

  useLayoutEffect(() => {
    if (!mesh.current) return
    positions.forEach(([x, z], i) => {
      dummy.position.set(x, BASE_H / 2 + 0.004, z)
      dummy.scale.set(0.088, 0.01, 0.058)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }, [dummy, positions])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, positions.length]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={KEY_MAT} attach="material" />
    </instancedMesh>
  )
}

export function MacBookLaptop() {
  const floatRef = useRef<THREE.Group>(null!)
  const motion = useRef({ intro: 0 })
  const reduced = useReducedMotion()
  const textures = useMemo(() => createMacBookTextures(), [])

  useLayoutEffect(() => () => textures.dispose(), [textures])

  useFrame((state, delta) => {
    if (!floatRef.current) return
    const t = state.clock.elapsedTime
    motion.current.intro = Math.min(1, motion.current.intro + delta * 0.7)
    const introEase = 1 - Math.pow(1 - motion.current.intro, 3)

    floatRef.current.position.y = damp(
      floatRef.current.position.y,
      reduced ? 0 : Math.sin(t * 0.4) * 0.035,
      0.05,
    )
    floatRef.current.rotation.y = damp(floatRef.current.rotation.y, -0.48 + heroMouse.current.x * 0.08, 0.06)
    floatRef.current.rotation.x = damp(floatRef.current.rotation.x, 0.22 + heroMouse.current.y * 0.04, 0.06)
    const s = 0.92 + introEase * 0.08
    floatRef.current.scale.setScalar(s)
  })

  return (
    <group ref={floatRef}>
      {/* Aluminum base deck */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, BASE_H, D]} />
        <primitive object={SILVER} attach="material" />
      </mesh>
      {/* Side metal edges */}
      <mesh position={[W / 2, 0, 0]}>
        <boxGeometry args={[0.006, BASE_H + 0.004, D]} />
        <primitive object={SILVER_EDGE} attach="material" />
      </mesh>
      <mesh position={[-W / 2, 0, 0]}>
        <boxGeometry args={[0.006, BASE_H + 0.004, D]} />
        <primitive object={SILVER_EDGE} attach="material" />
      </mesh>

      {/* Keyboard texture under keys */}
      <mesh position={[0, BASE_H / 2 + 0.001, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W * 0.88, D * 0.62]} />
        <meshStandardMaterial map={textures.keyboard} roughness={0.65} metalness={0.1} />
      </mesh>

      <KeyboardKeys />

      {/* Trackpad */}
      <mesh position={[0, BASE_H / 2 + 0.005, D / 2 - 0.22]} receiveShadow>
        <boxGeometry args={[0.48, 0.008, 0.3]} />
        <primitive object={TRACKPAD} attach="material" />
      </mesh>
      <mesh position={[0, BASE_H / 2 + 0.006, D / 2 - 0.22]}>
        <boxGeometry args={[0.46, 0.002, 0.28]} />
        <meshStandardMaterial color="#5a5f66" roughness={0.35} />
      </mesh>

      {/* Hinge */}
      <mesh position={[0, BASE_H / 2, HINGE_Z]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, W * 0.96, 20]} />
        <meshStandardMaterial color="#a8adb5" metalness={0.88} roughness={0.3} />
      </mesh>

      {/* Display lid — rotates from hinge */}
      <group position={[0, BASE_H / 2, HINGE_Z]} rotation={[LID_OPEN, 0, 0]}>
        {/* Lid shell: thin in Z, tall in Y */}
        <mesh position={[0, D * 0.48, 0.016]} castShadow>
          <boxGeometry args={[W, D * 0.94, 0.032]} />
          <primitive object={SILVER} attach="material" />
        </mesh>

        {/* Bezel (black frame) — front face toward +Z in lid space */}
        <mesh position={[0, D * 0.48, 0.033]}>
          <boxGeometry args={[W * 0.94, D * 0.88, 0.006]} />
          <primitive object={BEZEL} attach="material" />
        </mesh>

        {/* LCD — plane facing +Z (toward viewer when open) */}
        <mesh position={[0, D * 0.48, 0.037]}>
          <planeGeometry args={[W * 0.86, D * 0.8]} />
          <meshBasicMaterial map={textures.screen} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>

        {/* Glass glare */}
        <mesh position={[0, D * 0.48, 0.0385]}>
          <planeGeometry args={[W * 0.86, D * 0.8]} />
          <meshBasicMaterial
            map={textures.sheen}
            transparent
            opacity={0.35}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -BASE_H / 2 - 0.02, 0.05]}>
        <circleGeometry args={[0.95, 40]} />
        <meshBasicMaterial color="#6C19FF" transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  )
}