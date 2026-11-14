import { CategoryPage } from '@/components/shop/category-page';

export const metadata = { title: 'Coffee Blends', description: 'Carefully composed coffees built for balance, sweetness, and daily ritual.' };

export default function BlendsPage() {
  return <CategoryPage category="blends" />;
}
