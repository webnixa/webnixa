import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const sectionIds = {
  home: 'home',
  services: 'services',
  ideas: 'ideas',
  portfolio: 'portfolio',
  demos: 'demos',
  contact: 'contact',
} as const

export type SectionKey = keyof typeof sectionIds

type ScrollAlign = 'start' | 'center' | 'visible'

type ScrollOptions = {
  align?: ScrollAlign
  behavior?: ScrollBehavior
  /** Extra gap below fixed header (px). */
  extraOffset?: number
}

/** Measures fixed site header (navbar) height for scroll positioning. */
export function getSiteHeaderOffset(extra = 16): number {
  const header = document.querySelector('header.fixed')
  if (header instanceof HTMLElement) {
    return Math.ceil(header.getBoundingClientRect().height) + extra
  }
  return 96 + extra
}

export function scrollElementIntoView(
  target: HTMLElement | null | undefined,
  options: ScrollOptions = {},
) {
  if (!target) return

  const behavior = options.behavior ?? 'smooth'
  const headerOffset = getSiteHeaderOffset(options.extraOffset ?? 16)
  const rect = target.getBoundingClientRect()
  const viewportH = window.innerHeight
  const docY = window.scrollY + rect.top
  const elBottom = docY + rect.height
  const padding = 20

  let nextTop = window.scrollY

  switch (options.align ?? 'start') {
    case 'center':
      nextTop = docY - headerOffset - (viewportH - headerOffset) / 2 + rect.height / 2
      break
    case 'visible': {
      const viewTop = window.scrollY + headerOffset
      const viewBottom = window.scrollY + viewportH - padding
      if (docY >= viewTop && elBottom <= viewBottom) return
      if (elBottom > viewBottom) {
        nextTop = elBottom - (viewportH - padding)
      } else if (docY < viewTop) {
        nextTop = docY - headerOffset
      }
      break
    }
    case 'start':
    default:
      nextTop = docY - headerOffset
  }

  window.scrollTo({ top: Math.max(0, nextTop), behavior })
}

function refreshScrollTriggers() {
  window.setTimeout(() => ScrollTrigger.refresh(), 450)
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    scrollElementIntoView(el, { align: 'start', behavior: 'smooth' })
    refreshScrollTriggers()
  }
}

/** Opens the enquiry form with service options visible below the navbar. */
export function scrollToEnquiryForm() {
  const anchor = document.getElementById('enquiry-service-step')
  const section = document.getElementById('ideas')
  const target = anchor ?? section
  if (target) {
    scrollElementIntoView(target, { align: 'start', extraOffset: 20, behavior: 'smooth' })
    refreshScrollTriggers()
  }
}