'use client';

import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  const shipping = subtotal >= 40 ? 0 : 6;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <>
        <div className="container-wide py-20 lg:py-32 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Looks like you have not added anything yet. Explore our coffees and start your collection.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Shop Coffee
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="container-wide py-10 lg:py-16">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Your Cart</h1>
      <p className="text-muted-foreground mb-8">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2 mb-1">
                  <Link href={`/product/${item.product.slug}`} className="font-medium text-sm hover:text-accent transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {item.weight} · {item.grind}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)} each</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear cart
            </button>
            <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              {subtotal < 40 && (
                <p className="text-xs text-accent pt-2">
                  Add {formatPrice(40 - subtotal)} more for free shipping.
                </p>
              )}
            </div>
            <div className="border-t border-border pt-4 mb-5">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-2xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
