'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="container-narrow text-center">
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="h-6 w-6 text-accent" />
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-balance">
          Join the Origin community
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
          Get early access to new harvests, brew guides, and subscriber-only
          coffees. No spam — just good coffee content, once a month.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-4 bg-accent/20 rounded-md text-accent font-medium">
            <Check className="h-5 w-5" />
            You&rsquo;re in. Check your inbox for a welcome.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-primary-foreground/5 border border-primary-foreground/20 rounded-md px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="text-xs text-primary-foreground/40 mt-4">
          By subscribing, you agree to our privacy policy.
        </p>
      </div>
    </section>
  );
}
