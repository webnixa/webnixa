import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1400)
    return () => window.clearTimeout(t)
  }, [])

  if (done) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-soft-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      onAnimationComplete={() => {
        if (done) return
      }}
    >
      <motion.div
        className="font-display text-3xl font-bold tracking-tight text-dark"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Web<span className="text-gradient">nixa</span>
      </motion.div>
      <motion.p
        className="mt-2 text-sm text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Build · Automate · Grow
      </motion.p>
      <motion.div
        className="mt-8 h-1 w-32 overflow-hidden rounded-full bg-lavender"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-violet"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}