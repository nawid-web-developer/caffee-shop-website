'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, getRoastLabel, getRoastBars } from '@/lib/format';

const grindOptions = ['Whole Bean', 'Espresso', 'Pour Over', 'French Press', 'Drip', 'Aeropress'];
const weightOptions = ['250g', '340g', '1kg'];

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [grind, setGrind] = useState('Whole Bean');
  const [weight, setWeight] = useState(product.weight);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('description');

  const isGear = product.category === 'gear';
  const isWishlisted = has(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, grind, weight);
    toast({ title: 'Added to cart', description: `${quantity} × ${product.name}` });
  };

  const handleBuyNow = () => {
    addItem(product, quantity, grind, weight);
    router.push('/checkout');
  };

  const handleWishlist = () => {
    toggle(product.id);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: product.name,
    });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="container-wide py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg overflow-hidden bg-secondary aspect-square mb-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'w-20 h-20 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0',
                  selectedImage === i ? 'border-accent' : 'border-border'
                )}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {!isGear && (
            <p className="text-xs uppercase tracking-widest text-accent mb-3">
              {product.country} · {product.region}
            </p>
          )}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < Math.round(product.rating) ? 'text-accent' : 'text-border'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-serif text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm text-muted-foreground">/ {product.weight}</span>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-8">
            {product.description}
          </p>

          {!isGear && product.tastingNotes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Tasting Notes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note.label}
                    className="px-3 py-1.5 bg-cream/60 border border-border rounded-full text-sm font-medium"
                  >
                    {note.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!isGear && (
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-cream/30 rounded-lg">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Roast Level</p>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1.5 w-6 rounded-full',
                        i < getRoastBars(product.roastLevel) ? 'bg-accent' : 'bg-border'
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">{getRoastLabel(product.roastLevel)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Processing</p>
                <p className="text-sm font-medium">{product.processingMethod}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Altitude</p>
                <p className="text-sm font-medium">{product.altitude}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Varietal</p>
                <p className="text-sm font-medium">{product.varietal}</p>
              </div>
            </div>
          )}

          {!isGear && (
            <>
              <div className="mb-5">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Grind
                </label>
                <div className="flex flex-wrap gap-2">
                  {grindOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setGrind(option)}
                      className={cn(
                        'px-3 py-2 border rounded-md text-sm transition-colors',
                        grind === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:bg-secondary'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Weight
                </label>
                <div className="flex gap-2">
                  {weightOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setWeight(option)}
                      className={cn(
                        'px-4 py-2 border rounded-md text-sm transition-colors',
                        weight === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:bg-secondary'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mb-6">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
              Quantity
            </label>
            <div className="flex items-center border border-border rounded-md w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2.5 hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-4 py-2.5 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2.5 hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Add to Cart — {formatPrice(product.price * quantity)}
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3.5 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlist}
              className="px-4 py-3.5 border border-border rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle wishlist"
            >
              <span className={isWishlisted ? 'text-destructive' : ''}>♥</span>
            </button>
          </div>

          <div className="border-t border-border pt-6 mt-8 space-y-1">
            {[
              { id: 'description', label: 'Description', content: product.story },
              ...(product.brewMethods.length > 0 ? [{ id: 'brew', label: 'Recommended Brew Methods', content: product.brewMethods.join(' · ') }] : []),
              ...(product.farmer ? [{ id: 'farmer', label: 'Farmer & Farm', content: `${product.farmer} — ${product.farm}` }] : []),
            ].map((section) => (
              <div key={section.id} className="border-b border-border">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="font-medium text-sm">{section.label}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      openSection === section.id && 'rotate-180'
                    )}
                  />
                </button>
                {openSection === section.id && (
                  <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
