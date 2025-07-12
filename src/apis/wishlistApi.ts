/**
 * Wishlist API Services
 * Handles all wishlist-related API calls with fake backend
 */

import axios from 'axios';
import { 
  IWishlist, 
  IAddToWishlistInput, 
  IWishlistResponse,
  IWishlistRecommendation,
  IWishlistItem
} from '../interfaces/WishlistInterface';
import { IAPIResponse } from '../interfaces/AuthInterface';

// Mock API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const wishlistApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
wishlistApi.interceptors.request.use(
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
 * Wishlist Service with Mock Data
 */
class WishlistService {
  private mockWishlistData: IWishlist = {
    id: '1',
    userId: '1',
    items: [],
    totalItems: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  /**
   * Get user's wishlist
   * @returns Promise<IAPIResponse<IWishlist>>
   */
  async getWishlist(): Promise<IAPIResponse<IWishlist>> {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get wishlist from localStorage or use mock data
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        this.mockWishlistData = JSON.parse(savedWishlist);
      }

      return {
        success: true,
        message: 'Wishlist retrieved successfully',
        data: this.mockWishlistData,
      };
    } catch (error) {
      throw new Error('Failed to fetch wishlist');
    }
  }

  /**
   * Add item to wishlist
   * @param item - Item to add
   * @returns Promise<IAPIResponse<IWishlist>>
   */
  async addToWishlist(item: IAddToWishlistInput): Promise<IAPIResponse<IWishlist>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if item already exists
      const existingItem = this.mockWishlistData.items.find(
        wishlistItem => wishlistItem.productId === item.productId
      );

      if (existingItem) {
        throw new Error('Item already in wishlist');
      }

      // Mock wishlist item data
      const mockWishlistItem: IWishlistItem = {
        id: `wishlist-item-${Date.now()}`,
        productId: item.productId,
        productName: 'Premium Black Leather Jacket', // Mock data
        productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
        productPrice: 299.99,
        originalPrice: 399.99,
        discount: 25,
        rating: 4.8,
        reviews: 127,
        inStock: true,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Dark Brown'],
        addedAt: new Date().toISOString(),
      };

      // Add item to wishlist
      this.mockWishlistData.items.push(mockWishlistItem);
      this.mockWishlistData.totalItems = this.mockWishlistData.items.length;
      this.mockWishlistData.updatedAt = new Date().toISOString();
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.mockWishlistData));

      return {
        success: true,
        message: 'Item added to wishlist successfully',
        data: this.mockWishlistData,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to add item to wishlist');
    }
  }

  /**
   * Remove item from wishlist
   * @param wishlistItemId - Wishlist item ID
   * @returns Promise<IAPIResponse<IWishlist>>
   */
  async removeFromWishlist(wishlistItemId: string): Promise<IAPIResponse<IWishlist>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.mockWishlistData.items = this.mockWishlistData.items.filter(
        item => item.id !== wishlistItemId
      );
      
      this.mockWishlistData.totalItems = this.mockWishlistData.items.length;
      this.mockWishlistData.updatedAt = new Date().toISOString();
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.mockWishlistData));

      return {
        success: true,
        message: 'Item removed from wishlist successfully',
        data: this.mockWishlistData,
      };
    } catch (error) {
      throw new Error('Failed to remove item from wishlist');
    }
  }

  /**
   * Remove item from wishlist by product ID
   * @param productId - Product ID
   * @returns Promise<IAPIResponse<IWishlist>>
   */
  async removeFromWishlistByProduct(productId: string): Promise<IAPIResponse<IWishlist>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.mockWishlistData.items = this.mockWishlistData.items.filter(
        item => item.productId !== productId
      );
      
      this.mockWishlistData.totalItems = this.mockWishlistData.items.length;
      this.mockWishlistData.updatedAt = new Date().toISOString();
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.mockWishlistData));

      return {
        success: true,
        message: 'Item removed from wishlist successfully',
        data: this.mockWishlistData,
      };
    } catch (error) {
      throw new Error('Failed to remove item from wishlist');
    }
  }

  /**
   * Clear entire wishlist
   * @returns Promise<IAPIResponse<IWishlist>>
   */
  async clearWishlist(): Promise<IAPIResponse<IWishlist>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.mockWishlistData.items = [];
      this.mockWishlistData.totalItems = 0;
      this.mockWishlistData.updatedAt = new Date().toISOString();
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.mockWishlistData));

      return {
        success: true,
        message: 'Wishlist cleared successfully',
        data: this.mockWishlistData,
      };
    } catch (error) {
      throw new Error('Failed to clear wishlist');
    }
  }

  /**
   * Get wishlist recommendations
   * @returns Promise<IAPIResponse<IWishlistRecommendation[]>>
   */
  async getWishlistRecommendations(): Promise<IAPIResponse<IWishlistRecommendation[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock recommendations based on wishlist items
      const recommendations: IWishlistRecommendation[] = [
        {
          id: '1',
          name: 'Black Leather Boots',
          price: 159.99,
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          rating: 4.7,
          discount: 20,
          category: 'Shoes',
        },
        {
          id: '2',
          name: 'Premium Black Handbag',
          price: 249.99,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          rating: 4.9,
          discount: 25,
          category: 'Bags',
        },
        {
          id: '3',
          name: 'Elegant Black Dress',
          price: 189.99,
          image: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
          rating: 4.8,
          discount: 30,
          category: 'Dresses',
        },
        {
          id: '4',
          name: 'Classic Black Blazer',
          price: 159.99,
          image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          rating: 4.6,
          discount: 15,
          category: 'Blazers',
        },
      ];

      return {
        success: true,
        message: 'Wishlist recommendations retrieved successfully',
        data: recommendations,
      };
    } catch (error) {
      throw new Error('Failed to get wishlist recommendations');
    }
  }

  /**
   * Check if product is in wishlist
   * @param productId - Product ID
   * @returns Promise<IAPIResponse<boolean>>
   */
  async isInWishlist(productId: string): Promise<IAPIResponse<boolean>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const isInWishlist = this.mockWishlistData.items.some(
        item => item.productId === productId
      );

      return {
        success: true,
        message: 'Wishlist status checked successfully',
        data: isInWishlist,
      };
    } catch (error) {
      throw new Error('Failed to check wishlist status');
    }
  }

  /**
   * Move item from wishlist to cart
   * @param wishlistItemId - Wishlist item ID
   * @param quantity - Quantity to add to cart
   * @param size - Selected size
   * @param color - Selected color
   * @returns Promise<IAPIResponse<{ wishlist: IWishlist; cartMessage: string }>>
   */
  async moveToCart(
    wishlistItemId: string, 
    quantity: number = 1, 
    size?: string, 
    color?: string
  ): Promise<IAPIResponse<{ wishlist: IWishlist; cartMessage: string }>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the item in wishlist
      const item = this.mockWishlistData.items.find(
        wishlistItem => wishlistItem.id === wishlistItemId
      );

      if (!item) {
        throw new Error('Item not found in wishlist');
      }

      // Remove from wishlist
      await this.removeFromWishlist(wishlistItemId);

      // Here you would typically add to cart
      // For demo purposes, we'll just simulate the action
      
      return {
        success: true,
        message: 'Item moved to cart successfully',
        data: {
          wishlist: this.mockWishlistData,
          cartMessage: `${item.productName} has been added to your cart`,
        },
      };
    } catch (error) {
      throw new Error('Failed to move item to cart');
    }
  }
}

export default new WishlistService();