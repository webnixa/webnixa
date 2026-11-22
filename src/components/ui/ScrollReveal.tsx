import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

function revealNow(el: HTMLElement) {
  gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
}

export function ScrollReveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      revealNow(el)
      return
    }

    let safetyTimer: number | undefined

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        },
      )

      const ensureVisibleIfNeeded = () => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0
        const opacity = Number(gsap.getProperty(el, 'opacity'))
        if (inView && opacity < 0.99) {
          tween.progress(1)
          revealNow(el)
        }
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        ensureVisibleIfNeeded()
      })

      safetyTimer = window.setTimeout(() => {
        if (Number(gsap.getProperty(el, 'opacity')) < 0.99) {
          revealNow(el)
        }
      }, 2200)
    }, ref)

    return () => {
      if (safetyTimer) window.clearTimeout(safetyTimer)
      ctx.revert()
    }
  }, [delay, reduced])

  return (
    <div ref={ref} className={`scroll-reveal-safe ${className}`.trim()}>
      {children}
    </div>
  )
}