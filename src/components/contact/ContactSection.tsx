import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import {
  WEBNIXA_EMAIL,
  WEBNIXA_INSTAGRAM,
  WEBNIXA_WHATSAPP,
  WEBNIXA_WHATSAPP_DISPLAY,
} from '../../lib/contact'
import { scrollToSection } from '../../utils/scroll'
import { ScrollReveal } from '../ui/ScrollReveal'
import { MagneticButton } from '../ui/MagneticButton'

function InstagramGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M17.5 6.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5" />
    </svg>
  )
}

const WHATSAPP_GREETING = encodeURIComponent('Hi Webnixa! I would like to discuss a project.')

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-8 pt-20 md:px-6">
      <ScrollReveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-violet to-primary p-px">
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-40"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.35), transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.35), transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.35), transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="relative rounded-[calc(2rem-1px)] bg-gradient-to-br from-primary/95 via-violet to-primary px-6 py-16 text-center text-white md:px-12 md:py-20">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">Ready to Bring Your Idea to Life?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85 md:text-lg">
              Get in touch today — WhatsApp, email, or Instagram. Share a full brief with our project form.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton
                variant="ghost"
                className="!border-white/40 !bg-white !text-primary hover:!bg-lavender"
                href={`https://wa.me/${WEBNIXA_WHATSAPP}?text=${WHATSAPP_GREETING}`}
              >
                <MessageCircle size={18} /> WhatsApp Us
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                className="!border-white/40 !bg-white/15 !text-white hover:!bg-white/25"
                href={`mailto:${WEBNIXA_EMAIL}`}
              >
                <Mail size={18} /> Email Us
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                className="!border-white/40 !bg-white/15 !text-white hover:!bg-white/25"
                href={WEBNIXA_INSTAGRAM}
              >
                <InstagramGlyph size={18} /> Instagram
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                className="!border-white/40 !bg-white !text-primary hover:!bg-lavender"
                onClick={() => scrollToSection('ideas')}
              >
                Share Your Project
              </MagneticButton>
            </div>

            <footer className="mt-14 border-t border-white/20 pt-10 text-sm text-white/80">
              <p className="font-display text-2xl font-bold text-white">
                Web<span className="text-white/90">nixa</span>
              </p>
              <p className="mt-1">Build · Automate · Grow</p>
              <p className="mt-4">
                <a className="hover:underline" href={`mailto:${WEBNIXA_EMAIL}`}>
                  {WEBNIXA_EMAIL}
                </a>
                {' · '}
                WhatsApp {WEBNIXA_WHATSAPP_DISPLAY}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <a
                  href={`https://wa.me/${WEBNIXA_WHATSAPP}?text=${WHATSAPP_GREETING}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/25"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href={`mailto:${WEBNIXA_EMAIL}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/25"
                >
                  <Mail size={20} />
                </a>
                <a
                  href={WEBNIXA_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/25"
                >
                  <InstagramGlyph />
                </a>
              </div>
              <p className="mt-8 text-xs text-white/50">© {new Date().getFullYear()} Webnixa. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}