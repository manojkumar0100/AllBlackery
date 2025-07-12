/**
 * Cart Redux Slice
 * Manages shopping cart state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, ICartItem } from '../../interfaces/CartInterface';

interface CartState {
  cart: ICart | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      if (state.cart) {
        const existingItem = state.cart.items.find(
          item => item.productId === action.payload.productId &&
                  item.size === action.payload.size &&
                  item.color === action.payload.color
        );

        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
          existingItem.subtotal = existingItem.productPrice * existingItem.quantity;
        } else {
          state.cart.items.push(action.payload);
        }

        // Recalculate totals
        state.cart.totalItems = state.cart.items.reduce((total, item) => total + item.quantity, 0);
        state.cart.totalAmount = state.cart.items.reduce((total, item) => total + item.subtotal, 0);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      if (state.cart) {
        state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
        
        // Recalculate totals
        state.cart.totalItems = state.cart.items.reduce((total, item) => total + item.quantity, 0);
        state.cart.totalAmount = state.cart.items.reduce((total, item) => total + item.subtotal, 0);
      }
    },
    updateCartItem: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      if (state.cart) {
        const item = state.cart.items.find(item => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
          item.subtotal = item.productPrice * item.quantity;
          
          // Recalculate totals
          state.cart.totalItems = state.cart.items.reduce((total, item) => total + item.quantity, 0);
          state.cart.totalAmount = state.cart.items.reduce((total, item) => total + item.subtotal, 0);
        }
      }
    },
    clearCart: (state) => {
      if (state.cart) {
        state.cart.items = [];
        state.cart.totalItems = 0;
        state.cart.totalAmount = 0;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;