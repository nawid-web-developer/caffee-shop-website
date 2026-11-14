import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCollections } from '@/components/home/featured-collections';
import { NewArrivals, BestSellers } from '@/components/home/product-showcases';
import { SubscriptionPromo } from '@/components/home/subscription-promo';
import { GearMerchSection } from '@/components/home/gear-merch-section';
import { InstantColdBrewSection } from '@/components/home/instant-cold-brew-section';
import { WholesalePromo } from '@/components/home/wholesale-promo';
import { BrandStory } from '@/components/home/brand-story';
import { CafeLocationsSection } from '@/components/home/cafe-locations-section';
import { BlogSection } from '@/components/home/blog-section';
import { NewsletterSection } from '@/components/home/newsletter-section';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <NewArrivals />
        <SubscriptionPromo />
        <BestSellers />
        <GearMerchSection />
        <InstantColdBrewSection />
        <WholesalePromo />
        <BrandStory />
        <CafeLocationsSection />
        <BlogSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
