import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { SubscriptionsContent } from '@/components/pages/subscriptions-content';

export const metadata = {
  title: 'Subscriptions',
  description: 'Fresh-roasted coffee delivered on your schedule. Skip, pause, or cancel anytime.',
};

export default function SubscriptionsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <SubscriptionsContent />
      </main>
      <SiteFooter />
    </>
  );
}
