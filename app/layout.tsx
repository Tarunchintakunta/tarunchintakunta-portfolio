import type { Metadata } from 'next';
import { Sarabun } from 'next/font/google';
import { getSiteUrl } from '@/lib/site';
import './globals.css';

const sarabun = Sarabun({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const description = 'Tarun Chintakunta — creative engineer for the interactive web. Products, cinematic WebGL sites and AI tools, built end to end.';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Tarun Chintakunta — Portfolio',
    template: '%s — Tarun Chintakunta',
  },
  description,
  openGraph: { title: 'Tarun Chintakunta — Portfolio', description, type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={sarabun.className}>
        <a className="skip-link" href="#content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
