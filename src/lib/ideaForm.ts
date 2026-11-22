export type IdeaFormData = {
  name: string
  email: string
  idea: string
}

export type IdeaFormErrors = Partial<Record<keyof IdeaFormData, string>>

export type SubmitIdeaResult =
  | { ok: true; mode: 'api' }
  | { ok: true; mode: 'simulated' }
  | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateIdeaForm(data: IdeaFormData): IdeaFormErrors {
  const errors: IdeaFormErrors = {}
  const name = data.name.trim()
  const email = data.email.trim()
  const idea = data.idea.trim()

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  }
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (idea.length < 20) {
    errors.idea = 'Describe your idea in a bit more detail (20+ characters).'
  }
  if (idea.length > 2000) {
    errors.idea = 'Idea is too long (max 2000 characters).'
  }

  return errors
}

/**
 * POSTs JSON to `import.meta.env.VITE_IDEA_API_URL` when set.
 * Expected backend: accepts `{ name, email, idea }` and returns 2xx.
 *
 * Until configured, submissions are simulated client-side for UX testing.
 */
export async function submitIdea(data: IdeaFormData): Promise<SubmitIdeaResult> {
  const endpoint = import.meta.env.VITE_IDEA_API_URL as string | undefined

  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    idea: data.idea.trim(),
    submittedAt: new Date().toISOString(),
    source: 'webnixa-website',
  }

  if (!endpoint) {
    await new Promise((r) => window.setTimeout(r, 900))
    if (import.meta.env.DEV) {
      console.info('[Webnixa] Idea saved locally (simulated). Set VITE_IDEA_API_URL to enable API submission.', payload)
    }
    return { ok: true, mode: 'simulated' }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return {
        ok: false,
        error: text || `Server responded with ${res.status}. Please try again later.`,
      }
    }

    return { ok: true, mode: 'api' }
  } catch {
    return { ok: false, error: 'Network error. Check your connection and try again.' }
  }
}