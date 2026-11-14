import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { label: string; href: string };
  center?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  center,
}: SectionHeadingProps) {
  return (
    <div
      className={
        center
          ? 'text-center max-w-2xl mx-auto mb-12'
          : 'flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10'
      }
    >
      <div className={center ? '' : 'max-w-2xl'}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-muted-foreground text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {link && !center && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent transition-colors whitespace-nowrap group"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
