import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LIVE_WEBSITE_DEMO } from '../lib/contact'
import { InteractiveDemos } from '../components/demos/InteractiveDemos'
import { ScrollReveal } from '../components/ui/ScrollReveal'

export function DemosPage() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-clip px-4 pb-20 pt-28 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="text-sm font-medium text-primary hover:underline">
            ← Back to home
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-dark sm:text-3xl md:text-4xl">
            Experience Our Solutions Live
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Explore working UI demos for websites, mobile apps, AI tools, and dashboards. All data is
            simulated for showcase purposes.
          </p>
        </motion.div>

        <ScrollReveal className="mt-8">
          <a
            href={LIVE_WEBSITE_DEMO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong glow-purple mb-8 flex items-center justify-between gap-4 rounded-2xl p-6 transition hover:border-primary/30"
          >
            <div>
              <p className="font-display text-lg font-semibold text-dark">{LIVE_WEBSITE_DEMO.label}</p>
              <p className="mt-1 text-sm text-muted">{LIVE_WEBSITE_DEMO.description}</p>
            </div>
            <ExternalLink className="text-primary" size={22} />
          </a>
        </ScrollReveal>

        <ScrollReveal className="mt-2">
          <InteractiveDemos />
        </ScrollReveal>
      </div>
    </main>
  )
}