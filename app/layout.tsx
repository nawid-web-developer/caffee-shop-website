import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Origin Roasters — Specialty Coffee, Roasted to Order',
    template: '%s — Origin Roasters',
  },
  description:
    'Small-batch specialty coffee roasted to order. Single origin, blends, espresso, decaf, instant, and brewing gear from a craft roastery obsessed with quality.',
  keywords: [
    'specialty coffee',
    'single origin coffee',
    'coffee subscription',
    'coffee roastery',
    'espresso beans',
    'cold brew',
    'coffee gear',
  ],
  openGraph: {
    title: 'Origin Roasters — Specialty Coffee, Roasted to Order',
    description:
      'Small-batch specialty coffee roasted to order. Explore single origins, blends, espresso, subscriptions, and brewing gear.',
    type: 'website',
    siteName: 'Origin Roasters',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Origin Roasters — Specialty Coffee',
    description:
      'Small-batch specialty coffee roasted to order. Single origins, blends, espresso, subscriptions, and gear.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
