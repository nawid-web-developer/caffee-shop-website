import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { featuredCollections } from '@/lib/data';
import { SectionHeading } from '@/components/shared/section-heading';

export function FeaturedCollections() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <SectionHeading
        eyebrow="Explore"
        title="Find your coffee"
        description="From bright single origins to balanced daily blends — every roast is crafted with intention."
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {featuredCollections.map((collection, i) => (
          <Link
            key={collection.title}
            href={collection.href}
            className="group relative rounded-lg overflow-hidden aspect-[3/4] bg-secondary"
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-cream-foreground">
              <p className="text-[10px] uppercase tracking-widest text-cream/70 mb-1">
                {collection.subtitle}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-xl lg:text-2xl font-bold leading-tight">
                    {collection.title}
                  </h3>
                  <p className="text-xs text-cream/70 mt-1 hidden lg:block">
                    {collection.description}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-shrink-0 mb-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
