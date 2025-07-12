/**
 * AllBlackery - Premium Black Fashion E-commerce Platform
 * TypeScript Interface Definitions
 * 
 * This file exports all interfaces used throughout the application
 * for type safety and better development experience.
 */

// API Response Interfaces
export * from './ApiResponse.interface';

// User and Authentication Interfaces
export * from './User.interface';

// Product Related Interfaces
export * from './Product.interface';

// Category Interfaces
export * from './Category.interface';

// Shopping Cart Interfaces
export * from './Cart.interface';

// Wishlist Interfaces
export * from './Wishlist.interface';

// Order Management Interfaces
export * from './Order.interface';

// Payment Interfaces
export * from './Payment.interface';

// Notification Interfaces
export * from './Notification.interface';

/**
 * Common utility types used across the application
 */

// Generic Loading State
export interface ILoadingState {
  isLoading: boolean;
  error: string | null;
}

// Generic Action Response
export interface IActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

// File Upload Interface
export interface IFileUpload {
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Search Interface
export interface ISearchResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  query: string;
}

// Theme Interface
export interface ITheme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: number;
}

// Language Interface
export interface ILanguage {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
}

// Currency Interface
export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
}

// Location Interface
export interface ILocation {
  country: string;
  state: string;
  city: string;
  latitude?: number;
  longitude?: number;
  timezone: string;
}

// Social Media Links
export interface ISocialMedia {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'pinterest';
  url: string;
  handle: string;
}

// SEO Meta Data
export interface ISEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// Form Field Interface
export interface IFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'time' | 'datetime-local';
  value: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  options?: { value: any; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
  error?: string;
  helperText?: string;
}