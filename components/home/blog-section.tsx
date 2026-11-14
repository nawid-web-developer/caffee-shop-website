import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export function BlogSection() {
  const posts = blogPosts.slice(0, 3);
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            The Journal
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight">
            Stories, brew guides, and coffee culture
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent transition-colors group whitespace-nowrap"
        >
          Read the journal
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
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
  );
}
