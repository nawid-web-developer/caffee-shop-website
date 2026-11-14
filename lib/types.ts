export type ProductCategory =
  | 'single-origin'
  | 'blends'
  | 'espresso'
  | 'decaf'
  | 'instant'
  | 'gear';

export type RoastLevel = 'light' | 'light-medium' | 'medium' | 'medium-dark' | 'dark';

export type ProcessingMethod = 'Washed' | 'Natural' | 'Honey' | 'Anaerobic' | 'Wet-hulled' | 'Swiss Water' | 'Sugarcane EA' | 'Freeze-dried' | 'Washed & Natural' | 'Natural & Washed';

export interface TastingNote {
  label: string;
  category: 'sweet' | 'fruit' | 'floral' | 'nutty' | 'chocolate' | 'spice' | 'other';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  origin: string;
  country: string;
  region: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  weight: string;
  roastLevel: RoastLevel;
  processingMethod: ProcessingMethod;
  altitude: string;
  varietal: string;
  harvest: string;
  tastingNotes: TastingNote[];
  flavorProfile: {
    acidity: number;
    body: number;
    sweetness: number;
    clarity: number;
  };
  description: string;
  story: string;
  brewMethods: string[];
  images: string[];
  bestSeller: boolean;
  newArrival: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
  farmer?: string;
  farm?: string;
}

export interface Category {
  slug: ProductCategory | 'all';
  name: string;
  description: string;
  image: string;
  count: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface CafeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  image: string;
  description: string;
  services: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  frequency: string;
  price: number;
  bagsPerDelivery: number;
  description: string;
  features: string[];
  popular: boolean;
  savings: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grind: string;
  weight: string;
}
