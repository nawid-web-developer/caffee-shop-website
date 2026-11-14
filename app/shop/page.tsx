import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { ShopBrowser } from '@/components/shop/shop-browser';
import { products } from '@/lib/data';

export const metadata = {
  title: 'Shop All Coffee',
  description: 'Browse our complete collection of specialty coffee — single origins, blends, espresso, decaf, and more.',
};

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ShopBrowser
          products={products}
          title="Shop All Coffee"
          description="Every roast we craft, from single origins to signature blends. Roasted to order, shipped fresh."
          heroImage="https://images.pexels.com/photos/9899790/pexels-photo-9899790.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
        />
      </main>
      <SiteFooter />
    </>
  );
}
