import type { ReactNode } from 'react'

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function Section({
  children,
  className,
  border = false,
  id,
}: {
  children: ReactNode
  className?: string
  border?: boolean
  id?: string
}) {
  return (
    <section id={id} className={cx(border && 'border-b border-white/10', className)}>
      <div className="container-pad py-14 sm:py-16">{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <header className={cx('max-w-2xl', className)}>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{description}</p>
      ) : null}
    </header>
  )
}

