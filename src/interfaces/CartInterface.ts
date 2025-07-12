/**
 * Cart Interface Definitions
 * Defines all types and interfaces for shopping cart operations
 */

export interface ICartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  size?: string;
  color?: string;
  maxStock: number;
  subtotal: number;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAddToCartInput {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface IUpdateCartItemInput {
  cartItemId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ICartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface ICartResponse {
  success: boolean;
  message: string;
  data?: ICart;
}

export interface ICartRecommendation {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
}