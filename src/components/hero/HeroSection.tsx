import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { scrollToSection } from '../../utils/scroll'
import { MagneticButton } from '../ui/MagneticButton'

const HeroScene3D = lazy(() =>
  import('./HeroScene3D').then((m) => ({ default: m.HeroScene3D })),
)

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-x-clip px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-32 lg:pb-24"
    >
      <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 xl:gap-10">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 max-w-xl lg:max-w-none"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-muted">
            ✦ Build · Automate · Grow
          </span>
          <h1 className="mt-5 font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight text-dark min-[375px]:text-[2.125rem] sm:text-4xl md:text-5xl lg:text-[3.2rem]">
            Turn Your Ideas Into{' '}
            <span className="text-gradient">Powerful Digital Solutions</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            We design stunning websites, build innovative apps, and automate workflows with AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton onClick={() => scrollToSection('ideas')}>
              Share Your Idea
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollToSection('services')}>
              Explore Services
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0"
        >
          <div className="glass-strong absolute -inset-2 -z-10 rounded-[2.25rem] opacity-90 md:-inset-3" />
          <Suspense
            fallback={
              <div className="flex h-[min(440px,58vh)] items-center justify-center rounded-[2rem] bg-lavender/35 md:h-[500px]">
                <div className="h-10 w-10 animate-pulse rounded-full bg-primary/20" />
              </div>
            }
          >
            <HeroScene3D />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}