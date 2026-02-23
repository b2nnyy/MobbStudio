import { useId, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { instagramHandle, instagramUrl, studioName } from '../lib/constants'
import { ButtonExternalLink, ButtonLink } from './Button'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { label: 'Book', to: '/book' },
  { label: 'Rates', to: '/rates' },
  { label: 'Policies', to: '/policies' },
  { label: 'Location', to: '/location' },
  { label: 'Contact', to: '/contact' },
] as const

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'rounded-md px-2 py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
    isActive
      ? 'text-zinc-950 dark:text-white'
      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white',
  ].join(' ')
}

export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950"
      >
        Skip to content
      </a>

      <div className="container-pad">
        <div className="flex h-24 items-center justify-between gap-4 sm:h-28">
          <Link
            to="/"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950"
            aria-label={`${studioName} home`}
          >
            <span className="block h-16 w-32 overflow-hidden sm:h-20 sm:w-40">
              <img
                src="/logo.gif"
                alt={studioName}
                className="h-full w-full scale-125 object-cover object-center"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <ButtonLink to="/book">Book a session</ButtonLink>
            <ButtonExternalLink
              href={instagramUrl}
              variant="secondary"
              aria-label={`DM on Instagram (${instagramHandle})`}
            >
              DM on Instagram
            </ButtonExternalLink>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950 lg:hidden"
            aria-controls={menuId}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <div
          id={menuId}
          className={[
            'lg:hidden',
            open ? 'block' : 'hidden',
          ].join(' ')}
        >
          <nav className="pb-4" aria-label="Mobile">
            <div className="grid gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    [
                      'rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-white'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white',
                    ].join(' ')
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-4">
              <div className="grid gap-2">
                <ThemeToggle className="w-full" />
                <ButtonLink className="w-full" to="/book" onClick={() => setOpen(false)}>
                  Book a session
                </ButtonLink>
                <ButtonExternalLink
                  className="w-full"
                  href={instagramUrl}
                  variant="secondary"
                  aria-label={`DM on Instagram (${instagramHandle})`}
                  onClick={() => setOpen(false)}
                >
                  DM on Instagram
                </ButtonExternalLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

