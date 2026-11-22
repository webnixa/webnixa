import type { EnquiryFormState } from './types'
import { SERVICE_LABELS } from './types'

function line(label: string, value: string | undefined) {
  const v = value?.trim()
  if (!v) return null
  return `${label}: ${v}`
}

function block(title: string, lines: (string | null)[]) {
  const filtered = lines.filter(Boolean) as string[]
  if (!filtered.length) return ''
  return `${title}\n${filtered.join('\n')}`
}

function list(label: string, items: string[]) {
  if (!items.length) return null
  return `${label}: ${items.join(', ')}`
}

export function formatEnquiryMessage(data: EnquiryFormState): string {
  const service = data.service ? SERVICE_LABELS[data.service] : '—'

  const client = block('CLIENT INFORMATION', [
    line('Name', data.fullName),
    line('Business', data.businessName),
    line('WhatsApp', data.whatsapp),
    line('Email', data.email),
    line('Location', data.location),
  ])

  const project = block('PROJECT INFORMATION', [
    line('Service', service),
    line('Budget', data.budget),
    line('Timeline', data.timeline),
    data.service === 'website' ? line('Website Type', data.websiteType) : null,
    data.service === 'mobile' ? line('App Platform', data.appPlatform) : null,
    data.service === 'mobile' ? line('App Category', data.appCategory) : null,
    data.service === 'ai' ? line('Automation Type', data.aiAutomationType) : null,
    data.service === 'other' ? line('Project Name', data.otherProjectName) : null,
  ])

  const requirements: (string | null)[] = []
  if (data.service === 'website') {
    requirements.push(
      line('Pages', data.pageCount),
      line('Domain', data.hasDomain),
      line('Hosting', data.needsHosting),
      line('Existing Website', data.hasExistingWebsite),
      line('Existing URL', data.existingWebsiteUrl),
      list('Website Features', data.websiteFeatures),
      line('References', data.websiteReferences),
      line('Additional', data.websiteExtra),
    )
  }
  if (data.service === 'mobile') {
    requirements.push(
      line('Purpose', data.appPurpose),
      line('Audience', data.appAudience),
      list('App Features', data.appFeatures),
      line('Admin Panel', data.appAdminPanel),
      line('References', data.appReferences),
      line('Additional', data.appExtra),
    )
  }
  if (data.service === 'ai') {
    requirements.push(
      line('Process', data.aiProcess),
      line('Manual Workflow', data.aiManualWorkflow),
      line('AI Goal', data.aiGoal),
      line('Channel', data.aiChannel),
      line('Tools / Platforms', data.aiTools),
      line('Frequency', data.aiFrequency),
      line('Expected Result', data.aiExpectedResult),
      line('Additional', data.aiExtra),
    )
  }
  if (data.service === 'other') {
    requirements.push(
      line('Category', data.otherCategory),
      line('Build', data.otherBuild),
      line('Features', data.otherFeatures),
      line('Platforms', data.otherPlatforms),
      line('References', data.otherReferences),
      line('Additional', data.otherExtra),
    )
  }

  const reqBlock = block('PROJECT REQUIREMENTS', requirements)

  const description = block('PROJECT DESCRIPTION', [data.description.trim()])

  const parts = [
    'WEBNIXA — NEW PROJECT ENQUIRY',
    '',
    client,
    '',
    project,
    '',
    reqBlock,
    '',
    description,
  ].filter((p, i, arr) => !(p === '' && arr[i - 1] === ''))

  return parts.join('\n')
}