'use client';

import { useState, useMemo, useCallback } from 'react';
import { SlidersHorizontal, X, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product, ProductCategory } from '@/lib/types';
import { ProductCard } from './product-card';

interface ShopBrowserProps {
  products: Product[];
  category?: ProductCategory | 'all';
  title: string;
  description?: string;
  heroImage?: string;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

const sortLabels: Record<SortOption, string> = {
  featured: 'Featured',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
  rating: 'Top Rated',
  newest: 'Newest',
};

export function ShopBrowser({
  products,
  title,
  description,
  heroImage,
}: ShopBrowserProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedRoasts, setSelectedRoasts] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const allRoasts = useMemo(
    () => Array.from(new Set(products.map((p) => p.roastLevel))).sort(),
    [products]
  );
  const allOrigins = useMemo(
    () => Array.from(new Set(products.map((p) => p.country))).sort(),
    [products]
  );

  const toggleRoast = useCallback((roast: string) => {
    setSelectedRoasts((prev) =>
      prev.includes(roast) ? prev.filter((r) => r !== roast) : [...prev, roast]
    );
  }, []);

  const toggleOrigin = useCallback((origin: string) => {
    setSelectedOrigins((prev) =>
      prev.includes(origin) ? prev.filter((o) => o !== origin) : [...prev, origin]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedRoasts([]);
    setSelectedOrigins([]);
    setMaxPrice(100);
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedRoasts.length > 0) {
      result = result.filter((p) => selectedRoasts.includes(p.roastLevel));
    }
    if (selectedOrigins.length > 0) {
      result = result.filter((p) => selectedOrigins.includes(p.country));
    }
    result = result.filter((p) => p.price <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...result].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
      default:
        return [...result].sort(
          (a, b) => Number(b.featured) - Number(a.featured) || Number(b.bestSeller) - Number(a.bestSeller)
        );
    }
  }, [products, selectedRoasts, selectedOrigins, maxPrice, sortBy]);

  const activeFilterCount =
    selectedRoasts.length + selectedOrigins.length + (maxPrice < 100 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Roast Level
        </h3>
        <div className="space-y-2.5">
          {allRoasts.map((roast) => (
            <button
              key={roast}
              onClick={() => toggleRoast(roast)}
              className="flex items-center gap-2.5 w-full text-left group"
            >
              <span
                className={cn(
                  'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                  selectedRoasts.includes(roast)
                    ? 'bg-primary border-primary'
                    : 'border-border group-hover:border-primary'
                )}
              >
                {selectedRoasts.includes(roast) && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </span>
              <span className="text-sm capitalize">{roast.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Origin
        </h3>
        <div className="space-y-2.5 max-h-48 overflow-y-auto">
          {allOrigins.map((origin) => (
            <button
              key={origin}
              onClick={() => toggleOrigin(origin)}
              className="flex items-center gap-2.5 w-full text-left group"
            >
              <span
                className={cn(
                  'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                  selectedOrigins.includes(origin)
                    ? 'bg-primary border-primary'
                    : 'border-border group-hover:border-primary'
                )}
              >
                {selectedOrigins.includes(origin) && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </span>
              <span className="text-sm">{origin}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Max Price: ${maxPrice}
        </h3>
        <input
          type="range"
          min={15}
          max={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-sm text-accent hover:underline"
        >
          Clear all ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {heroImage && (
        <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-espresso/30" />
          <div className="relative h-full container-wide flex items-end pb-10">
            <div className="text-cream-foreground">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-2">{title}</h1>
              {description && (
                <p className="text-cream/80 max-w-xl text-base">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container-wide py-10 lg:py-14">
        {!heroImage && (
          <div className="mb-8">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">{title}</h1>
            {description && (
              <p className="text-muted-foreground text-base max-w-xl">{description}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-accent text-accent-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="text-sm text-muted-foreground hidden lg:block">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>

          <div className="relative ml-auto">
            <button
              onClick={() => setShowSort(!showSort)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            >
              Sort: {sortLabels[sortBy]}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-20 py-1">
                {Object.entries(sortLabels).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => {
                      setSortBy(value as SortOption);
                      setShowSort(false);
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors',
                      sortBy === value && 'text-accent font-medium'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4 lg:hidden">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-serif text-xl font-semibold mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
