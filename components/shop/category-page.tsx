import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { ShopBrowser } from '@/components/shop/shop-browser';
import { products, categories } from '@/lib/data';
import type { ProductCategory } from '@/lib/types';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  category: ProductCategory;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const meta = categories.find((c) => c.slug === category);
  if (!meta) return notFound();

  const filtered = products.filter((p) => p.category === category);

  return (
    <>
      <SiteHeader />
      <main>
        <ShopBrowser
          products={filtered}
          title={meta.name}
          description={meta.description}
          heroImage={meta.image}
        />
      </main>
      <SiteFooter />
    </>
  );
}
