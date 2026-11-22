export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(141, 77, 255, 0.1), transparent), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(108, 25, 255, 0.06), transparent), radial-gradient(ellipse 50% 40% at 0% 80%, rgba(237, 227, 255, 0.85), transparent), #FAF7FF',
        }}
      />
      <div className="ambient-orb absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/8 blur-2xl" />
      <div className="ambient-orb ambient-orb-delay absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-violet/10 blur-2xl" />
    </div>
  )
}