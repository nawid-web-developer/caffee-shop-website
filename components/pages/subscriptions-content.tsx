'use client';

import { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { subscriptionPlans } from '@/lib/data';
import { formatPrice } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function SubscriptionsContent() {
  const [selectedPlan, setSelectedPlan] = useState('s2');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubscribe = () => {
    const plan = subscriptionPlans.find((p) => p.id === selectedPlan);
    toast({
      title: 'Subscription started!',
      description: `${plan?.name} — ${plan?.frequency}`,
    });
    router.push('/cart');
  };

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/26711777/pexels-photo-26711777.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
          alt="Coffee subscription"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/50 to-transparent" />
        <div className="relative h-full container-wide flex items-center">
          <div className="max-w-xl text-cream-foreground">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Subscriptions</p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Coffee that
              <br />
              comes to you.
            </h1>
            <p className="text-lg text-cream/80 max-w-md">
              Fresh-roasted coffee delivered on your schedule. Skip, pause, or
              cancel anytime. Save up to 20% on every bag.
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {subscriptionPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-lg border-2 p-8 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-accent bg-accent/5 shadow-lg'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wider rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </span>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.frequency}</p>
                </div>
                {selectedPlan === plan.id && (
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-accent-foreground" />
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="font-serif text-4xl font-bold">{formatPrice(plan.price)}</span>
                <span className="text-sm text-muted-foreground"> / delivery</span>
              </div>
              <p className="text-sm font-medium text-accent mb-4">{plan.savings}</p>
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubscribe}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Start Subscription
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-xs text-muted-foreground mt-4">
            No commitment. Skip or cancel anytime.
          </p>
        </div>
      </section>

      <section className="bg-cream/40 py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🔥', title: 'Roasted to Order', desc: 'Roasted within 24 hours of shipping' },
              { icon: '⏭️', title: 'Total Flexibility', desc: 'Skip, pause, or cancel anytime' },
              { icon: '💰', title: 'Save up to 20%', desc: 'Member pricing on every bag' },
              { icon: '🚚', title: 'Free Shipping', desc: 'Always free on subscription orders' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-serif text-lg font-bold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
