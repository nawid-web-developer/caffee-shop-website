import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
    </>
  );
}

export function SiteFooter() {
  return <Footer />;
}
