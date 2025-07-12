/**
 * Wishlist Interface Definitions
 * Defines all types and interfaces for wishlist operations
 */

export interface IWishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes: string[];
  colors: string[];
  addedAt: string;
}

export interface IWishlist {
  id: string;
  userId: string;
  items: IWishlistItem[];
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAddToWishlistInput {
  productId: string;
}

export interface IWishlistResponse {
  success: boolean;
  message: string;
  data?: IWishlist;
}

export interface IWishlistRecommendation {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
  category: string;
}