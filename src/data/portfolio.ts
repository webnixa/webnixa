export interface PortfolioProject {
  id: string
  title: string
  category: 'Website' | 'App' | 'AI'
  description: string
  longDescription: string
  features: string[]
  gradient: string
  accent: string
  isSampleDemo: true
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'analytics',
    title: 'Business Analytics Dashboard',
    category: 'Website',
    description: 'Interactive KPI workspace with glass panels and live-style charts.',
    longDescription:
      'A sample analytics experience demonstrating how Webnixa structures dashboards for clarity, speed, and executive decision-making.',
    features: [
      'Modular glass KPI cards',
      'Animated chart transitions',
      'Responsive admin layout',
      'Purple brand theming',
    ],
    gradient: 'from-violet/20 via-lavender to-white',
    accent: '#8D4DFF',
    isSampleDemo: true,
  },
  {
    id: 'fitness',
    title: 'Fitness Tracker App',
    category: 'App',
    description: 'Mobile progress rings, goals, and activity summaries.',
    longDescription:
      'A concept fitness application UI showcasing onboarding, metrics, and delightful motion on small screens.',
    features: [
      'Progress ring components',
      'Goal tracking screens',
      'Soft lavender UI system',
      'Touch-first navigation',
    ],
    gradient: 'from-primary/15 via-lavender to-soft-bg',
    accent: '#6C19FF',
    isSampleDemo: true,
  },
  {
    id: 'ai-chat',
    title: 'AI Chat Assistant',
    category: 'AI',
    description: 'Conversational assistant with suggested replies and workflow hints.',
    longDescription:
      'A demo AI chat pattern for support and automation — illustrates memory, handoff, and friendly agent personality.',
    features: [
      'Message stream UI',
      'Suggested prompts',
      'Agent avatar motion',
      'Workflow automation hints',
    ],
    gradient: 'from-purple-200/40 via-lavender to-white',
    accent: '#6C19FF',
    isSampleDemo: true,
  },
]