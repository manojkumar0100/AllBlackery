/**
 * Product Related Interfaces
 */

/**
 * Product Size Interface
 */
export interface IProductSize {
  size: string;
  stock: number;
  price?: number; // Optional price variation for different sizes
}

/**
 * Product Color Interface
 */
export interface IProductColor {
  name: string;
  code: string; // Hex color code
  images?: string[]; // Optional images for this color
}

/**
 * Product Review Interface
 */
export interface IProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product Specification Interface
 */
export interface IProductSpecification {
  key: string;
  value: string;
}

/**
 * Product Main Interface
 */
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts
  discount?: number; // Percentage discount
  categoryId: string;
  categoryName?: string; // Populated from category
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  specifications?: IProductSpecification[];
  tags?: string[];
  relatedProducts?: string[]; // Product IDs
  createdAt: string;
  updatedAt: string;
}

/**
 * Product Create/Update Payload
 */
export interface IProductPayload {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  specifications?: IProductSpecification[];
  tags?: string[];
}

/**
 * Product Filter Options
 */
export interface IProductFilters {
  categoryId?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  brand?: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

/**
 * Product Quick View Interface
 */
export interface IProductQuickView {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  stock: number;
}

/**
 * Product Comparison Interface
 */
export interface IProductComparison {
  products: IProduct[];
  comparisonFields: string[];
}

/**
 * Product Search Suggestion
 */
export interface IProductSearchSuggestion {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  url: string;
}