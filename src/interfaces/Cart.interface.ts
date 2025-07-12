/**
 * Shopping Cart Related Interfaces
 */

/**
 * Cart Item Interface
 */
export interface ICartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size?: string;
  color?: string;
  maxQuantity: number; // Available stock
  totalPrice: number;
  discount?: number;
  addedAt: string;
}

/**
 * Cart Summary Interface
 */
export interface ICartSummary {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  savings: number;
  itemCount: number;
}

/**
 * Cart Interface
 */
export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  summary: ICartSummary;
  createdAt: string;
  updatedAt: string;
}

/**
 * Add to Cart Request
 */
export interface IAddToCartRequest {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

/**
 * Update Cart Item Request
 */
export interface IUpdateCartItemRequest {
  itemId: string;
  quantity: number;
  size?: string;
  color?: string;
}

/**
 * Cart Coupon Interface
 */
export interface ICartCoupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  isApplied: boolean;
  discountAmount: number;
}

/**
 * Cart Shipping Option
 */
export interface ICartShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  isSelected: boolean;
}

/**
 * Cart Validation Result
 */
export interface ICartValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  outOfStockItems: string[];
  priceChangedItems: string[];
}

/**
 * Cart Persistence Data
 */
export interface ICartPersistence {
  guestId?: string;
  items: ICartItem[];
  lastSaved: string;
}