'use client';

import Link from 'next/link';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'All Coffee', href: '/shop' },
      { label: 'Single Origin', href: '/shop/single-origin' },
      { label: 'Blends', href: '/shop/blends' },
      { label: 'Espresso', href: '/shop/espresso' },
      { label: 'Decaf', href: '/shop/decaf' },
      { label: 'Instant & Cold Brew', href: '/shop/instant' },
      { label: 'Coffee Gear', href: '/shop/gear' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Sourcing', href: '/about' },
      { label: 'Roastery', href: '/about' },
      { label: 'Sustainability', href: '/about' },
      { label: 'Journal', href: '/blog' },
      { label: 'Careers', href: '/about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping & Returns', href: '/contact' },
      { label: 'Brew Guides', href: '/blog' },
      { label: 'Subscriptions', href: '/subscriptions' },
      { label: 'Wholesale', href: '/wholesale' },
      { label: 'Café Locations', href: '/locations' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-espresso text-espresso-foreground mt-20">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-cream-foreground">
                Origin<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-cream/80 max-w-xs leading-relaxed mb-6">
              Small-batch specialty coffee, roasted to order. Sourced with care,
              roasted with intention, brewed with respect.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/60 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/90 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/60 mb-4">
              Stay in Touch
            </h3>
            <p className="text-sm text-cream/80 mb-4">
              New origins, brew guides, and stories — delivered monthly.
            </p>
            {subscribed ? (
              <p className="text-sm text-accent font-medium">
                Thanks for subscribing. Check your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border border-cream/20 rounded-md px-4 py-2.5 text-sm text-cream-foreground placeholder:text-cream/40 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground rounded-md px-4 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} Origin Roasters. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-cream/60">
            <Link href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
