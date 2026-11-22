type Props = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, subtitle, align = 'center' }: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-12 max-w-2xl ${alignClass}`}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-dark md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>
      )}
    </div>
  )
}