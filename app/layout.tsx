import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { studioName } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: studioName,
    template: `%s | ${studioName}`,
  },
  description: 'Professional recording studio offering tracking, mixing, and mastering services. Book your session via Instagram DM.',
  keywords: ['recording studio', 'music production', 'mixing', 'mastering', 'audio engineering'],
  openGraph: {
    title: studioName,
    description: 'Professional recording studio offering tracking, mixing, and mastering services.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: studioName,
    description: 'Professional recording studio offering tracking, mixing, and mastering services.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


