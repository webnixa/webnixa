import { useEffect, useRef } from 'react'
import { drawWebnixaScreen } from './webnixaScreenCanvas'

/** Lightweight hero visual for mobile / reduced motion. */
export function HeroLaptopFallback({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = 640 * dpr
    canvas.height = 400 * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      drawWebnixaScreen(canvas)
    }
  }, [])

  return (
    <div className={`hero-stage relative flex items-center justify-center ${className}`} aria-hidden>
      <div className="w-[92%] max-w-md">
        <div
          className="relative rounded-2xl p-[10px] shadow-xl"
          style={{
            background: 'linear-gradient(145deg, #6d747f, #4b515a)',
          }}
        >
          <div className="overflow-hidden rounded-lg border border-black/40 bg-black p-1">
            <canvas ref={canvasRef} className="block w-full rounded" />
          </div>
          <div
            className="mx-auto mt-2 h-1.5 w-[88%] rounded-full"
            style={{ background: 'linear-gradient(90deg, #5c626c, #3f454d)' }}
          />
        </div>
      </div>
    </div>
  )
}