import Link from 'next/link';
import { studioName, instagramUrl, instagramHandle } from '@/lib/constants';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/rates', label: 'Rates' },
  { href: '/policies', label: 'Policies' },
  { href: '/gear', label: 'Gear' },
  { href: '/location', label: 'Location' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              {studioName}
            </h3>
            <p className="text-sm text-primary/70">
              Bookings handled through Instagram DMs
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary">Connect</h4>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary/70 hover:text-primary transition-colors"
            >
              {instagramHandle}
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10">
          <p className="text-xs text-primary/60 text-center">
            © {currentYear} {studioName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


