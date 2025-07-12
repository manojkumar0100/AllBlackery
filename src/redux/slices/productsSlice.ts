/**
 * Products Redux Slice
 * Manages products state and filtering
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductFilters } from '../../interfaces/ProductInterface';

interface ProductsState {
  products: IProduct[];
  featuredProducts: IProduct[];
  currentProduct: IProduct | null;
  filters: IProductFilters;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: string;
  categories: string[];
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  filters: {},
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  searchQuery: '',
  sortBy: 'newest',
  categories: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.featuredProducts = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<IProduct | null>) => {
      state.currentProduct = action.payload;
    },
    setFilters: (state, action: PayloadAction<IProductFilters>) => {
      state.filters = action.payload;
    },
    setPagination: (state, action: PayloadAction<{ 
      total: number; 
      page: number; 
      pages: number; 
    }>) => {
      state.totalProducts = action.payload.total;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.pages;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setFeaturedProducts,
  setCurrentProduct,
  setFilters,
  setPagination,
  setSearchQuery,
  setSortBy,
  setCategories,
  setLoading,
  setError,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;