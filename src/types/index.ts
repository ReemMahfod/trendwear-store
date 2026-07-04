export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthSession {
  token: string;
  expiresAt: number;
  user: User;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  details?: ProductDetail[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  inStock: boolean;
}

export interface CartItem {
  cartKey: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'tops', label: 'Tops' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
