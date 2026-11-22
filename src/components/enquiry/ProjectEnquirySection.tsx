import { AnimatePresence, motion } from 'framer-motion'
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutGrid,
  Loader2,
  Mail,
  MessageCircle,
  Smartphone,
} from 'lucide-react'
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { WEBNIXA_WHATSAPP_DISPLAY } from '../../lib/contact'
import { buildMailtoUrl, copyEnquiryAndOpenInstagram, openWhatsApp } from '../../lib/enquiry/handoff'
import { formatEnquiryMessage } from '../../lib/enquiry/formatEnquiryMessage'
import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  initialEnquiryState,
  SERVICE_LABELS,
  type EnquiryFormState,
  type EnquiryService,
} from '../../lib/enquiry/types'
import {
  hasErrors,
  validateStepCommon,
  validateStepService,
  validateStepServiceFields,
  type FieldErrors,
} from '../../lib/enquiry/validation'
import { ScrollReveal } from '../ui/ScrollReveal'
import { MagneticButton } from '../ui/MagneticButton'

const STEPS = ['Service', 'Your details', 'Requirements', 'Review'] as const

const services: {
  id: EnquiryService
  title: string
  desc: string
  icon: typeof Globe
}[] = [
  { id: 'website', title: 'Website Development', desc: 'Business, ecommerce, landing pages & more.', icon: Globe },
  { id: 'mobile', title: 'Mobile App Development', desc: 'Android, iOS and cross-platform apps.', icon: Smartphone },
  { id: 'ai', title: 'AI Automation', desc: 'Workflows, chatbots, and smart integrations.', icon: Bot },
  { id: 'other', title: 'Other / Custom Project', desc: 'Unique ideas that need a custom plan.', icon: LayoutGrid },
]

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string
  error?: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-dark">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full min-w-0 rounded-2xl border border-lavender bg-white/90 px-4 py-3 text-base text-dark outline-none transition focus:border-primary/45 focus:shadow-[0_0_0_3px_rgba(108,25,255,0.12)] sm:text-sm'

const stepNavPrimary =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:shadow-primary/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary touch-manipulation'

