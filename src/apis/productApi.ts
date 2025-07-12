/**
 * Product API Services
 * Handles all product-related API calls with fake backend
 */

import axios from 'axios';
import { 
  IProduct, 
  IProductCreate, 
  IProductFilters, 
  IProductResponse,
  IProductReview,
  IProductStats
} from '../interfaces/ProductInterface';
import { IAPIResponse } from '../interfaces/AuthInterface';

// Mock API base URL - Replace with actual backend URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const productApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
productApi.interceptors.request.use(
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
 * Mock Product Service
 * This provides fake responses for development
 */
class ProductService {
  /**
   * Get all products with filters
   * @param filters - Product filters
   * @returns Promise<IAPIResponse<IProductResponse>>
   */
  async getProducts(filters: IProductFilters = {}): Promise<IAPIResponse<IProductResponse>> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await productApi.get('/products', { params: filters });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock products data
      const mockProducts: IProduct[] = [
        {
          id: '1',
          name: 'Premium Black Leather Jacket',
          description: 'Luxurious black leather jacket with premium finish. Perfect for any occasion.',
          price: 299.99,
          originalPrice: 399.99,
          discount: 25,
          categoryId: 'jackets',
          categoryName: 'Jackets',
          images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
            'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
          ],
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Black', 'Dark Brown'],
          stock: 25,
          featured: true,
          rating: 4.8,
          reviews: 127,
          tags: ['premium', 'leather', 'winter'],
          brand: 'AllBlackery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Elegant Black Dress',
          description: 'Stunning black dress perfect for evening events and special occasions.',
          price: 189.99,
          originalPrice: 249.99,
          discount: 24,
          categoryId: 'dresses',
          categoryName: 'Dresses',
          images: [
            'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
            'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
          ],
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: ['Black', 'Deep Navy'],
          stock: 18,
          featured: true,
          rating: 4.9,
          reviews: 89,
          tags: ['elegant', 'evening', 'formal'],
          brand: 'AllBlackery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Classic Black Blazer',
          description: 'Professional black blazer with tailored fit. Essential for business wardrobe.',
          price: 159.99,
          originalPrice: 199.99,
          discount: 20,
          categoryId: 'blazers',
          categoryName: 'Blazers',
          images: [
            'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
          ],
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Black', 'Charcoal'],
          stock: 32,
          featured: false,
          rating: 4.7,
          reviews: 156,
          tags: ['professional', 'business', 'formal'],
          brand: 'AllBlackery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Luxury Black Handbag',
          description: 'Premium black leather handbag with gold accents. Perfect for any occasion.',
          price: 249.99,
          originalPrice: 329.99,
          discount: 24,
          categoryId: 'bags',
          categoryName: 'Bags',
          images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
          ],
          sizes: ['One Size'],
          colors: ['Black', 'Black with Gold'],
          stock: 15,
          featured: true,
          rating: 4.9,
          reviews: 234,
          tags: ['luxury', 'handbag', 'leather'],
          brand: 'AllBlackery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          name: 'Stylish Black Boots',
          description: 'Comfortable black ankle boots with modern design. Perfect for everyday wear.',
          price: 129.99,
          originalPrice: 179.99,
          discount: 28,
          categoryId: 'shoes',
          categoryName: 'Shoes',
          images: [
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
          ],
          sizes: ['36', '37', '38', '39', '40', '41', '42'],
          colors: ['Black', 'Matte Black'],
          stock: 42,
          featured: false,
          rating: 4.6,
          reviews: 78,
          tags: ['comfortable', 'everyday', 'boots'],
          brand: 'AllBlackery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '6',
          name: 'Premium Black Sunglasses',
          description: 'Designer black sunglasses with UV protection. Style meets functionality.',
          price: 89.99,
          originalPrice: 119.99,
          discount: 25,
          categoryId: 'accessories',
          categoryName: 'Accessories',
          images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80'
          ],
          sizes: ['One Size'],
          colors: ['Black', 'Matte Black'],
          stock: 67,
          featured: true,
          rating: 4.8,
          reviews: 145,
          tags: ['designer', 'sunglasses', 'UV protection'],
          brand: 'AllBlackery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      // Apply filters (mock implementation)
      let filteredProducts = mockProducts;
      
      if (filters.search) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      
      if (filters.featured !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.featured === filters.featured);
      }
      
      if (filters.categoryId) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === filters.categoryId);
      }

      // Mock pagination
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      const response: IProductResponse = {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          pages: Math.ceil(filteredProducts.length / limit),
        },
      };

      return {
        success: true,
        message: 'Products retrieved successfully',
        data: response,
      };
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Get single product by ID
   * @param productId - Product ID
   * @returns Promise<IAPIResponse<IProduct>>
   */
  async getProduct(productId: string): Promise<IAPIResponse<IProduct>> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await productApi.get(`/products/${productId}`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock product data
      const mockProduct: IProduct = {
        id: productId,
        name: 'Premium Black Leather Jacket',
        description: 'Luxurious black leather jacket with premium finish. Perfect for any occasion. Made from genuine leather with attention to detail.',
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        categoryId: 'jackets',
        categoryName: 'Jackets',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
          'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Dark Brown'],
        stock: 25,
        featured: true,
        rating: 4.8,
        reviews: 127,
        tags: ['premium', 'leather', 'winter'],
        brand: 'AllBlackery',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        message: 'Product retrieved successfully',
        data: mockProduct,
      };
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Get product reviews
   * @param productId - Product ID
   * @returns Promise<IAPIResponse<IProductReview[]>>
   */
  async getProductReviews(productId: string): Promise<IAPIResponse<IProductReview[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock reviews data
      const mockReviews: IProductReview[] = [
        {
          id: '1',
          userId: '1',
          userName: 'Sarah Johnson',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
          productId,
          rating: 5,
          comment: 'Amazing quality! The leather is so soft and the fit is perfect. Highly recommend!',
          helpful: 12,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          userId: '2',
          userName: 'Mike Chen',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
          productId,
          rating: 4,
          comment: 'Great jacket, looks exactly like the photos. Shipping was fast too.',
          helpful: 8,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];

      return {
        success: true,
        message: 'Reviews retrieved successfully',
        data: mockReviews,
      };
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  }

  /**
   * Get product recommendations
   * @param productId - Product ID
   * @returns Promise<IAPIResponse<IProduct[]>>
   */
  async getProductRecommendations(productId: string): Promise<IAPIResponse<IProduct[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return first 4 products as recommendations
      const { data } = await this.getProducts({ limit: 4 });
      
      return {
        success: true,
        message: 'Recommendations retrieved successfully',
        data: data?.products || [],
      };
    } catch (error) {
      throw new Error('Failed to fetch recommendations');
    }
  }

  /**
   * Search products
   * @param query - Search query
   * @returns Promise<IAPIResponse<IProduct[]>>
   */
  async searchProducts(query: string): Promise<IAPIResponse<IProduct[]>> {
    try {
      const { data } = await this.getProducts({ search: query });
      
      return {
        success: true,
        message: 'Search results retrieved successfully',
        data: data?.products || [],
      };
    } catch (error) {
      throw new Error('Search failed');
    }
  }
}

export default new ProductService();