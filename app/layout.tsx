import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quote Generator',
  description: 'Find motivational quotes on success, life, motivation, and courage.',
  keywords: 'quotes, motivation, inspiration, success, life wisdom, motivational quotes, inspirational quotes',
  authors: [{ name: 'Quote Generator' }],
  creator: 'Quote Generator',
  publisher: 'Quote Generator',
  robots: 'index, follow',
  openGraph: {
    title: 'Quote Generator',
    description: 'Find motivational quotes on success, life, motivation, and courage.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quote Generator - Discover Inspiring Wisdom',
    description: 'Find motivational quotes on success, life, motivation, and courage.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e1b4b" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <main role="main" aria-label="Quote Generator Application">
          {children}
        </main>
      </body>
    </html>
  );
}