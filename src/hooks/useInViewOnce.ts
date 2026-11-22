import { type RefObject, useEffect, useState } from 'react'

export function useInView(ref: RefObject<Element | null>, rootMargin = '200px 0px') {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}