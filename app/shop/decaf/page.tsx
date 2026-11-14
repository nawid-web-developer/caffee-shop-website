import { CategoryPage } from '@/components/shop/category-page';

export const metadata = { title: 'Decaf Coffee', description: 'All the flavor, none of the caffeine. Sugarcane and Swiss Water processed.' };

export default function DecafPage() {
  return <CategoryPage category="decaf" />;
}
