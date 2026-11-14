'use client';

import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
