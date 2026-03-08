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
      <span className="relative inline-flex h-6 w-12 items-center overflow-hidden rounded-full border border-white/10 bg-black/10 px-1 dark:bg-white/5">
        <span className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-current/20 blur-[6px]" />
        <span className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 animate-[loader-slide_1s_ease-in-out_infinite] rounded-full bg-current shadow-[0_0_12px_currentColor]" />
        <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-current/10" />
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

