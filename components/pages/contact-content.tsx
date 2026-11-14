'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactContent() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message sent', description: 'We will get back to you within 1 business day.' });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <section className="container-wide pt-12 pb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Contact</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">Let&rsquo;s talk</h1>
        <p className="text-muted-foreground max-w-xl">Questions about your order, a subscription, or wholesale? We are here to help.</p>
      </section>

      <section className="container-wide pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email', value: 'hello@originroasters.com', desc: 'For order and subscription questions' },
              { icon: Phone, title: 'Phone', value: '(718) 555-0142', desc: 'Mon–Fri, 9am–5pm EST' },
              { icon: MapPin, title: 'Roastery', value: '418 Maiden Lane, Brooklyn, NY', desc: 'By appointment only' },
              { icon: MessageSquare, title: 'Wholesale', value: 'wholesale@originroasters.com', desc: 'For café and office partnerships' },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-0.5">{item.title}</h3>
                    <p className="text-sm font-semibold">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-8">
            <h2 className="font-serif text-2xl font-bold mb-1">Send a message</h2>
            <p className="text-sm text-muted-foreground mb-6">We respond within one business day.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Subject</label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option>Order question</option>
                  <option>Subscription help</option>
                  <option>Wholesale inquiry</option>
                  <option>Press / media</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
