import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { ProductCard } from '@/components/shop/product-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { products } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Droplets, Clock, Thermometer } from 'lucide-react';

export const metadata = {
  title: 'Cold Brew',
  description: 'Smooth, low-acid cold brew concentrate and ready-to-drink bottles.',
};

export default function ColdBrewPage() {
  const coldBrewProducts = products.filter((p) => p.id === 'p13');
  const instantProducts = products.filter((p) => p.category === 'instant');

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/5741238/pexels-photo-5741238.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1600"
            alt="Cold brew coffee"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/55 to-transparent" />
          <div className="relative h-full container-wide flex items-center">
            <div className="max-w-xl text-cream-foreground">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Cold Brew</p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Slow steeped.
                <br />
                Deeply smooth.
              </h1>
              <p className="text-lg text-cream/85 max-w-md">
                Steeped for 18 hours in cold filtered water. No heat, no
                bitterness — just pure, chocolatey, refreshing cold brew.
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide py-16 lg:py-24">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Droplets, title: '18-Hour Steep', desc: 'Coarse-ground coffee steeped in cold water for 18 hours to extract sweetness without bitterness.' },
              { icon: Clock, title: 'Ready to Pour', desc: 'Our concentrate is pre-steeped and bottled. Just dilute 1:1 with water or milk and enjoy.' },
              { icon: Thermometer, title: 'Low Acidity', desc: 'Cold extraction naturally produces a smoother, lower-acid cup that is gentle on the stomach.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>

          <SectionHeading
            eyebrow="Shop Cold Brew"
            title="Cold brew & instant"
            description="Concentrates, ready-to-drink bottles, and specialty instant — quality without the brewer."
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {instantProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 bg-cream/40 rounded-lg p-8 lg:p-12 text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-3">
              Cold brew on subscription
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Never run out of your favorite cold brew. Subscribe and save 15%
              on every delivery.
            </p>
            <Link
              href="/subscriptions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Start a Subscription
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
