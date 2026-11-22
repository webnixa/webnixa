export type EnquiryService = 'website' | 'mobile' | 'ai' | 'other'

export const BUDGET_OPTIONS = [
  'Under ₹5,000',
  '₹5,000 – ₹15,000',
  '₹15,000 – ₹30,000',
  '₹30,000 – ₹75,000',
  '₹75,000+',
  'Not sure yet',
] as const

export const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 1–2 weeks',
  'Within 1 month',
  'Within 2–3 months',
  'Flexible',
] as const

export type WebsiteType =
  | 'Business Website'
  | 'Portfolio Website'
  | 'Ecommerce Website'
  | 'Landing Page'
  | 'Booking Website'
  | 'Educational Website'
  | 'Blog / Content Website'
  | 'Custom Website'

export interface EnquiryFormState {
  service: EnquiryService | ''

  fullName: string
  businessName: string
  whatsapp: string
  email: string
  location: string
  description: string
  budget: (typeof BUDGET_OPTIONS)[number] | ''
  timeline: (typeof TIMELINE_OPTIONS)[number] | ''

  // Website
  websiteType: WebsiteType | ''
  pageCount: string
  hasDomain: string
  needsHosting: string
  hasExistingWebsite: string
  existingWebsiteUrl: string
  websiteFeatures: string[]
  websiteReferences: string
  websiteExtra: string

  // Mobile
  appPlatform: string
  appCategory: string
  appPurpose: string
  appAudience: string
  appFeatures: string[]
  appAdminPanel: string
  appReferences: string
  appExtra: string

  // AI
  aiProcess: string
  aiManualWorkflow: string
  aiGoal: string
  aiChannel: string
  aiAutomationType: string
  aiTools: string
  aiFrequency: string
  aiExpectedResult: string
  aiExtra: string

  // Other
  otherProjectName: string
  otherCategory: string
  otherBuild: string
  otherFeatures: string
  otherPlatforms: string
  otherReferences: string
  otherExtra: string
}

export const initialEnquiryState = (): EnquiryFormState => ({
  service: '',
  fullName: '',
  businessName: '',
  whatsapp: '',
  email: '',
  location: '',
  description: '',
  budget: '',
  timeline: '',
  websiteType: '',
  pageCount: '',
  hasDomain: '',
  needsHosting: '',
  hasExistingWebsite: '',
  existingWebsiteUrl: '',
  websiteFeatures: [],
  websiteReferences: '',
  websiteExtra: '',
  appPlatform: '',
  appCategory: '',
  appPurpose: '',
  appAudience: '',
  appFeatures: [],
  appAdminPanel: '',
  appReferences: '',
  appExtra: '',
  aiProcess: '',
  aiManualWorkflow: '',
  aiGoal: '',
  aiChannel: '',
  aiAutomationType: '',
  aiTools: '',
  aiFrequency: '',
  aiExpectedResult: '',
  aiExtra: '',
  otherProjectName: '',
  otherCategory: '',
  otherBuild: '',
  otherFeatures: '',
  otherPlatforms: '',
  otherReferences: '',
  otherExtra: '',
})

export const SERVICE_LABELS: Record<EnquiryService, string> = {
  website: 'Website Development',
  mobile: 'Mobile App Development',
  ai: 'AI Automation',
  other: 'Other / Custom Project',
}