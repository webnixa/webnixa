import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { PortfolioProject } from '../../data/portfolio'
import { MagneticButton } from '../ui/MagneticButton'
import { Link } from 'react-router-dom'

type Props = {
  project: PortfolioProject | null
  onClose: () => void
}

export function PortfolioProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-labelledby="portfolio-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-dark/30 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
          />
          <motion.div
            className="glass-strong glow-purple relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl p-6 md:p-8"
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-lavender/60"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
            <motion.div
              className="h-36 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${project.accent}33, #EDE3FF, #FAF7FF)`,
              }}
            />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
                {project.category}
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                Sample demo
              </span>
            </div>
            <h3 id="portfolio-modal-title" className="mt-3 font-display text-2xl font-bold text-dark">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{project.longDescription}</p>
            <ul className="mt-5 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-dark">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              This is a concept showcase — not a claim of delivery for a named client.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/demos" onClick={onClose}>
                <MagneticButton className="!px-5 !py-2.5">Try live demo</MagneticButton>
              </Link>
              <MagneticButton variant="ghost" onClick={onClose}>
                Close
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}