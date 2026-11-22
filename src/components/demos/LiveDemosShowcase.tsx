import { Link } from 'react-router-dom'
import { LIVE_WEBSITE_DEMO } from '../../lib/contact'
import { MagneticButton } from '../ui/MagneticButton'

const stats = [
  { title: 'Growth', value: '+24%', delay: '0s' },
  { title: 'Performance', value: '98%', delay: '0.8s' },
  { title: 'Automation', value: 'Active', delay: '1.4s' },
]

export function LiveDemosShowcase() {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 via-lavender/40 to-soft-bg p-4 sm:rounded-[2rem] sm:p-6 md:p-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.95fr_1fr]">
        {/* Laptop preview */}
        <div className="demo-float-slow relative mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-lavender bg-white/90 p-3 shadow-lg">
            <div className="mb-2 flex gap-1">
              <span className="h-2 w-2 rounded-full bg-red-300" />
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
            </div>
            <div className="overflow-hidden rounded-xl bg-[#14101f] p-3">
              <p className="text-[10px] font-semibold text-violet">Webnixa Analytics</p>
              <div className="mt-3 grid h-24 grid-cols-6 items-end gap-1">
                {[42, 68, 55, 82, 60, 74].map((h, i) => (
                  <div
                    key={i}
                    className="demo-bar-grow rounded-t bg-gradient-to-t from-primary to-violet"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
              <p className="mt-2 text-[9px] text-lavender/90">AI workflow · live preview</p>
            </div>
          </div>
          {stats.map((s) => (
            <div
              key={s.title}
              className="demo-float-card glass absolute rounded-xl px-3 py-2 shadow-md"
              style={{
                top: s.title === 'Growth' ? '-8px' : 'auto',
                right: s.title === 'Growth' ? '-12px' : 'auto',
                bottom: s.title === 'Performance' ? '24px' : 'auto',
                left: s.title === 'Automation' ? '-10px' : 'auto',
                animationDelay: s.delay,
              }}
            >
              <p className="text-[9px] uppercase tracking-wide text-muted">{s.title}</p>
              <p className="font-display text-sm font-bold text-primary">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Center hub */}
        <div className="order-first text-center lg:order-none">
          <div className="glass-strong mx-auto max-w-xs rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Live interface</p>
            <p className="mt-2 text-sm text-muted">Websites, mobile UIs, and AI automations in motion.</p>
            <div className="mt-4 space-y-2 text-left text-xs">
              <div className="rounded-xl bg-primary/10 px-3 py-2 text-dark">Website Experience</div>
              <div className="rounded-xl bg-violet/10 px-3 py-2 text-dark">Mobile App Experience</div>
              <div className="rounded-xl bg-lavender px-3 py-2 text-dark">AI Automation Experience</div>
            </div>
          </div>
        </div>

        {/* Phone preview */}
        <div className="demo-float-slow demo-float-delay relative mx-auto w-36">
          <div className="rounded-[1.6rem] border-4 border-white bg-gradient-to-b from-lavender to-white p-1.5 shadow-xl">
            <div className="rounded-[1.25rem] bg-[#14101f] p-2">
              <div className="h-24 rounded-lg bg-gradient-to-br from-primary to-violet" />
              <div className="mt-2 h-1.5 rounded bg-violet/40" />
              <div className="mt-1 h-1.5 w-2/3 rounded bg-violet/25" />
              <p className="mt-2 text-center text-[8px] text-lavender">App UI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href={LIVE_WEBSITE_DEMO.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm rounded-2xl border border-lavender bg-white/80 px-5 py-4 text-left transition hover:border-primary/30 sm:w-auto"
        >
          <p className="text-xs font-semibold uppercase text-primary">{LIVE_WEBSITE_DEMO.label}</p>
          <p className="mt-1 text-sm text-muted">{LIVE_WEBSITE_DEMO.description}</p>
        </a>
        <Link to="/demos">
          <MagneticButton>Explore Interactive Demos</MagneticButton>
        </Link>
      </div>
    </div>
  )
}