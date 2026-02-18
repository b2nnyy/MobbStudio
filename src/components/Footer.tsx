import { Link } from 'react-router-dom'
import { instagramHandle, instagramUrl, studioName } from '../lib/constants'

const nav = [
  { label: 'Home', to: '/' },
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
    <footer className="border-t border-white/10">
      <div className="container-pad py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{studioName}</p>
            <p className="mt-2 text-sm text-zinc-400">
              Bookings handled through Instagram DMs.
            </p>
            <p className="mt-4 text-sm">
              <a
                className="text-zinc-200 underline decoration-white/30 hover:text-white hover:decoration-white"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {instagramHandle}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link className="text-zinc-300 hover:text-white" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-xs text-zinc-500">
          © {year} {studioName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

