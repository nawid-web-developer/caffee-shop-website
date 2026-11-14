'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { navLinks } from '@/lib/data';
import { CartDrawer } from '@/components/shop/cart-drawer';
import { SearchOverlay } from '@/components/layout/search-overlay';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-background'
        )}
        onMouseLeave={() => setMegaOpen(null)}
      >
        <nav className="container-wide flex h-16 items-center justify-between lg:h-20">
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              className="lg:hidden p-1.5 -ml-1.5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="flex-shrink-0">
              <span className="font-serif text-xl lg:text-2xl font-bold tracking-tight">
                Origin<span className="text-accent">.</span>
              </span>
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li
                key={link.label}
                onMouseEnter={() => setMegaOpen(link.mega ? link.label : null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors hover:text-accent relative py-2',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-accent'
                      : 'text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-secondary rounded-md transition-colors"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:bg-secondary rounded-md transition-colors relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                  {wishCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="p-2 hover:bg-secondary rounded-md transition-colors relative"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg hidden lg:block"
              onMouseEnter={() => setMegaOpen(megaOpen)}
            >
              <div className="container-wide py-8">
                <div className="grid grid-cols-4 gap-8">
                  {navLinks
                    .find((l) => l.label === megaOpen)
                    ?.sections?.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="text-sm text-foreground hover:text-accent transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  <div className="relative rounded-lg overflow-hidden h-44 group">
                    <img
                      src="https://images.pexels.com/photos/4927138/pexels-photo-4927138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      alt="Featured brew"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <p className="text-xs uppercase tracking-widest text-cream/80 mb-1">
                        Featured
                      </p>
                      <Link
                        href="/shop/single-origin"
                        className="text-sm font-semibold text-cream-foreground hover:text-accent transition-colors"
                      >
                        New Harvest Ethiopias →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-background shadow-xl lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-serif text-lg font-bold">
                Origin<span className="text-accent">.</span>
              </span>
              <button onClick={onClose} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-5">
              {navLinks.map((link) => (
                <div key={link.label} className="mb-1">
                  <Link
                    href={link.href}
                    className="block py-3 text-base font-medium hover:text-accent transition-colors"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                  {link.mega && link.sections && (
                    <div className="ml-4 mb-2 border-l border-border pl-3">
                      {link.sections.map((section) =>
                        section.links.map((sl) => (
                          <Link
                            key={sl.label}
                            href={sl.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                            onClick={onClose}
                          >
                            {sl.label}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="block py-3 text-base font-medium hover:text-accent transition-colors"
                onClick={onClose}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
