import { Link } from 'react-router-dom'
import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneTel,
  instagramHandle,
  instagramUrl,
  studioName,
} from '../lib/constants'

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Book', to: '/book' },
  { label: 'Services', to: '/services' },
  { label: 'Rates', to: '/rates' },
  { label: 'Policies', to: '/policies' },
  { label: 'Gear', to: '/gear' },
  { label: 'Location', to: '/location' },
  { label: 'Contact', to: '/contact' },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 dark:border-white/10">
      <div className="container-pad py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-950 dark:text-white">{studioName}</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Book sessions using the booking calendar. Questions? Email, call, or DM us.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <a
                  className="text-zinc-800 underline decoration-zinc-400/50 hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </p>
              <p>
                <a
                  className="text-zinc-800 underline decoration-zinc-400/50 hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
                  href={`tel:${contactPhoneTel}`}
                >
                  {contactPhoneDisplay}
                </a>
              </p>
              <p>
                <a
                  className="text-zinc-800 underline decoration-zinc-400/50 hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {instagramHandle}
                </a>
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-xs text-zinc-500 dark:text-zinc-500">
          © {year} {studioName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

