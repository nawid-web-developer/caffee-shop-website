'use client';

import Link from 'next/link';
import { Heart, Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { formatPrice, getRoastBars } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { toast } = useToast();
  const isWishlisted = has(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: 'Added to cart',
      description: product.name,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: product.name,
    });
  };

  const isGear = product.category === 'gear';
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        'group block relative bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestSeller && (
            <span className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider rounded">
              Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="px-2.5 py-1 bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wider rounded">
              New
            </span>
          )}
          {onSale && (
            <span className="px-2.5 py-1 bg-destructive text-destructive-foreground text-[10px] font-semibold uppercase tracking-wider rounded">
              Sale
            </span>
          )}
        </div>
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-all',
              isWishlisted ? 'fill-destructive text-destructive' : 'text-foreground'
            )}
          />
        </button>
        {!isGear && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-2 bg-background/95 backdrop-blur rounded-md text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Quick Add
          </button>
        )}
      </div>

      <div className="p-4 space-y-2">
        {!isGear && (
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {product.country} · {product.processingMethod}
          </p>
        )}
        <h3 className="font-serif text-base font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        {!isGear && product.tastingNotes.length > 0 && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.tastingNotes.map((t) => t.label).join(' · ')}
          </p>
        )}
        {!isGear && (
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 w-4 rounded-full',
                    i < getRoastBars(product.roastLevel)
                      ? 'bg-accent'
                      : 'bg-secondary'
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {product.roastLevel.replace('-', ' ')}
            </span>
          </div>
        )}
        {isGear && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span>{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{product.weight}</span>
        </div>
      </div>
    </Link>
  );
}
