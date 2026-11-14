import { SiteHeader, SiteFooter } from '@/components/layout/site-chrome';
import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main>
        <article>
          <div className="relative h-[45vh] min-h-[300px] w-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-espresso/20" />
            <div className="relative h-full container-wide flex items-end pb-10">
              <div className="text-cream-foreground max-w-3xl">
                <span className="inline-flex w-fit px-2.5 py-1 bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wider rounded mb-4">
                  {post.category}
                </span>
                <h1 className="font-serif text-3xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
                <p className="text-cream/80 flex items-center gap-3 text-sm">
                  <span>By {post.author}</span>
                  <span>·</span>
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime} read</span>
                  <span>·</span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="container-narrow py-16">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-foreground/80 leading-relaxed mb-6 font-light">{post.excerpt}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{post.content}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We hope this gives you a deeper appreciation for what goes into
                every cup. Coffee is a craft, and like any craft, the more you
                understand it, the more you enjoy it. Experiment, adjust, and
                most importantly, taste.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about your brew setup? Reach out to us at any time
                — we love talking coffee. And if you want to put these ideas into
                practice, explore our latest roasts.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-serif text-lg font-bold text-accent flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-cream/40 py-16">
          <div className="container-wide">
            <h2 className="font-serif text-2xl font-bold mb-6">More from the journal</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((rpost) => (
                <Link key={rpost.id} href={`/blog/${rpost.slug}`} className="group flex gap-4 bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img src={rpost.image} alt={rpost.title} className="w-28 h-28 rounded-md object-cover flex-shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{rpost.category}</span>
                    <h3 className="font-serif text-base font-bold leading-snug mt-1 group-hover:text-accent transition-colors line-clamp-2">{rpost.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{rpost.readTime} read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
