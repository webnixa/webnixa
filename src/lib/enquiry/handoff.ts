import { WEBNIXA_EMAIL, WEBNIXA_INSTAGRAM, WEBNIXA_WHATSAPP } from '../contact'
import { formatEnquiryMessage } from './formatEnquiryMessage'
import type { EnquiryFormState } from './types'
import { SERVICE_LABELS } from './types'

export function buildWhatsAppUrl(data: EnquiryFormState) {
  const text = formatEnquiryMessage(data)
  return `https://wa.me/${WEBNIXA_WHATSAPP}?text=${encodeURIComponent(text)}`
}

export function buildMailtoUrl(data: EnquiryFormState) {
  const service = data.service ? SERVICE_LABELS[data.service] : 'Project'
  const subject = encodeURIComponent(`New Webnixa Project Enquiry — ${service}`)
  const body = encodeURIComponent(formatEnquiryMessage(data))
  return `mailto:${WEBNIXA_EMAIL}?subject=${subject}&body=${body}`
}

export function openWhatsApp(data: EnquiryFormState): { opened: boolean; url: string } {
  const url = buildWhatsAppUrl(data)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  return { opened: !!win, url }
}

export async function copyEnquiryAndOpenInstagram(data: EnquiryFormState) {
  const text = formatEnquiryMessage(data)
  await navigator.clipboard.writeText(text)
  window.open(WEBNIXA_INSTAGRAM, '_blank', 'noopener,noreferrer')
  return text
}