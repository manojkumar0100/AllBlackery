/**
 * Wishlist Redux Slice
 * Manages wishlist state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWishlist, IWishlistItem } from '../../interfaces/WishlistInterface';

interface WishlistState {
  wishlist: IWishlist | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<IWishlist>) => {
      state.wishlist = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<IWishlistItem>) => {
      if (state.wishlist) {
        const existingItem = state.wishlist.items.find(
          item => item.productId === action.payload.productId
        );

        if (!existingItem) {
          state.wishlist.items.push(action.payload);
          state.wishlist.totalItems = state.wishlist.items.length;
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      if (state.wishlist) {
        state.wishlist.items = state.wishlist.items.filter(
          item => item.id !== action.payload
        );
        state.wishlist.totalItems = state.wishlist.items.length;
      }
    },
    removeFromWishlistByProduct: (state, action: PayloadAction<string>) => {
      if (state.wishlist) {
        state.wishlist.items = state.wishlist.items.filter(
          item => item.productId !== action.payload
        );
        state.wishlist.totalItems = state.wishlist.items.length;
      }
    },
    clearWishlist: (state) => {
      if (state.wishlist) {
        state.wishlist.items = [];
        state.wishlist.totalItems = 0;
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
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  removeFromWishlistByProduct,
  clearWishlist,
  setLoading,
  setError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;