import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioProjects, type PortfolioProject } from '../../data/portfolio'
import { useTilt } from '../../hooks/useTilt'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionHeading } from '../ui/SectionHeading'
import { PortfolioProjectModal } from './PortfolioProjectModal'

function ProjectPreview({ id, accent }: { id: string; accent: string }) {
  if (id === 'analytics') {
    return (
      <div className="relative h-48 p-4">
        <div className="grid h-full grid-cols-4 gap-2">
          {[55, 72, 48, 88].map((h, i) => (
            <div key={i} className="flex items-end">
              <motion.div
                className="w-full rounded-t-md"
                style={{ backgroundColor: accent, height: `${h}%`, opacity: 0.3 + i * 0.12 }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
        <motion.div
          className="glass absolute bottom-4 left-4 rounded-lg px-2 py-1 text-[10px] font-medium text-dark"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Sample KPI board
        </motion.div>
      </div>
    )
  }
  if (id === 'fitness') {
    return (
      <div className="flex h-48 items-center justify-center">
        <motion.div
          className="h-36 w-20 rounded-2xl border-4 border-white bg-gradient-to-b from-lavender to-white p-1.5 shadow-lg"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        >
          <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white">
            <motion.div
              className="h-14 w-14 rounded-full border-4 border-lavender"
              style={{ borderTopColor: accent, borderRightColor: accent }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <span className="mt-2 text-xs font-semibold text-dark">8,432</span>
            <span className="text-[10px] text-muted">steps</span>
          </div>
        </motion.div>
      </div>
    )
  }
  return (
    <div className="relative flex h-48 flex-col justify-end gap-2 p-4">
      <div className="glass max-w-[85%] self-start rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-dark">
        How can I automate my workflow?
      </div>
      <div
        className="max-w-[90%] self-end rounded-2xl rounded-br-sm px-3 py-2 text-xs text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, #8D4DFF)` }}
      >
        I can help you map triggers, actions, and AI steps.
      </div>
      <motion.div
        className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-md"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        🤖
      </motion.div>
    </div>
  )
}

function PortfolioCard({
  project,
  onOpen,
}: {
  project: PortfolioProject
  onOpen: (p: PortfolioProject) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { onMove, onLeave } = useTilt(ref, 6)

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card-premium group relative overflow-hidden rounded-3xl border border-white/90 bg-gradient-to-br ${project.gradient} p-1 transition-all duration-500 hover:scale-[1.02]`}
    >
      <div className="rounded-[1.35rem] bg-white/80 p-5 backdrop-blur-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
            {project.category}
          </span>
          <span className="rounded-full border border-violet/25 bg-violet/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Demo concept
          </span>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-soft-bg/80">
          <ProjectPreview id={project.id} accent={project.accent} />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-dark">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition group-hover:gap-2"
        >
          View project <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  )
}

export function PortfolioSection() {
  const [selected, setSelected] = useState<PortfolioProject | null>(null)

  return (
    <section id="portfolio" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            title="Explore Our Portfolio"
            subtitle="Sample concept projects and interactive demos — polished showcases, not named client case studies."
          />
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {portfolioProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <PortfolioCard project={project} onOpen={setSelected} />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p className="mt-10 text-center">
            <Link to="/demos" className="text-sm font-semibold text-primary hover:underline">
              Open interactive demos →
            </Link>
          </p>
        </ScrollReveal>
      </div>
      <PortfolioProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}