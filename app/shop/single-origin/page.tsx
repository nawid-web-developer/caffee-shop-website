import { CategoryPage } from '@/components/shop/category-page';

export const metadata = { title: 'Single Origin Coffee', description: 'Coffees that speak of a single farm, a single place, a single harvest.' };

export default function SingleOriginPage() {
  return <CategoryPage category="single-origin" />;
}
