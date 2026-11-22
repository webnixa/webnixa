import { motion } from 'framer-motion'
import { Bot, Globe, Smartphone } from 'lucide-react'
import { useRef } from 'react'
import type { ServiceItem } from '../../data/services'
import { useTilt } from '../../hooks/useTilt'

const icons = {
  website: Globe,
  app: Smartphone,
  ai: Bot,
}

function ServiceVisual({ id }: { id: ServiceItem['id'] }) {
  if (id === 'website') {
    return (
      <div className="relative mx-auto mt-6 h-36 w-full max-w-[220px]">
        <motion.div
          className="absolute inset-0 rounded-xl border border-white/80 bg-white/90 shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="flex gap-1 border-b border-lavender p-2">
            <span className="h-2 w-2 rounded-full bg-red-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
          </div>
          <div className="p-3 font-mono text-[10px] text-primary">{`<Webnixa />`}</div>
          <div className="mx-3 h-2 rounded bg-lavender" />
          <div className="mx-3 mt-2 h-2 w-2/3 rounded bg-violet/30" />
        </motion.div>
        <motion.span
          className="absolute -right-2 top-8 rounded-lg bg-primary px-2 py-1 text-[10px] text-white"
          animate={{ rotate: [0, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {'{ }'}
        </motion.span>
      </div>
    )
  }
  if (id === 'app') {
    return (
      <div className="relative mx-auto mt-6 h-40 w-28">
        <motion.div
          className="h-full rounded-[1.5rem] border-4 border-dark/10 bg-gradient-to-b from-lavender to-white p-2 shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="h-full rounded-[1.1rem] bg-white p-2">
            <div className="h-16 rounded-lg bg-gradient-to-br from-primary to-violet opacity-90" />
            <div className="mt-2 grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-square rounded bg-lavender/80" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
  return (
    <div className="relative mx-auto mt-6 flex h-36 items-center justify-center">
      <motion.div
        className="relative"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <div className="h-24 w-20 rounded-2xl bg-gradient-to-b from-white to-lavender shadow-lg">
          <div className="mx-auto mt-3 flex h-8 w-12 items-center justify-center gap-2 rounded-lg bg-dark/90">
            <span className="h-2 w-2 rounded-full bg-violet shadow-[0_0_8px_#8D4DFF]" />
            <span className="h-2 w-2 rounded-full bg-violet shadow-[0_0_8px_#8D4DFF]" />
          </div>
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-muted/30" />
        </div>
        <motion.div
          className="absolute -inset-4 -z-10 rounded-full bg-primary/20 blur-xl"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}

type Props = {
  service: ServiceItem
  onSelect: (s: ServiceItem) => void
}

export function ServiceCard({ service, onSelect }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const { onMove, onLeave } = useTilt(ref, 6)
  const Icon = icons[service.id]

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect(service)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card-premium group w-full rounded-3xl border border-white/90 bg-white/75 p-6 text-left transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-violet/35 hover:bg-white hover:shadow-[0_20px_50px_rgba(108,25,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      whileHover={{ scale: 1.015 }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender text-primary"
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
          transition={{ duration: 0.45 }}
        >
          <Icon size={22} />
        </motion.span>
        <h3 className="font-display text-lg font-semibold text-dark">{service.title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted">{service.description}</p>
      <ServiceVisual id={service.id} />
      <span className="mt-4 inline-flex text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View details →
      </span>
    </motion.button>
  )
}