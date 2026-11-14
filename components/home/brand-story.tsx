import { Leaf, Flame, Globe2, HeartHandshake } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="rounded-lg overflow-hidden aspect-square">
            <img
              src="https://images.pexels.com/photos/1556665/pexels-photo-1556665.jpeg?auto=compress&cs=tinysrgb&h=800&w=800"
              alt="Coffee farm"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 lg:-right-12 w-40 h-40 lg:w-56 lg:h-56 rounded-lg overflow-hidden border-8 border-background shadow-xl hidden sm:block">
            <img
              src="https://images.pexels.com/photos/4927138/pexels-photo-4927138.jpeg?auto=compress&cs=tinysrgb&h=400&w=400"
              alt="Pour over brewing"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            Our Philosophy
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6">
            From cherry to cup,
            <br />
            with intention.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            We believe coffee is one of the most complex and beautiful products
            on earth. Our job is to honor the work of the farmer, the terroir of
            the land, and the craft of roasting — so that what reaches your cup
            is honest, transparent, and extraordinary.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {[
              { icon: Leaf, title: 'Ethically Sourced', desc: 'Direct trade relationships with 42 farms across 11 countries.' },
              { icon: Flame, title: 'Roasted to Order', desc: 'Every bag is roasted within 24 hours of shipping. No stale coffee.' },
              { icon: Globe2, title: 'Origin Transparent', desc: 'Full traceability from farm to roast date on every bag.' },
              { icon: HeartHandshake, title: 'Farmer First', desc: 'We pay above Fair Trade — often 2–3x commodity price.' },
            ].map((value) => (
              <div key={value.title} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{value.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
