import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { ProductDetails } from '@/components/shop/product-details';
import { ProductSlider } from '@/components/shop/product-slider';
import { SectionHeading } from '@/components/shared/section-heading';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 5);
  const fallbackRelated = products
    .filter((p) => p.id !== product.id)
    .slice(0, 5);
  const relatedProducts = related.length >= 2 ? related : fallbackRelated;

  return (
    <>
      <SiteHeader />
      <main>
        <ProductDetails product={product} />
        <div className="container-wide py-16 lg:py-24 border-t border-border">
          <SectionHeading eyebrow="You might also like" title="Related coffees" />
          <ProductSlider products={relatedProducts} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
