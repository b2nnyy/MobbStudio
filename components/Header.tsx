'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { studioName, instagramUrl } from '@/lib/constants';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/rates', label: 'Rates' },
  { href: '/policies', label: 'Policies' },
  { href: '/gear', label: 'Gear' },
  { href: '/location', label: 'Location' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            aria-label="Home"
          >
            {studioName}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-primary/70 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button
            href={instagramUrl}
            external
            variant="primary"
            className="text-sm"
            aria-label="Book on Instagram"
          >
            Book on Instagram
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                  pathname === link.href
                    ? 'bg-background-secondary text-primary'
                    : 'text-primary/70 hover:text-primary hover:bg-background-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

