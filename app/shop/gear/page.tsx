import { CategoryPage } from '@/components/shop/category-page';

export const metadata = { title: 'Coffee Gear', description: 'Brewers, grinders, kettles, and accessories chosen by our baristas.' };

export default function GearPage() {
  return <CategoryPage category="gear" />;
}
