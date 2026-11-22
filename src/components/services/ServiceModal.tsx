import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ServiceItem } from '../../data/services'
import { MagneticButton } from '../ui/MagneticButton'
import { scrollToEnquiryForm } from '../../utils/scroll'

type Props = {
  service: ServiceItem | null
  onClose: () => void
}

export function ServiceModal({ service, onClose }: Props) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-labelledby="service-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close dialog"
          />
          <motion.div
            className="glass-strong glow-purple relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 md:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-lavender/60"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {service.shortTitle}
            </p>
            <h3 id="service-modal-title" className="mt-2 font-display text-2xl font-bold text-dark">
              {service.title}
            </h3>
            <p className="mt-3 text-muted">{service.detail}</p>
            <ul className="mt-6 space-y-2">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-dark">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                onClick={() => {
                  onClose()
                  scrollToEnquiryForm()
                }}
              >
                Start a Project
              </MagneticButton>
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