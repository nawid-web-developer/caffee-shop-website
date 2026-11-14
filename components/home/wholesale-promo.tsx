import Link from 'next/link';
import { ArrowRight, Building2, HandshakeIcon, Package } from 'lucide-react';

export function WholesalePromo() {
  return (
    <section className="bg-clay/10 py-20 lg:py-28">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative rounded-lg overflow-hidden aspect-[4/5] lg:aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/17670119/pexels-photo-17670119.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Café wholesale"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Wholesale & Partnerships
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Serve our coffee
              <br />
              at your café.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">
              We partner with cafés, restaurants, and offices who care about
              quality. Get wholesale pricing, barista training, equipment
              support, and a coffee program built around your customers.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Package, title: 'Wholesale Pricing', desc: 'Competitive margins on beans and gear' },
                { icon: HandshakeIcon, title: 'Barista Training', desc: 'On-site dialing-in and staff training' },
                { icon: Building2, title: 'Equipment Support', desc: 'Espresso machine and grinder guidance' },
              ].map((feature) => (
                <div key={feature.title}>
                  <feature.icon className="h-5 w-5 text-accent mb-2" />
                  <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
