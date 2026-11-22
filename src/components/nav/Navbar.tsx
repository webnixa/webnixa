import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToSection } from '../../utils/scroll'
import { MagneticButton } from '../ui/MagneticButton'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'demos', label: 'Demos' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const go = (id: string) => {
    setOpen(false)
    if (id === 'demos' && !onHome) {
      navigate('/demos')
      return
    }
    if (onHome) {
      if (id === 'demos') {
        navigate('/demos')
        return
      }
      scrollToSection(id)
    } else {
      navigate('/')
      window.setTimeout(() => scrollToSection(id), 120)
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-[max(1rem,env(safe-area-inset-top))] md:px-6">
      <nav
        className="glass-strong glow-purple mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 md:px-6"
        aria-label="Main"
      >
        <button
          type="button"
          onClick={() => go('home')}
          className="font-display text-xl font-bold text-dark"
        >
          Web<span className="text-gradient">nixa</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive = onHome && active === link.id
            return (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-lavender/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:block">
          <MagneticButton onClick={() => go('ideas')} className="!px-5 !py-2.5">
            Share Your Idea
          </MagneticButton>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-dark lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong mx-auto mt-2 max-h-[min(70vh,calc(100dvh-6rem))] max-w-6xl overflow-y-auto rounded-2xl p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-dark hover:bg-lavender/50"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-lavender pt-3">
              <MagneticButton className="w-full" onClick={() => go('ideas')}>
                Share Your Idea
              </MagneticButton>
            </div>
            <Link
              to="/demos"
              onClick={() => setOpen(false)}
              className="mt-2 block text-center text-sm text-muted hover:text-primary"
            >
              Open Demos Page →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}