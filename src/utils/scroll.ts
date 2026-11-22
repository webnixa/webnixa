export const sectionIds = {
  home: 'home',
  services: 'services',
  ideas: 'ideas',
  portfolio: 'portfolio',
  demos: 'demos',
  contact: 'contact',
} as const

export type SectionKey = keyof typeof sectionIds

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}