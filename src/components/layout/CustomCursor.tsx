import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    setVisible(true)

    const paint = () => {
      const el = dotRef.current
      if (el) {
        const size = hovering ? 40 : 10
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
      }
      raf.current = 0
    }

    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (!raf.current) raf.current = requestAnimationFrame(paint)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHovering(!!t.closest('a, button, [data-cursor="magnetic"]'))
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [reduced])

  useEffect(() => {
    if (!visible) return
    if (!raf.current) {
      raf.current = requestAnimationFrame(() => {
        const el = dotRef.current
        if (el) {
          const size = hovering ? 40 : 10
          el.style.width = `${size}px`
          el.style.height = `${size}px`
        }
        raf.current = 0
      })
    }
  }, [hovering, visible])

  if (reduced || !visible) return null

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-primary/35 bg-primary/10 will-change-transform"
      aria-hidden
    />
  )
}