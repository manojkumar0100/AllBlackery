/**
 * Cart API Services
 * Handles all shopping cart-related API calls with fake backend
 */

import axios from 'axios';
import { 
  ICart, 
  IAddToCartInput, 
  IUpdateCartItemInput, 
  ICartResponse,
  ICartSummary,
  ICartRecommendation,
  ICartItem
} from '../interfaces/CartInterface';
import { IAPIResponse } from '../interfaces/AuthInterface';

// Mock API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const cartApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
cartApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Cart Service with Mock Data
 */
class CartService {
  private mockCartData: ICart = {
    id: '1',
    userId: '1',
    items: [],
    totalAmount: 0,
    totalItems: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  /**
   * Get user's cart
   * @returns Promise<IAPIResponse<ICart>>
   */
  async getCart(): Promise<IAPIResponse<ICart>> {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get cart from localStorage or use mock data
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.mockCartData = JSON.parse(savedCart);
      }

      return {
        success: true,
        message: 'Cart retrieved successfully',
        data: this.mockCartData,
      };
    } catch (error) {
      throw new Error('Failed to fetch cart');
    }
  }

  /**
   * Add item to cart
   * @param item - Item to add
   * @returns Promise<IAPIResponse<ICart>>
   */
  async addToCart(item: IAddToCartInput): Promise<IAPIResponse<ICart>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock product data for cart item
      const mockCartItem: ICartItem = {
        id: `cart-item-${Date.now()}`,
        productId: item.productId,
        productName: 'Premium Black Leather Jacket', // Mock data
        productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
        productPrice: 299.99,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        maxStock: 25,
        subtotal: 299.99 * item.quantity,
      };

      // Check if item already exists
      const existingItemIndex = this.mockCartData.items.findIndex(
        cartItem => cartItem.productId === item.productId && 
                   cartItem.size === item.size && 
                   cartItem.color === item.color
      );

      if (existingItemIndex !== -1) {
        // Update quantity
        this.mockCartData.items[existingItemIndex].quantity += item.quantity;
        this.mockCartData.items[existingItemIndex].subtotal = 
          this.mockCartData.items[existingItemIndex].productPrice * 
          this.mockCartData.items[existingItemIndex].quantity;
      } else {
        // Add new item
        this.mockCartData.items.push(mockCartItem);
      }

      // Recalculate totals
      this.recalculateCart();
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(this.mockCartData));

      return {
        success: true,
        message: 'Item added to cart successfully',
        data: this.mockCartData,
      };
    } catch (error) {
      throw new Error('Failed to add item to cart');
    }
  }

  /**
   * Update cart item
   * @param item - Item to update
   * @returns Promise<IAPIResponse<ICart>>
   */
  async updateCartItem(item: IUpdateCartItemInput): Promise<IAPIResponse<ICart>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const itemIndex = this.mockCartData.items.findIndex(
        cartItem => cartItem.id === item.cartItemId
      );

      if (itemIndex === -1) {
        throw new Error('Cart item not found');
      }

      // Update item
      this.mockCartData.items[itemIndex].quantity = item.quantity;
      if (item.size) this.mockCartData.items[itemIndex].size = item.size;
      if (item.color) this.mockCartData.items[itemIndex].color = item.color;
      
      // Recalculate subtotal
      this.mockCartData.items[itemIndex].subtotal = 
        this.mockCartData.items[itemIndex].productPrice * item.quantity;

      // Recalculate totals
      this.recalculateCart();
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(this.mockCartData));

      return {
        success: true,
        message: 'Cart item updated successfully',
        data: this.mockCartData,
      };
    } catch (error) {
      throw new Error('Failed to update cart item');
    }
  }

  /**
   * Remove item from cart
   * @param cartItemId - Cart item ID
   * @returns Promise<IAPIResponse<ICart>>
   */
  async removeFromCart(cartItemId: string): Promise<IAPIResponse<ICart>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.mockCartData.items = this.mockCartData.items.filter(
        item => item.id !== cartItemId
      );

      // Recalculate totals
      this.recalculateCart();
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(this.mockCartData));

      return {
        success: true,
        message: 'Item removed from cart successfully',
        data: this.mockCartData,
      };
    } catch (error) {
      throw new Error('Failed to remove item from cart');
    }
  }

  /**
   * Clear entire cart
   * @returns Promise<IAPIResponse<ICart>>
   */
  async clearCart(): Promise<IAPIResponse<ICart>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.mockCartData.items = [];
      this.mockCartData.totalAmount = 0;
      this.mockCartData.totalItems = 0;
      this.mockCartData.updatedAt = new Date().toISOString();
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(this.mockCartData));

      return {
        success: true,
        message: 'Cart cleared successfully',
        data: this.mockCartData,
      };
    } catch (error) {
      throw new Error('Failed to clear cart');
    }
  }

  /**
   * Get cart summary
   * @returns Promise<IAPIResponse<ICartSummary>>
   */
  async getCartSummary(): Promise<IAPIResponse<ICartSummary>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const subtotal = this.mockCartData.totalAmount;
      const tax = subtotal * 0.08; // 8% tax
      const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
      const discount = 0; // No discount for now
      const total = subtotal + tax + shipping - discount;

      const summary: ICartSummary = {
        subtotal,
        tax,
        shipping,
        discount,
        total,
        itemCount: this.mockCartData.totalItems,
      };

      return {
        success: true,
        message: 'Cart summary retrieved successfully',
        data: summary,
      };
    } catch (error) {
      throw new Error('Failed to get cart summary');
    }
  }

  /**
   * Get cart recommendations
   * @returns Promise<IAPIResponse<ICartRecommendation[]>>
   */
  async getCartRecommendations(): Promise<IAPIResponse<ICartRecommendation[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock recommendations
      const recommendations: ICartRecommendation[] = [
        {
          id: '1',
          name: 'Black Leather Belt',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          rating: 4.7,
          discount: 15,
        },
        {
          id: '2',
          name: 'Premium Black Wallet',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          rating: 4.9,
          discount: 20,
        },
        {
          id: '3',
          name: 'Black Leather Gloves',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          rating: 4.6,
          discount: 10,
        },
      ];

      return {
        success: true,
        message: 'Cart recommendations retrieved successfully',
        data: recommendations,
      };
    } catch (error) {
      throw new Error('Failed to get cart recommendations');
    }
  }

  /**
   * Apply coupon code
   * @param couponCode - Coupon code
   * @returns Promise<IAPIResponse<ICartSummary>>
   */
  async applyCoupon(couponCode: string): Promise<IAPIResponse<ICartSummary>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock coupon validation
      const validCoupons = ['SAVE10', 'WELCOME20', 'BLACKFRIDAY'];
      const discountPercent = couponCode === 'SAVE10' ? 10 : 
                            couponCode === 'WELCOME20' ? 20 : 
                            couponCode === 'BLACKFRIDAY' ? 30 : 0;

      if (!validCoupons.includes(couponCode)) {
        throw new Error('Invalid coupon code');
      }

      const subtotal = this.mockCartData.totalAmount;
      const tax = subtotal * 0.08;
      const shipping = subtotal > 100 ? 0 : 9.99;
      const discount = subtotal * (discountPercent / 100);
      const total = subtotal + tax + shipping - discount;

      const summary: ICartSummary = {
        subtotal,
        tax,
        shipping,
        discount,
        total,
        itemCount: this.mockCartData.totalItems,
      };

      return {
        success: true,
        message: `Coupon applied successfully! You saved $${discount.toFixed(2)}`,
        data: summary,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to apply coupon');
    }
  }

  /**
   * Private method to recalculate cart totals
   */
  private recalculateCart(): void {
    this.mockCartData.totalAmount = this.mockCartData.items.reduce(
      (total, item) => total + item.subtotal, 0
    );
    this.mockCartData.totalItems = this.mockCartData.items.reduce(
      (total, item) => total + item.quantity, 0
    );
    this.mockCartData.updatedAt = new Date().toISOString();
  }
}

export default new CartService();