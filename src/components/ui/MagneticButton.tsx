import { motion } from 'framer-motion'
import { type ReactNode, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost' | 'glass'
  href?: string
}

const variants = {
  primary:
    'bg-gradient-to-r from-primary to-violet text-white shadow-lg shadow-primary/25 hover:shadow-primary/35',
  ghost: 'border border-lavender bg-white/80 text-dark hover:border-violet/40',
  glass: 'glass text-dark hover:bg-white/90',
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  variant = 'primary',
  href,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    ref.current.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

  const inner = (
    <>
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-cursor="magnetic"
        className={`${base} ${variants[variant]} ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      data-cursor="magnetic"
      className={`${base} ${variants[variant]} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  )
}