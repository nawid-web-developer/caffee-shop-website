import { CategoryPage } from '@/components/shop/category-page';

export const metadata = { title: 'Instant Coffee & Cold Brew', description: 'Specialty-grade instant and cold brew concentrate. Quality without the brewer.' };

export default function InstantPage() {
  return <CategoryPage category="instant" />;
}
