import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { blogPosts } from '@/lib/data';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Journal',
  description: 'Stories, brew guides, and coffee culture from Origin Roasters.',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-wide pt-12 pb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The Journal</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">Stories & brew guides</h1>
          <p className="text-muted-foreground max-w-xl">Coffee culture, brewing technique, origin reports, and the people behind every cup.</p>
        </section>

        <section className="container-wide pb-16">
          <Link href={`/blog/${featured.slug}`} className="group block rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto bg-secondary overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-flex w-fit px-2.5 py-1 bg-secondary text-[10px] font-semibold uppercase tracking-wider rounded mb-4">
                  Featured · {featured.category}
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {featured.readTime} read · {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </Link>
        </section>

        <section className="container-wide pb-16 lg:pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-background/90 backdrop-blur text-[10px] font-semibold uppercase tracking-wider rounded">
                    {post.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-2 mb-2">
                  <Clock className="h-3 w-3" />
                  {post.readTime} read · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <h3 className="font-serif text-lg font-bold leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