const stepNavGhost =
  'inline-flex min-h-[44px] items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40 touch-manipulation'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M17.5 6.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5" />
    </svg>
  )
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string[]
  onChange: (next: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((x) => x !== opt) : [...selected, opt])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            selected.includes(opt)
              ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
              : 'border-lavender bg-white text-muted hover:border-violet/40'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function ServiceWebsiteFields({
  data,
  set,
  errors,
}: {
  data: EnquiryFormState
  set: React.Dispatch<React.SetStateAction<EnquiryFormState>>
  errors: FieldErrors
}) {
  const websiteTypes = [
    'Business Website',
    'Portfolio Website',
    'Ecommerce Website',
    'Landing Page',
    'Booking Website',
    'Educational Website',
    'Blog / Content Website',
    'Custom Website',
  ]
  const featureOpts = [
    'Contact form',
    'WhatsApp integration',
    'Online payments',
    'Booking / Appointment system',
    'Login / User accounts',
    'Admin dashboard',
    'Ecommerce',
    'AI chatbot',
    'SEO',
    'Other',
  ]
  const tri = ['Yes', 'No', 'Not sure']

  return (
    <div className="space-y-4">
      <Field label="Website type" required error={errors.websiteType}>
        <select
          className={inputClass}
          value={data.websiteType}
          onChange={(e) => set((s) => ({ ...s, websiteType: e.target.value as EnquiryFormState['websiteType'] }))}
        >
          <option value="">Select type</option>
          {websiteTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Approximate number of pages" required error={errors.pageCount}>
        <input className={inputClass} value={data.pageCount} onChange={(e) => set((s) => ({ ...s, pageCount: e.target.value }))} />
      </Field>
      {(['hasDomain', 'needsHosting', 'hasExistingWebsite'] as const).map((key, idx) => (
        <Field
          key={key}
          label={
            idx === 0 ? 'Do you already have a domain?' : idx === 1 ? 'Do you need hosting?' : 'Do you have an existing website?'
          }
          required
          error={errors[key]}
        >
          <select className={inputClass} value={data[key]} onChange={(e) => set((s) => ({ ...s, [key]: e.target.value }))}>
            <option value="">Select</option>
            {tri.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      ))}
      {data.hasExistingWebsite === 'Yes' && (
        <Field label="Existing website URL" required error={errors.existingWebsiteUrl}>
          <input className={inputClass} value={data.existingWebsiteUrl} onChange={(e) => set((s) => ({ ...s, existingWebsiteUrl: e.target.value }))} />
        </Field>
      )}
      <Field label="Required features">
        <CheckboxGroup options={featureOpts} selected={data.websiteFeatures} onChange={(websiteFeatures) => set((s) => ({ ...s, websiteFeatures }))} />
      </Field>
      <Field label="Reference website links">
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.websiteReferences} onChange={(e) => set((s) => ({ ...s, websiteReferences: e.target.value }))} />
      </Field>
      <Field label="Additional project details">
        <textarea className={`${inputClass} resize-none`} rows={3} value={data.websiteExtra} onChange={(e) => set((s) => ({ ...s, websiteExtra: e.target.value }))} />
      </Field>
    </div>
  )
}

function ServiceMobileFields({
  data,
  set,
  errors,
}: {
  data: EnquiryFormState
  set: React.Dispatch<React.SetStateAction<EnquiryFormState>>
  errors: FieldErrors
}) {
  const featureOpts = [
    'Login / Signup',
    'User profile',
    'Push notifications',
    'Online payments',
    'Booking',
    'Chat',
    'Admin dashboard',
    'GPS / Location',
    'AI features',
    'Other',
  ]
  return (
    <div className="space-y-4">
      <Field label="App platform" required error={errors.appPlatform}>
        <select className={inputClass} value={data.appPlatform} onChange={(e) => set((s) => ({ ...s, appPlatform: e.target.value }))}>
          <option value="">Select</option>
          {['Android', 'iOS', 'Android + iOS', 'Not sure'].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="App category" required error={errors.appCategory}>
        <select className={inputClass} value={data.appCategory} onChange={(e) => set((s) => ({ ...s, appCategory: e.target.value }))}>
          <option value="">Select</option>
          {['Ecommerce', 'Business', 'Education', 'Fitness', 'Food Delivery', 'Social', 'Booking', 'Productivity', 'Other'].map(
            (t) => (
              <option key={t}>{t}</option>
            ),
          )}
        </select>
      </Field>
      <Field label="Main purpose of the app" required error={errors.appPurpose}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.appPurpose} onChange={(e) => set((s) => ({ ...s, appPurpose: e.target.value }))} />
      </Field>
      <Field label="Who will use the app?" required error={errors.appAudience}>
        <input className={inputClass} value={data.appAudience} onChange={(e) => set((s) => ({ ...s, appAudience: e.target.value }))} />
      </Field>
      <Field label="Required features">
        <CheckboxGroup options={featureOpts} selected={data.appFeatures} onChange={(appFeatures) => set((s) => ({ ...s, appFeatures }))} />
      </Field>
      <Field label="Admin panel required?" required error={errors.appAdminPanel}>
        <select className={inputClass} value={data.appAdminPanel} onChange={(e) => set((s) => ({ ...s, appAdminPanel: e.target.value }))}>
          <option value="">Select</option>
          {['Yes', 'No', 'Not sure'].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Reference app / website links">
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.appReferences} onChange={(e) => set((s) => ({ ...s, appReferences: e.target.value }))} />
      </Field>
      <Field label="Additional details">
        <textarea className={`${inputClass} resize-none`} rows={3} value={data.appExtra} onChange={(e) => set((s) => ({ ...s, appExtra: e.target.value }))} />
      </Field>
    </div>
  )
}

function ServiceAiFields({
  data,
  set,
  errors,
}: {
  data: EnquiryFormState
  set: React.Dispatch<React.SetStateAction<EnquiryFormState>>
  errors: FieldErrors
}) {
  return (
    <div className="space-y-4">
      <Field label="What process do you want to automate?" required error={errors.aiProcess}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.aiProcess} onChange={(e) => set((s) => ({ ...s, aiProcess: e.target.value }))} />
      </Field>
      <Field label="Current manual workflow" required error={errors.aiManualWorkflow}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.aiManualWorkflow} onChange={(e) => set((s) => ({ ...s, aiManualWorkflow: e.target.value }))} />
      </Field>
      <Field label="What should AI do for you?" required error={errors.aiGoal}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.aiGoal} onChange={(e) => set((s) => ({ ...s, aiGoal: e.target.value }))} />
      </Field>
      <Field label="Where does this process happen?">
        <select className={inputClass} value={data.aiChannel} onChange={(e) => set((s) => ({ ...s, aiChannel: e.target.value }))}>
          <option value="">Select</option>
          {['WhatsApp', 'Instagram', 'Website', 'Email', 'Excel / Google Sheets', 'CRM', 'Other'].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Automation type" required error={errors.aiAutomationType}>
        <select className={inputClass} value={data.aiAutomationType} onChange={(e) => set((s) => ({ ...s, aiAutomationType: e.target.value }))}>
          <option value="">Select</option>
          {[
            'AI Chatbot',
            'Customer Support Automation',
            'WhatsApp Workflow',
            'Lead Generation',
            'Data Entry Automation',
            'Document Processing',
            'AI Content Generation',
            'Sales Automation',
            'Business Workflow Automation',
            'Custom AI Automation',
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Tools or platforms to connect">
        <input className={inputClass} value={data.aiTools} onChange={(e) => set((s) => ({ ...s, aiTools: e.target.value }))} />
      </Field>
      <Field label="How often is the task performed?">
        <select className={inputClass} value={data.aiFrequency} onChange={(e) => set((s) => ({ ...s, aiFrequency: e.target.value }))}>
          <option value="">Select</option>
          {['Daily', 'Weekly', 'Multiple times per day', 'Occasionally'].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Expected result" required error={errors.aiExpectedResult}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.aiExpectedResult} onChange={(e) => set((s) => ({ ...s, aiExpectedResult: e.target.value }))} />
      </Field>
      <Field label="Additional details">
        <textarea className={`${inputClass} resize-none`} rows={3} value={data.aiExtra} onChange={(e) => set((s) => ({ ...s, aiExtra: e.target.value }))} />
      </Field>
    </div>
  )
}

function ServiceOtherFields({
  data,
  set,
  errors,
}: {
  data: EnquiryFormState
  set: React.Dispatch<React.SetStateAction<EnquiryFormState>>
  errors: FieldErrors
}) {
  return (
    <div className="space-y-4">
      <Field label="Project name">
        <input className={inputClass} value={data.otherProjectName} onChange={(e) => set((s) => ({ ...s, otherProjectName: e.target.value }))} />
      </Field>
      <Field label="Project category">
        <input className={inputClass} value={data.otherCategory} onChange={(e) => set((s) => ({ ...s, otherCategory: e.target.value }))} />
      </Field>
      <Field label="What do you want to build?" required error={errors.otherBuild}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.otherBuild} onChange={(e) => set((s) => ({ ...s, otherBuild: e.target.value }))} />
      </Field>
      <Field label="Required features" required error={errors.otherFeatures}>
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.otherFeatures} onChange={(e) => set((s) => ({ ...s, otherFeatures: e.target.value }))} />
      </Field>
      <Field label="Platforms involved">
        <input className={inputClass} value={data.otherPlatforms} onChange={(e) => set((s) => ({ ...s, otherPlatforms: e.target.value }))} />
      </Field>
      <Field label="Reference links">
        <textarea className={`${inputClass} resize-none`} rows={2} value={data.otherReferences} onChange={(e) => set((s) => ({ ...s, otherReferences: e.target.value }))} />
      </Field>
      <Field label="Additional details">
        <textarea className={`${inputClass} resize-none`} rows={3} value={data.otherExtra} onChange={(e) => set((s) => ({ ...s, otherExtra: e.target.value }))} />
      </Field>
    </div>
  )
}

