'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, subtotal, clearCart, totalItems } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'United States',
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  });

  const shipping = subtotal >= 40 ? 0 : 6;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('complete');
    toast({ title: 'Order placed!', description: 'A confirmation has been sent to your email.' });
    setTimeout(() => clearCart(), 500);
  };

  if (items.length === 0 && step !== 'complete') {
    return (
      <div className="container-wide py-20 lg:py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some coffee before checking out.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
          Shop Coffee <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="container-narrow py-20 lg:py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-accent" />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-3">Order confirmed!</h1>
        <p className="text-muted-foreground mb-2 max-w-md mx-auto">
          Thank you for your order. We will roast your coffee to order and ship it within 24 hours.
        </p>
        <p className="text-sm text-muted-foreground mb-8">A confirmation email is on its way to {form.email || 'your inbox'}.</p>
        <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono font-medium">#OR-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">{formatPrice(total)}</span>
          </div>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-wide py-10 lg:py-16">
      <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-8">Checkout</h1>

      <div className="flex items-center gap-2 mb-10 text-sm">
        <span className={step === 'info' ? 'font-semibold text-accent' : 'text-muted-foreground'}>1. Shipping</span>
        <span className="text-border">—</span>
        <span className={step === 'payment' ? 'font-semibold text-accent' : 'text-muted-foreground'}>2. Payment</span>
        <span className="text-border">—</span>
        <span className="text-muted-foreground">3. Confirmation</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <h2 className="font-serif text-xl font-bold mb-4">Shipping Information</h2>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="you@email.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">First Name</label>
                  <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="First name" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Last Name</label>
                  <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="Last name" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Address</label>
                <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="Street address" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">City</label>
                  <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="City" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">ZIP</label>
                  <input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="ZIP code" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Country</label>
                  <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                Continue to Payment <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              <h2 className="font-serif text-xl font-bold mb-4">Payment Details</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-4 py-3 rounded-md mb-4">
                <Lock className="h-4 w-4 text-accent" />
                Your payment is secure and encrypted. This is a demo — no real charge will be made.
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Name on Card</label>
                <input required value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="Full name" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Card Number</label>
                <input required value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                  className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Expiry</label>
                  <input required value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="MM / YY" maxLength={7} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">CVC</label>
                  <input required value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                    className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="123" maxLength={4} />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('info')}
                  className="px-6 py-3.5 border border-border rounded-md font-medium hover:bg-secondary transition-colors">
                  Back
                </button>
                <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors">
                  <Lock className="h-4 w-4" />
                  Place Order — {formatPrice(total)}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-28">
            <h2 className="font-serif text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 rounded-md object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{item.weight} · {item.grind}</p>
                  </div>
                  <span className="text-xs font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-serif text-xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
