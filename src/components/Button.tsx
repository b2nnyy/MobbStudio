import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

const base =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950'

const variants: Record<Variant, string> = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
  secondary:
    'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
  ghost: 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white',
}

export function LoadingSpark({
  label,
  className,
}: {
  label?: ReactNode
  className?: string
}) {
  return (
    <span className={cx('inline-flex items-center gap-2', className)} aria-hidden={label ? undefined : true}>
      <span className="inline-flex h-5 w-5 shrink-0 animate-spin items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <circle cx="12" cy="3.5" r="1.8" fill="currentColor" opacity="1" />
          <circle cx="17.66" cy="5.84" r="1.8" fill="currentColor" opacity="0.88" />
          <circle cx="20" cy="11.5" r="1.8" fill="currentColor" opacity="0.76" />
          <circle cx="17.66" cy="17.16" r="1.8" fill="currentColor" opacity="0.64" />
          <circle cx="12" cy="19.5" r="1.8" fill="currentColor" opacity="0.52" />
          <circle cx="6.34" cy="17.16" r="1.8" fill="currentColor" opacity="0.4" />
          <circle cx="4" cy="11.5" r="1.8" fill="currentColor" opacity="0.28" />
          <circle cx="6.34" cy="5.84" r="1.8" fill="currentColor" opacity="0.16" />
        </svg>
      </span>
      {label ? <span>{label}</span> : null}
    </span>
  )
}

export function Button({
  variant = 'primary',
  className,
  children,
  loading = false,
  loadingLabel,
  disabled,
  ...props
}: {
  variant?: Variant
  className?: string
  children: ReactNode
  loading?: boolean
  loadingLabel?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx(base, variants[variant], className)} disabled={disabled || loading} {...props}>
      {loading ? <LoadingSpark label={loadingLabel ?? children} /> : children}
    </button>
  )
}

export function ButtonExternalLink({
  variant = 'primary',
  className,
  children,
  ...props
}: {
  variant?: Variant
  className?: string
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cx(base, variants[variant], className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}

export function ButtonLink({
  variant = 'secondary',
  className,
  children,
  ...props
}: {
  variant?: Variant
  className?: string
  children: ReactNode
} & LinkProps) {
  return (
    <Link className={cx(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  )
}

