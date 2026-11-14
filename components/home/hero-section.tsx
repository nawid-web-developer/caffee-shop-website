'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/26711777/pexels-photo-26711777.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800"
          alt="Barista pouring coffee"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
      </div>

      <div className="relative h-full container-wide flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl text-cream-foreground"
        >
          <div className="flex items-center gap-2 mb-6">
            <Coffee className="h-4 w-4 text-accent" />
            <span className="text-xs uppercase tracking-widest text-cream/80">
              Roasted to order · Shipped within 24 hours
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance mb-6">
            Coffee worth
            <br />
            slowing down for.
          </h1>
          <p className="text-lg text-cream/85 leading-relaxed mb-8 max-w-md">
            Small-batch specialty coffee from the world&rsquo;s best farms.
            Roasted to order, delivered fresh — because great coffee is a fresh
            product.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
            >
              Shop All Coffee
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/subscriptions"
              className="inline-flex items-center justify-center px-8 py-4 border border-cream/30 text-cream-foreground rounded-md font-medium hover:bg-cream/10 transition-colors backdrop-blur-sm"
            >
              Start a Subscription
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-cream/10 bg-espresso/40 backdrop-blur-sm">
        <div className="container-wide py-4 grid grid-cols-3 gap-4 text-cream-foreground">
          {[
            { label: 'Farms partnered', value: '42' },
            { label: 'Roasts per week', value: '3' },
            { label: 'Cups scored monthly', value: '1,200+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-serif text-xl sm:text-2xl font-bold">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-wide text-cream/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
