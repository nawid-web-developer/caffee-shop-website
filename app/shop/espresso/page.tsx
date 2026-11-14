import { CategoryPage } from '@/components/shop/category-page';

export const metadata = { title: 'Espresso Coffee', description: 'Roasted for pressure — syrupy body, rich crema, and notes that cut through milk.' };

export default function EspressoPage() {
  return <CategoryPage category="espresso" />;
}
