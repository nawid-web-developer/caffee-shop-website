import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { subscriptionPlans } from '@/lib/data';
import { formatPrice } from '@/lib/format';

export function SubscriptionPromo() {
  return (
    <section className="bg-espresso text-espresso-foreground py-20 lg:py-28">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Subscriptions
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-5 text-cream-foreground">
              Never run out.
              <br />
              Always fresh.
            </h2>
            <p className="text-cream/80 text-base leading-relaxed mb-8 max-w-md">
              Choose your coffees, choose your frequency. We roast to order and
              ship the same day, so every delivery arrives at peak freshness. Skip,
              pause, or cancel anytime — no commitment.
            </p>
            <Link
              href="/subscriptions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
            >
              Build your subscription
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-espresso-foreground/5 border border-cream/10 rounded-lg p-5 backdrop-blur-sm flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-semibold text-cream-foreground">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wide rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-cream/70 mb-2">{plan.description}</p>
                  <p className="text-xs text-cream/50">{plan.frequency}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-serif text-2xl font-bold text-cream-foreground">
                    {formatPrice(plan.price)}
                  </p>
                  <p className="text-xs text-accent">{plan.savings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
