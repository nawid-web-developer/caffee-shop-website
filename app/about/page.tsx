import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { Leaf, Flame, Globe2, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'Our story, our philosophy, and our commitment to exceptional coffee.',
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative h-[50vh] min-h-[340px] w-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1556665/pexels-photo-1556665.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1600"
            alt="Coffee farm"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/55 to-transparent" />
          <div className="relative h-full container-wide flex items-center">
            <div className="max-w-xl text-cream-foreground">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Our Story</p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Obsessed with
                <br />
                great coffee.
              </h1>
              <p className="text-lg text-cream/85 max-w-md">
                We are a small team of roasters, buyers, and baristas who believe
                coffee is one of the most beautiful products on earth.
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-lg overflow-hidden aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/4927138/pexels-photo-4927138.jpeg?auto=compress&cs=tinysrgb&h=700&w=900"
                alt="Pour over brewing"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">How We Started</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-5">From a garage to a roastery</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Origin Roasters began in 2017 in a Brooklyn garage with a 1kg
                  sample roaster and an obsession with Ethiopian coffees. What
                  started as a hobby became a mission: to source, roast, and share
                  the best coffees in the world with people who care.
                </p>
                <p>
                  Today we operate a full roastery, three cafés, and a wholesale
                  program serving over 80 businesses. We travel to origin every
                  harvest, build direct relationships with farmers, and roast
                  every batch to order.
                </p>
                <p>
                  We are not the biggest coffee company. We do not want to be. We
                  want to be the one that coffee farmers are proud to work with
                  and that you are proud to brew.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream/40 py-16 lg:py-24">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">What We Believe</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold">Our values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Leaf, title: 'Ethically Sourced', desc: 'Direct trade relationships with 42 farms across 11 countries. We visit every harvest.' },
                { icon: Flame, title: 'Roasted to Order', desc: 'Every bag is roasted within 24 hours of shipping. Coffee is a fresh product.' },
                { icon: Globe2, title: 'Full Transparency', desc: 'Farm name, farmer name, and roast date on every bag. Full traceability, always.' },
                { icon: HeartHandshake, title: 'Farmer First', desc: 'We pay above Fair Trade — often 2–3x commodity price. Quality starts at origin.' },
              ].map((value) => (
                <div key={value.title} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-16 lg:py-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { number: '42', label: 'Farms partnered' },
              { number: '11', label: 'Countries sourced' },
              { number: '80+', label: 'Wholesale partners' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-5xl lg:text-6xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16 lg:py-24">
          <div className="container-narrow text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-primary-foreground">
              Taste the difference
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
              Explore our coffees and discover what happens when quality is the
              only metric that matters.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
            >
              Shop All Coffee
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
