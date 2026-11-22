import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Globe, LayoutDashboard, Smartphone } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'

type DemoId = 'website' | 'app' | 'ai' | 'dashboard'

const tabs: { id: DemoId; label: string; icon: typeof Globe }[] = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'app', label: 'Mobile app', icon: Smartphone },
  { id: 'ai', label: 'AI assistant', icon: Bot },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

function WebsiteDemo() {
  const [page, setPage] = useState<'home' | 'services' | 'contact'>('home')
  const copy = {
    home: 'Welcome to your Webnixa-powered site — fast, accessible, and on-brand.',
    services: 'Pick a service package and launch with a clear roadmap.',
    contact: 'Share your idea — we respond within one business day.',
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-lavender bg-white shadow-inner">
      <div className="flex items-center gap-1.5 border-b border-lavender bg-soft-bg/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="ml-2 text-[10px] text-muted">demo.webnixa.site</span>
      </div>
      <div className="flex gap-2 border-b border-lavender px-3 py-2">
        {(['home', 'services', 'contact'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPage(key)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
              page === key ? 'bg-primary text-white' : 'text-muted hover:bg-lavender/60'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="space-y-3 p-4">
        <div className="h-16 rounded-xl bg-gradient-to-r from-primary/80 to-violet/80" />
        <p className="text-sm text-dark">{copy[page]}</p>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              layout
              className="h-14 rounded-lg bg-lavender/70"
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function AppDemo() {
  const [screen, setScreen] = useState(0)
  const screens = ['Home', 'Track', 'Profile']

  return (
    <div className="flex justify-center">
      <div className="w-44 rounded-[1.75rem] border-4 border-white bg-gradient-to-b from-lavender to-white p-2 shadow-xl">
        <div className="flex justify-center gap-2 pb-2">
          {screens.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setScreen(i)}
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                screen === i ? 'bg-primary text-white' : 'bg-white/80 text-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-52 rounded-2xl bg-white p-2"
          >
            {screen === 0 && (
              <>
                <div className="h-16 rounded-xl bg-gradient-to-br from-primary to-violet" />
                <p className="mt-2 text-[10px] font-semibold text-dark">Today&apos;s overview</p>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="aspect-square rounded-md bg-lavender/80" />
                  ))}
                </div>
              </>
            )}
            {screen === 1 && (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="h-20 w-20 rounded-full border-4 border-lavender border-t-primary border-r-violet" />
                <p className="mt-2 text-xs font-bold text-dark">72%</p>
                <p className="text-[10px] text-muted">Daily goal</p>
              </div>
            )}
            {screen === 2 && (
              <div className="space-y-2 pt-2">
                <div className="h-8 rounded-lg bg-lavender" />
                <div className="h-8 w-3/4 rounded-lg bg-lavender/70" />
                <div className="h-8 w-2/3 rounded-lg bg-lavender/50" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

type ChatMessage = { role: 'bot' | 'user'; text: string }

function AiDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Hi! I can help plan your next digital product.' },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [
      ...m,
      { role: 'user', text },
      { role: 'bot', text: 'Great idea. I would start with scope, timeline, and an MVP feature list.' },
    ])
    setInput('')
  }

  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-2xl border border-lavender bg-white">
      <div className="border-b border-lavender px-3 py-2 text-xs font-semibold text-primary">
        Webnixa AI Copilot (demo)
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs ${
              m.role === 'user'
                ? 'ml-auto bg-primary text-white rounded-br-sm'
                : 'glass text-dark rounded-bl-sm'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-lavender p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask the copilot..."
          className="flex-1 rounded-xl border border-lavender px-3 py-2 text-xs outline-none focus:border-primary/40"
        />
        <button
          type="button"
          onClick={send}
          className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white"
        >
          Send
        </button>
      </div>
    </div>
  )
}

function DashboardDemo() {
  const [stats, setStats] = useState([42, 68, 55, 91, 74, 63])

  useEffect(() => {
    const id = window.setInterval(() => {
      setStats((prev) => prev.map((v) => Math.max(30, Math.min(95, v + (Math.random() - 0.5) * 14))))
    }, 1800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="rounded-2xl border border-lavender bg-white p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        <div className="glass rounded-xl px-3 py-2 text-xs">
          <div className="text-muted">Revenue</div>
          <div className="font-display text-lg font-bold text-dark">$24.8k</div>
        </div>
        <div className="glass rounded-xl px-3 py-2 text-xs">
          <div className="text-muted">Active users</div>
          <div className="font-display text-lg font-bold text-dark">1,204</div>
        </div>
      </div>
      <div className="grid h-36 grid-cols-6 items-end gap-2">
        {stats.map((h, i) => (
          <motion.div
            key={i}
            className="rounded-t-md bg-gradient-to-t from-primary to-violet"
            animate={{ height: `${h}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
        ))}
      </div>
    </div>
  )
}

const panels: Record<DemoId, () => ReactNode> = {
  website: () => <WebsiteDemo />,
  app: () => <AppDemo />,
  ai: () => <AiDemo />,
  dashboard: () => <DashboardDemo />,
}

export function InteractiveDemos() {
  const [active, setActive] = useState<DemoId>('website')
  const Panel = panels[active]

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              active === id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'glass text-dark hover:bg-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong min-h-[320px] rounded-3xl p-4 md:p-6"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Interactive preview · sample data
          </p>
          <Panel />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}