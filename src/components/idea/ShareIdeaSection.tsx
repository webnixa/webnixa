import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { submitIdea, validateIdeaForm, type IdeaFormErrors } from '../../lib/ideaForm'
import { ScrollReveal } from '../ui/ScrollReveal'
import { MagneticButton } from '../ui/MagneticButton'

const IdeaLightBulb3D = lazy(() =>
  import('./IdeaLightBulb3D').then((m) => ({ default: m.IdeaLightBulb3D })),
)

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ShareIdeaSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [idea, setIdea] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [errors, setErrors] = useState<IdeaFormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [formError, setFormError] = useState('')
  const [simulated, setSimulated] = useState(false)

  const bulbActive = focused !== null || idea.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validateIdeaForm({ name, email, idea })
    setErrors(nextErrors)
    setFormError('')
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    const result = await submitIdea({ name, email, idea })

    if (!result.ok) {
      setStatus('error')
      setFormError(result.error)
      return
    }

    setSimulated(result.mode === 'simulated')
    setStatus('success')
    setName('')
    setEmail('')
    setIdea('')
    window.setTimeout(() => setStatus('idle'), 6000)
  }

  const fieldClass = (key: keyof IdeaFormErrors) =>
    `w-full rounded-2xl border bg-white/85 px-4 py-3 text-dark outline-none transition-shadow placeholder:text-muted/70 ${
      errors[key]
        ? 'border-red-400/70 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]'
        : focused === key
          ? 'border-primary/50 shadow-[0_0_0_3px_rgba(108,25,255,0.15)]'
          : 'border-lavender'
    }`

  return (
    <section id="ideas" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-20">
      <ScrollReveal>
        <div className="idea-banner glow-purple mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] p-6 md:grid-cols-[minmax(0,0.9fr)_1.25fr] md:gap-10 md:p-10 lg:p-12">
          <div className="relative flex min-h-[220px] items-center justify-center">
            <motion.div
              className="absolute h-52 w-52 rounded-full bg-primary/12 blur-3xl"
              animate={{
                scale: bulbActive ? 1.15 : 1,
                opacity: bulbActive ? 0.95 : 0.55,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-20 w-px origin-bottom rounded-full bg-gradient-to-t from-transparent to-primary/50"
                style={{ rotate: `${i * 45}deg` }}
                animate={{ opacity: bulbActive ? [0.25, 0.75, 0.25] : 0.15, scaleY: bulbActive ? 1 : 0.7 }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
            <Suspense fallback={<div className="h-44 w-44 animate-pulse rounded-full bg-lavender/50" />}>
              <IdeaLightBulb3D active={bulbActive} />
            </Suspense>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-dark md:text-4xl">
              Share Your Idea With Us
            </h2>
            <p className="mt-3 text-base text-muted">
              Tell us what you have in mind — we'll bring it to life.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark" htmlFor="idea-name">
                    Name
                  </label>
                  <input
                    id="idea-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={fieldClass('name')}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark" htmlFor="idea-email">
                    Email
                  </label>
                  <input
                    id="idea-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={fieldClass('email')}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark" htmlFor="idea-input">
                  Your idea
                </label>
                <textarea
                  id="idea-input"
                  rows={4}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  onFocus={() => setFocused('idea')}
                  onBlur={() => setFocused(null)}
                  placeholder="Describe your idea..."
                  className={`${fieldClass('idea')} resize-none`}
                />
                {errors.idea && (
                  <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {errors.idea}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton
                  type="submit"
                  className="w-full sm:w-auto"
                  onClick={() => undefined}
                >
                  {status === 'submitting' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {status === 'submitting' ? 'Sending...' : 'Submit Idea'}
                </MagneticButton>
                <p className="text-xs text-muted">
                  Secured for handoff — set <code className="rounded bg-lavender px-1">VITE_IDEA_API_URL</code> to
                  connect your API.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3"
                    role="status"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-dark">Idea received — thank you!</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {simulated
                          ? 'Backend not configured yet; this was a successful UI test. Add VITE_IDEA_API_URL in .env to enable live submission.'
                          : 'Our team will review your message and get back to you soon.'}
                      </p>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && formError && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium text-red-600"
                    role="alert"
                  >
                    {formError || 'Something went wrong. Please try again.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}