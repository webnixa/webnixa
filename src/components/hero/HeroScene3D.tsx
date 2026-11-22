import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useInView } from '../../hooks/useInViewOnce'
import { HeroLaptopFallback } from './HeroLaptopFallback'
import { MacBookLaptop } from './MacBookLaptop'
import { damp, heroMouse } from './heroSceneState'

function CameraRig({ active }: { active: boolean }) {
  const { camera } = useThree()
  const smooth = useRef({ x: 0, y: 0.48, z: 5.2 })

  useFrame(() => {
    if (!active) return
    smooth.current.x = damp(smooth.current.x, heroMouse.current.x * 0.12, 0.06)
    smooth.current.y = damp(smooth.current.y, 0.48 + heroMouse.current.y * 0.06, 0.06)
    camera.position.set(smooth.current.x, smooth.current.y, smooth.current.z)
    camera.lookAt(0, 0.12, 0)
  })
  return null
}

function SceneContent({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={1.25} />
      <hemisphereLight intensity={0.5} color="#EDE3FF" groundColor="#94a3b8" />
      <directionalLight position={[5, 8, 4]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, 3, 2]} intensity={0.35} color="#8D4DFF" />

      <CameraRig active={active} />
      <group position={[0, -0.05, 0]}>
        <MacBookLaptop />
      </group>
    </>
  )
}

type Props = { className?: string; sceneActive: boolean }

function HeroCanvas({ className, sceneActive }: Props) {
  const dpr = useMemo(
    () => Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.35),
    [],
  )

  return (
    <div
      className={`hero-stage relative h-[min(440px,58vh)] w-full md:h-[500px] lg:h-[540px] ${className}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        heroMouse.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        }
      }}
      onPointerLeave={() => {
        heroMouse.current = { x: 0, y: 0 }
      }}
    >
      <Canvas
        camera={{ position: [0, 0.48, 5.2], fov: 42 }}
        dpr={dpr}
        frameloop={sceneActive ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="!bg-transparent"
      >
        <Suspense fallback={null}>
          <SceneContent active={sceneActive} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function HeroScene3D({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, '120px 0px')
  const sceneActive = inView && !reduced && !isMobile

  if (reduced || isMobile) {
    return (
      <div ref={containerRef} className={`h-[min(380px,50vh)] md:h-[440px] ${className}`}>
        <HeroLaptopFallback className="h-full" />
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      <HeroCanvas className={className} sceneActive={sceneActive} />
    </div>
  )
}