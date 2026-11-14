'use client';

import { useState } from 'react';
import { Building2, Package, Handshake, Wrench, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WholesaleContent() {
  const { toast } = useToast();
  const [form, setForm] = useState({ business: '', contact: '', email: '', volume: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Application received', description: 'We will be in touch within 2 business days.' });
    setForm({ business: '', contact: '', email: '', volume: '', message: '' });
  };

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/17670119/pexels-photo-17670119.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
          alt="Café interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/60 to-espresso/30" />
        <div className="relative h-full container-wide flex items-center">
          <div className="max-w-xl text-cream-foreground">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Wholesale</p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Serve great
              <br />
              coffee.
            </h1>
            <p className="text-lg text-cream/85 max-w-md">
              Partner with Origin Roasters for wholesale beans, equipment, and
              barista training. Built for cafés, restaurants, and offices.
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide py-16 lg:py-24">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Package, title: 'Wholesale Pricing', desc: 'Tiered pricing with competitive margins on beans and gear. Volume discounts scale automatically.' },
            { icon: Handshake, title: 'Barista Training', desc: 'On-site dialing-in, espresso calibration, and staff training included with every partnership.' },
            { icon: Wrench, title: 'Equipment Support', desc: 'Espresso machine and grinder sourcing, maintenance guidance, and loaner support.' },
            { icon: Building2, title: 'Custom Blends', desc: 'Work with our roaster to create a signature blend exclusive to your business.' },
          ].map((feature) => (
            <div key={feature.title} className="bg-card border border-border rounded-lg p-6">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream/40 py-16 lg:py-24">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">How It Works</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">A partnership, not a transaction</h2>
            <ul className="space-y-5">
              {[
                'Tell us about your business and your coffee volume',
                'We send wholesale pricing and a sample kit of our coffees',
                'We dial in your espresso and train your staff on-site',
                'You get a dedicated account manager and reordering portal',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-base pt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="font-serif text-2xl font-bold mb-1">Apply for Wholesale</h3>
            <p className="text-sm text-muted-foreground mb-6">We review every application personally.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Business Name</label>
                  <input
                    required
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your café name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Contact Name</label>
                  <input
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@business.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Estimated Monthly Volume</label>
                <select
                  required
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="">Select a range</option>
                  <option>Under 10kg / month</option>
                  <option>10–25kg / month</option>
                  <option>25–50kg / month</option>
                  <option>50kg+ / month</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Tell us about your business</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="What kind of coffee program are you building?"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Submit Application
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
