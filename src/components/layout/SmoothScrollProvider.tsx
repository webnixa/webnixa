import type { ReactNode } from 'react'

/** Native browser scroll only — avoids Lenis wheel hijacking and scroll lock jank. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}