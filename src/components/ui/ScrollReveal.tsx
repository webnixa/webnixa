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

export function ScrollReveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !ref.current) return

    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [delay, reduced])

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}