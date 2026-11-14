import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { ContactContent } from '@/components/pages/contact-content';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Origin Roasters. We are here to help with orders, subscriptions, and wholesale.',
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main><ContactContent /></main>
      <SiteFooter />
    </>
  );
}
