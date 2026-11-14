import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { cafeLocations } from '@/lib/data';

export function CafeLocationsSection() {
  return (
    <section className="bg-cream/40 py-20 lg:py-28">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Visit Us
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight">
              Find a café near you
            </h2>
            <p className="mt-3 text-muted-foreground">
              Order ahead and skip the line — espresso, pour-over flights, and
              fresh beans at all locations.
            </p>
          </div>
          <Link
            href="/locations"
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent transition-colors group whitespace-nowrap"
          >
            All locations
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cafeLocations.map((cafe) => (
            <Link
              key={cafe.id}
              href="/locations"
              className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-serif text-lg font-bold group-hover:text-accent transition-colors">
                  {cafe.name}
                </h3>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  {cafe.address}, {cafe.city}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  {cafe.hours}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cafe.services.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="px-2 py-0.5 bg-secondary text-[10px] font-medium uppercase tracking-wide rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
