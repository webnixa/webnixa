import { useEffect, useState } from 'react'

const DEFAULT_IDS = ['home', 'services', 'ideas', 'portfolio', 'demos', 'contact']

export function useActiveSection(sectionIds: string[] = DEFAULT_IDS) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}