import { products } from '@/lib/data';
import { ProductSlider } from '@/components/shop/product-slider';
import { SectionHeading } from '@/components/shared/section-heading';

export function NewArrivals() {
  const newProducts = products.filter((p) => p.newArrival);
  return (
    <section className="bg-cream/40 py-20 lg:py-28">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Just Landed"
          title="New arrivals"
          description="The latest micro-lots and seasonal harvests, freshly roasted."
          link={{ label: 'View all', href: '/shop?filter=new' }}
        />
        <ProductSlider products={newProducts} />
      </div>
    </section>
  );
}

export function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller);
  return (
    <section className="container-wide py-20 lg:py-28">
      <SectionHeading
        eyebrow="Loved by Many"
        title="Best sellers"
        description="Our most popular roasts — the ones people come back for, week after week."
        link={{ label: 'View all', href: '/shop?filter=best' }}
      />
      <ProductSlider products={bestSellers} />
    </section>
  );
}
