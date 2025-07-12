/**
 * Product Interface Definitions
 * Defines all types and interfaces for product-related operations
 */

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  categoryId: string;
  categoryName?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  tags?: string[];
  brand?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCreate {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  tags?: string[];
  brand?: string;
}

export interface IProductFilters {
  categoryId?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popularity';
  page?: number;
  limit?: number;
  sizes?: string[];
  colors?: string[];
  brands?: string[];
}

export interface IProductResponse {
  products: IProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductStats {
  totalProducts: number;
  totalCategories: number;
  avgRating: number;
  totalReviews: number;
}