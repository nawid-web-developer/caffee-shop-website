'use client';

import { useState, useEffect } from 'react';
import { Truck, Sparkles, Globe } from 'lucide-react';

const messages = [
  { icon: Truck, text: 'Free shipping on orders over $40' },
  { icon: Sparkles, text: 'New harvest Ethiopias just landed — shop Single Origin' },
  { icon: Globe, text: 'Roasted to order, shipped within 24 hours' },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-espresso text-espresso-foreground">
      <div className="container-wide flex h-9 items-center justify-center overflow-hidden">
        <div
          key={index}
          className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase animate-fade-in"
        >
          {messages.map((m, i) => {
            const Icon = m.icon;
            return (
              <span
                key={i}
                className={`flex items-center gap-2 transition-opacity duration-500 ${
                  i === index ? 'opacity-100' : 'hidden'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {m.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
