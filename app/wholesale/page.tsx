import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { WholesaleContent } from '@/components/pages/wholesale-content';

export const metadata = {
  title: 'Wholesale',
  description: 'Partner with Origin Roasters for wholesale beans, equipment, and barista training.',
};

export default function WholesalePage() {
  return (
    <>
      <SiteHeader />
      <main><WholesaleContent /></main>
      <SiteFooter />
    </>
  );
}
