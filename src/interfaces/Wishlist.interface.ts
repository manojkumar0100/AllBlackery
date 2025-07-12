/**
 * Wishlist Related Interfaces
 */

/**
 * Wishlist Item Interface
 */
export interface IWishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  isInStock: boolean;
  sizes: string[];
  colors: string[];
  addedAt: string;
}

/**
 * Wishlist Interface
 */
export interface IWishlist {
  id: string;
  userId: string;
  items: IWishlistItem[];
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Add to Wishlist Request
 */
export interface IAddToWishlistRequest {
  productId: string;
}

/**
 * Wishlist Collection Interface (for multiple wishlists)
 */
export interface IWishlistCollection {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  isPublic: boolean;
  items: IWishlistItem[];
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Wishlist Collection Request
 */
export interface ICreateWishlistRequest {
  name: string;
  description?: string;
  isPublic?: boolean;
}

/**
 * Move Wishlist Item Request
 */
export interface IMoveWishlistItemRequest {
  itemId: string;
  fromWishlistId: string;
  toWishlistId: string;
}

/**
 * Wishlist Share Interface
 */
export interface IWishlistShare {
  id: string;
  wishlistId: string;
  shareToken: string;
  shareUrl: string;
  expiresAt?: string;
  viewCount: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * Wishlist Analytics Interface
 */
export interface IWishlistAnalytics {
  totalItems: number;
  totalValue: number;
  averagePrice: number;
  mostWishedCategory: string;
  priceDropAlerts: number;
  backInStockAlerts: number;
}

/**
 * Wishlist Notification Settings
 */
export interface IWishlistNotificationSettings {
  priceDropAlerts: boolean;
  backInStockAlerts: boolean;
  saleAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}