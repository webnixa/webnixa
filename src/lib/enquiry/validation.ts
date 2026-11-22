import type { EnquiryFormState, EnquiryService } from './types'

export type FieldErrors = Partial<Record<keyof EnquiryFormState, string>> & { _form?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+?91)?[6-9]\d{9}$|^\d{10}$/

export function normalizeWhatsApp(value: string) {
  return value.replace(/[\s\-()]/g, '')
}

export function validateStepService(service: EnquiryFormState['service']): FieldErrors {
  if (!service) return { service: 'Please select a service to continue.' }
  return {}
}

export function validateStepCommon(data: EnquiryFormState): FieldErrors {
  const errors: FieldErrors = {}
  if (data.fullName.trim().length < 2) errors.fullName = 'Full name is required.'
  const phone = normalizeWhatsApp(data.whatsapp)
  if (!PHONE_RE.test(phone)) errors.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Enter a valid email address.'
  if (data.description.trim().length < 20) {
    errors.description = 'Please describe your project (at least 20 characters).'
  }
  if (!data.budget) errors.budget = 'Select a budget range.'
  if (!data.timeline) errors.timeline = 'Select a timeline.'
  return errors
}

export function validateStepServiceFields(data: EnquiryFormState): FieldErrors {
  const errors: FieldErrors = {}
  const svc = data.service as EnquiryService

  if (svc === 'website') {
    if (!data.websiteType) errors.websiteType = 'Select a website type.'
    if (!data.pageCount.trim()) errors.pageCount = 'Approximate pages required.'
    if (!data.hasDomain) errors.hasDomain = 'Please answer about domain.'
    if (!data.needsHosting) errors.needsHosting = 'Please answer about hosting.'
    if (!data.hasExistingWebsite) errors.hasExistingWebsite = 'Please answer about existing website.'
    if (data.hasExistingWebsite === 'Yes' && !data.existingWebsiteUrl.trim()) {
      errors.existingWebsiteUrl = 'Enter your existing website URL.'
    }
  }

  if (svc === 'mobile') {
    if (!data.appPlatform) errors.appPlatform = 'Select app platform.'
    if (!data.appCategory) errors.appCategory = 'Select app category.'
    if (!data.appPurpose.trim()) errors.appPurpose = 'Describe the main purpose.'
    if (!data.appAudience.trim()) errors.appAudience = 'Who will use the app?'
    if (!data.appAdminPanel) errors.appAdminPanel = 'Answer about admin panel.'
  }

  if (svc === 'ai') {
    if (!data.aiProcess.trim()) errors.aiProcess = 'What should be automated?'
    if (!data.aiManualWorkflow.trim()) errors.aiManualWorkflow = 'Describe current workflow.'
    if (!data.aiGoal.trim()) errors.aiGoal = 'What should AI do for you?'
    if (!data.aiAutomationType) errors.aiAutomationType = 'Select automation type.'
    if (!data.aiExpectedResult.trim()) errors.aiExpectedResult = 'Expected result required.'
  }

  if (svc === 'other') {
    if (!data.otherBuild.trim()) errors.otherBuild = 'Describe what you want to build.'
    if (!data.otherFeatures.trim()) errors.otherFeatures = 'List required features.'
  }

  return errors
}

export function hasErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0
}