export function ProjectEnquirySection() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<EnquiryFormState>(initialEnquiryState)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [handoff, setHandoff] = useState<'whatsapp' | 'email' | 'instagram' | null>(null)
  const [waFallbackUrl, setWaFallbackUrl] = useState('')
  const [copyOk, setCopyOk] = useState(false)
  const stepPanelRef = useRef<HTMLDivElement>(null)
  const stepTitleRef = useRef<HTMLHeadingElement>(null)
  const navLockRef = useRef(false)

  const progress = ((step + 1) / STEPS.length) * 100

  const reviewText = useMemo(() => formatEnquiryMessage(data), [data])

  const releaseNavLock = useCallback(() => {
    window.setTimeout(() => {
      navLockRef.current = false
    }, 400)
  }, [])

  const selectService = useCallback((id: EnquiryService) => {
    setData((s) => ({ ...s, service: id }))
    setErrors((prev) => {
      if (!prev.service) return prev
      const next = { ...prev }
      delete next.service
      return next
    })
  }, [])

  const goNext = useCallback(() => {
    if (navLockRef.current) return
    navLockRef.current = true
    releaseNavLock()

    let e: FieldErrors = {}
    if (step === 0) e = validateStepService(data.service)
    if (step === 1) e = validateStepCommon(data)
    if (step === 2) e = validateStepServiceFields(data)
    setErrors(e)
    if (hasErrors(e)) {
      navLockRef.current = false
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }, [data, releaseNavLock, step])

  const goPrev = useCallback(() => {
    if (navLockRef.current) return
    navLockRef.current = true
    releaseNavLock()
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
  }, [releaseNavLock])

  useEffect(() => {
    const panel = stepPanelRef.current
    const title = stepTitleRef.current
    if (title) {
      title.focus({ preventScroll: true })
    }
    if (panel) {
      panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [step])

  const submitWhatsApp = async () => {
    const e = { ...validateStepCommon(data), ...validateStepServiceFields(data), ...validateStepService(data.service) }
    setErrors(e)
    if (hasErrors(e)) {
      setStep(1)
      return
    }
    setSubmitting(true)
    const { opened, url } = openWhatsApp(data)
  setWaFallbackUrl(url)
    setHandoff('whatsapp')
    if (!opened) setErrors({ _form: 'Popup blocked — use the WhatsApp link below.' })
    setSubmitting(false)
  }

  const submitEmail = () => {
    window.location.href = buildMailtoUrl(data)
    setHandoff('email')
  }

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(reviewText)
      setCopyOk(true)
    } catch {
      setErrors({ _form: 'Could not copy enquiry. Please select and copy the preview manually.' })
    }
  }

  const submitInstagram = async () => {
    try {
      await copyEnquiryAndOpenInstagram(data)
      setCopyOk(true)
      setHandoff('instagram')
    } catch {
      setErrors({ _form: 'Could not copy enquiry. Please select and copy the preview manually.' })
    }
  }

  return (
    <section id="ideas" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-20">
      <div className="idea-banner glow-purple mx-auto w-full min-w-0 max-w-6xl overflow-hidden rounded-3xl p-5 sm:rounded-[2rem] sm:p-6 md:p-10 lg:p-12">
        <ScrollReveal>
          <div className="mb-6 max-w-2xl md:mb-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-dark sm:text-3xl md:text-4xl">
              Share Your Project With Us
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Tell us what you need — we&apos;ll open a ready-to-send enquiry on WhatsApp, email, or Instagram.
            </p>
          </div>
        </ScrollReveal>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>

        <div className="mb-6 md:mb-8">
          <p className="mb-2 text-center text-xs font-semibold text-primary sm:hidden">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
          <div className="mb-2 hidden justify-between gap-1 text-[11px] font-medium text-muted sm:flex sm:text-xs">
            {STEPS.map((label, i) => (
              <span key={label} className={`min-w-0 truncate ${i <= step ? 'text-primary' : ''}`}>
                {label}
              </span>
            ))}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-lavender">
            <motion.div className="h-full bg-gradient-to-r from-primary to-violet" animate={{ width: `${progress}%` }} transition={{ ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>

        <motion.h3
          ref={stepTitleRef}
          tabIndex={-1}
          className="mb-4 font-display text-lg font-semibold text-dark outline-none sm:text-xl"
        >
          {STEPS[step]}
        </motion.h3>

        <div ref={stepPanelRef} className="min-h-[min(320px,50vh)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div>
                  <p className="mb-4 text-sm font-semibold text-dark">What would you like us to build for you?</p>
                  <div
                    className="grid gap-3 sm:grid-cols-2 sm:gap-4"
                    role="group"
                    aria-label="Select a service"
                  >
                    {services.map(({ id, title, desc, icon: Icon }) => {
                      const active = data.service === id
                      return (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={active}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            selectService(id)
                          }}
                          className={`card-premium enquiry-service-card rounded-3xl border p-4 text-left transition duration-300 touch-manipulation sm:p-5 ${
                            active
                              ? 'border-primary bg-white shadow-[0_0_40px_rgba(108,25,255,0.18)]'
                              : 'border-white/90 bg-white/80 hover:border-violet/35'
                          }`}
                        >
                          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active ? 'bg-primary text-white' : 'bg-lavender text-primary'}`}>
                            <Icon size={22} />
                          </span>
                          <h3 className="mt-3 font-display font-semibold text-dark">{title}</h3>
                          <p className="mt-1 text-sm text-muted">{desc}</p>
                        </button>
                      )
                    })}
                  </div>
                  {errors.service && <p className="mt-3 text-sm text-red-600">{errors.service}</p>}
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" required error={errors.fullName}>
                    <input className={inputClass} value={data.fullName} onChange={(e) => setData((s) => ({ ...s, fullName: e.target.value }))} />
                  </Field>
                  <Field label="Business / Brand Name">
                    <input className={inputClass} value={data.businessName} onChange={(e) => setData((s) => ({ ...s, businessName: e.target.value }))} />
                  </Field>
                  <Field label="WhatsApp Number" required error={errors.whatsapp}>
                    <input className={inputClass} inputMode="tel" value={data.whatsapp} onChange={(e) => setData((s) => ({ ...s, whatsapp: e.target.value }))} placeholder="10-digit number" />
                  </Field>
                  <Field label="Email Address" required error={errors.email}>
                    <input className={inputClass} type="email" value={data.email} onChange={(e) => setData((s) => ({ ...s, email: e.target.value }))} />
                  </Field>
                  <Field label="City / Location">
                    <input className={inputClass} value={data.location} onChange={(e) => setData((s) => ({ ...s, location: e.target.value }))} />
                  </Field>
                  <Field label="Budget Range" required error={errors.budget}>
                    <select className={inputClass} value={data.budget} onChange={(e) => setData((s) => ({ ...s, budget: e.target.value as EnquiryFormState['budget'] }))}>
                      <option value="">Select budget</option>
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Project Timeline" required error={errors.timeline}>
                    <select className={inputClass} value={data.timeline} onChange={(e) => setData((s) => ({ ...s, timeline: e.target.value as EnquiryFormState['timeline'] }))}>
                      <option value="">Select timeline</option>
                      {TIMELINE_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Project Description" required error={errors.description}>
                      <textarea className={`${inputClass} resize-none`} rows={4} value={data.description} onChange={(e) => setData((s) => ({ ...s, description: e.target.value }))} />
                    </Field>
                  </div>
                </div>
              )}

              {step === 2 && data.service && (
                <div>
                  <p className="mb-4 text-sm text-muted">
                    Service: <span className="font-semibold text-primary">{SERVICE_LABELS[data.service]}</span>
                  </p>
                  {data.service === 'website' && <ServiceWebsiteFields data={data} set={setData} errors={errors} />}
                  {data.service === 'mobile' && <ServiceMobileFields data={data} set={setData} errors={errors} />}
                  {data.service === 'ai' && <ServiceAiFields data={data} set={setData} errors={errors} />}
                  {data.service === 'other' && <ServiceOtherFields data={data} set={setData} errors={errors} />}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted">Review your enquiry. You can go back to edit any step.</p>
                  <pre className="max-h-72 overflow-auto rounded-2xl border border-lavender bg-white/90 p-4 text-xs leading-relaxed whitespace-pre-wrap text-dark">
                    {reviewText}
                  </pre>
                  {handoff === 'whatsapp' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-dark" role="status">
                      <p className="font-semibold flex items-center gap-2">
                        <MessageCircle className="text-primary" size={18} />
                        WhatsApp is ready
                      </p>
                      <p className="mt-1 text-muted">
                        Your enquiry is pre-filled in WhatsApp to <strong>{WEBNIXA_WHATSAPP_DISPLAY}</strong>. Tap <strong>Send</strong> in WhatsApp to deliver it — we can&apos;t confirm delivery from the browser.
                      </p>
                      {waFallbackUrl && (
                        <a href={waFallbackUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
                          Open WhatsApp manually →
                        </a>
                      )}
                    </motion.div>
                  )}
                  {handoff === 'email' && (
                    <p className="text-sm text-muted" role="status">
                      Your email app should open with a pre-filled enquiry. Tap send in your mail app to deliver it.
                    </p>
                  )}
                  {handoff === 'instagram' && (
                    <p className="text-sm text-muted" role="status">
                      {copyOk
                        ? 'Enquiry copied! Instagram opened — paste into Direct Message to send.'
                        : 'Open Instagram and paste your enquiry into DM.'}
                    </p>
                  )}
                  {errors._form && <p className="text-sm text-red-600">{errors._form}</p>}
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <MagneticButton variant="ghost" onClick={() => void copyEnquiry()} className="!px-5 !py-2.5">
                      Copy Enquiry
                    </MagneticButton>
                    <MagneticButton onClick={submitWhatsApp} className="!px-5 !py-2.5">
                      {submitting ? <Loader2 className="animate-spin" size={18} /> : <MessageCircle size={18} />}
                      Submit via WhatsApp
                    </MagneticButton>
                    <MagneticButton variant="ghost" onClick={submitEmail} className="!px-5 !py-2.5">
                      <Mail size={18} /> Send via Email
                    </MagneticButton>
                    <MagneticButton variant="ghost" onClick={() => void submitInstagram()} className="!px-5 !py-2.5">
                      <InstagramIcon /> Instagram DM
                    </MagneticButton>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < 3 && (
          <div
            className="mt-8 flex flex-col-reverse gap-3 border-t border-lavender/80 pt-6 sm:flex-row sm:items-center sm:justify-between"
            role="group"
            aria-label="Form step navigation"
          >
            <button type="button" onClick={goPrev} disabled={step === 0} className={stepNavGhost}>
              <ChevronLeft size={18} aria-hidden /> Previous
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goNext()
              }}
              className={`${stepNavPrimary} w-full sm:w-auto`}
            >
              Next <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        )}
        {step === 3 && (
          <button type="button" onClick={goPrev} className="mt-6 inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary touch-manipulation">
            <ChevronLeft size={16} aria-hidden /> Edit answers
          </button>
        )}
      </div>
    </section>
  )
}