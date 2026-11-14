'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductSliderProps {
  products: Product[];
  slidesPerView?: number;
}

export function ProductSlider({ products, slidesPerView = 4 }: ProductSliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (swiper.params.navigation as any).prevEl = prevRef.current;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (swiper.params.navigation as any).nextEl = nextRef.current;
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: slidesPerView, spaceBetween: 24 },
        }}
        className="!pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          ref={prevRef}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          ref={nextRef}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
