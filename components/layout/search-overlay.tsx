'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/format';

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const popularSearches = ['Ethiopia', 'Espresso', 'Decaf', 'Pour Over', 'Subscription'];

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.tastingNotes.some((t) => t.label.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="container-wide pt-8">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-lg font-bold">Search</span>
              <button
                onClick={() => {
                  onOpenChange(false);
                  setQuery('');
                }}
                aria-label="Close search"
                className="p-2 hover:bg-secondary rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search coffees, origins, tasting notes…"
                className="w-full border-b-2 border-border bg-transparent py-4 pl-10 pr-4 text-lg lg:text-2xl font-serif focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {query.trim() === '' ? (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" /> Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      onOpenChange(false);
                      setQuery('');
                    }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-14 w-14 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm group-hover:text-accent transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.country} · {product.weight}
                      </p>
                    </div>
                    <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
                  </Link>
                ))}
                {results.length === 0 && (
                  <p className="text-muted-foreground py-8 text-center">
                    No results for &ldquo;{query}&rdquo;. Try another search.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
