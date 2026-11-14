'use client';

import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="font-serif text-lg font-bold">
                  Cart {totalItems > 0 && `(${totalItems})`}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-secondary rounded-md"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="font-serif text-lg font-semibold mb-1">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Discover our latest roasts and brewing gear.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Shop Coffee <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 border-b border-border pb-4 last:border-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-medium text-sm hover:text-accent transition-colors line-clamp-2"
                          >
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
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.weight} · {item.grind}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-semibold text-sm">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border p-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Checkout <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
