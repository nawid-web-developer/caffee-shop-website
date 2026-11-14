'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface WishlistContextValue {
  wishlist: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('origin-wishlist');
      if (saved) setWishlist(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('origin-wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist, mounted]);

  const toggle = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const has = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, has, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
