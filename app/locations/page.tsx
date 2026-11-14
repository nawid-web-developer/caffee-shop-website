import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { cafeLocations } from '@/lib/data';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export const metadata = {
  title: 'Café Locations',
  description: 'Find an Origin Roasters café near you. Order ahead and skip the line.',
};

export default function LocationsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/26799265/pexels-photo-26799265.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
            alt="Café interior"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/45 to-espresso/25" />
          <div className="relative h-full container-wide flex items-end pb-10">
            <div className="text-cream-foreground">
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Our Cafés</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-2">Visit us</h1>
              <p className="text-cream/80 max-w-lg">Three locations and counting. Order ahead, grab a seat, or take a roastery tour.</p>
            </div>
          </div>
        </section>

        <section className="container-wide py-16 lg:py-24">
          <div className="space-y-6">
            {cafeLocations.map((cafe) => (
              <div key={cafe.id} className="grid md:grid-cols-2 gap-6 bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] md:aspect-auto bg-secondary overflow-hidden">
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <h2 className="font-serif text-2xl font-bold mb-3">{cafe.name}</h2>
                  <p className="text-sm text-muted-foreground mb-5">{cafe.description}</p>
                  <div className="space-y-2.5 mb-5">
                    <p className="text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{cafe.address}, {cafe.city}</span>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                      {cafe.hours}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                      {cafe.phone}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cafe.services.map((service) => (
                      <span key={service} className="px-2.5 py-1 bg-secondary text-[11px] font-medium uppercase tracking-wide rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(cafe.address + ' ' + cafe.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors w-fit"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
