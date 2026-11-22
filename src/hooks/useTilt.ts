import { type RefObject, useCallback } from 'react'

export function useTilt(ref: RefObject<HTMLElement | null>, max = 8) {
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      ref.current.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(0)`
    },
    [ref, max],
  )

  const onLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
    ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
    window.setTimeout(() => {
      if (ref.current) ref.current.style.transition = ''
    }, 560)
  }, [ref])

  return { onMove, onLeave }
}