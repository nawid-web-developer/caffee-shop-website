import Link from 'next/link';
import { ArrowRight, Clock, Droplets, Zap } from 'lucide-react';

export function InstantColdBrewSection() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/shop/instant"
          className="group relative rounded-lg overflow-hidden aspect-[5/6] md:aspect-[4/3] bg-secondary"
        >
          <img
            src="https://images.pexels.com/photos/4787613/pexels-photo-4787613.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Specialty instant coffee"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-cream-foreground">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-[11px] uppercase tracking-widest text-cream/70">Just add water</span>
            </div>
            <h3 className="font-serif text-3xl font-bold mb-2">Specialty Instant</h3>
            <p className="text-sm text-cream/80 mb-4 max-w-xs">
              Freeze-dried specialty coffee in single-serve sachets. The best cup
              you can make anywhere — no brewer required.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              Shop Instant <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        <Link
          href="/cold-brew"
          className="group relative rounded-lg overflow-hidden aspect-[5/6] md:aspect-[4/3] bg-secondary"
        >
          <img
            src="https://images.pexels.com/photos/5741238/pexels-photo-5741238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Cold brew coffee"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-cream-foreground">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="h-4 w-4 text-accent" />
              <span className="text-[11px] uppercase tracking-widest text-cream/70">Steeped 18 hours</span>
            </div>
            <h3 className="font-serif text-3xl font-bold mb-2">Cold Brew</h3>
            <p className="text-sm text-cream/80 mb-4 max-w-xs">
              Smooth, low-acid cold brew concentrate and ready-to-drink bottles.
              Chocolatey, refreshing, and seriously good.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              Shop Cold Brew <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
