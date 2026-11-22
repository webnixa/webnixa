import { useScroll, useTransform } from 'framer-motion'
import { type RefObject, useEffect } from 'react'
import { heroScrollDepth } from '../components/hero/heroSceneState'

export function useHeroScrollDepth(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const depth = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const unsub = depth.on('change', (v) => {
      heroScrollDepth.current = v
    })
    return () => unsub()
  }, [depth])

  return depth
}