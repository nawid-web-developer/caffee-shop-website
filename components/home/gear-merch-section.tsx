import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';

export function GearMerchSection() {
  const gear = products.filter((p) => p.category === 'gear').slice(0, 3);
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            Coffee Gear
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-5">
            Brew better
            <br />
            at home.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
            Pour-over kits, precision grinders, and the kettles our baristas
            use every day. Equipment chosen and tested by our team — the same
            gear we use at the brew bar.
          </p>
          <Link
            href="/shop/gear"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-md font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Shop all gear
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {gear.map((item, i) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className={`group relative rounded-lg overflow-hidden bg-secondary ${
                i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
              }`}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-cream-foreground">
                <p className="text-[10px] uppercase tracking-widest text-cream/70 mb-0.5">
                  {item.country}
                </p>
                <h3 className="font-serif text-sm lg:text-base font-semibold line-clamp-1">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
