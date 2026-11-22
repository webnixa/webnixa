/** Shared pointer + scroll state for the hero R3F scene (avoids prop drilling into Canvas). */
export const heroMouse = { current: { x: 0, y: 0 } }
export const heroScrollDepth = { current: 0 }

export function damp(current: number, target: number, smooth = 0.08) {
  return current + (target - current) * smooth
}