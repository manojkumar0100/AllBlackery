/**
 * Custom Wishlist Hook
 * Manages wishlist state and actions
 */

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setWishlist,
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  removeFromWishlistByProduct,
  clearWishlist as clearWishlistAction,
  setLoading,
  setError,
} from '../redux/slices/wishlistSlice';
import wishlistApi from '../apis/wishlistApi';
import { IAddToWishlistInput } from '../interfaces/WishlistInterface';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, isLoading, error } = useSelector(
    (state: RootState) => state.wishlist
  );

  const loadWishlist = async () => {
    try {
      dispatch(setLoading(true));
      const response = await wishlistApi.getWishlist();
      
      if (response.data) {
        dispatch(setWishlist(response.data));
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to load wishlist'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addToWishlist = async (item: IAddToWishlistInput) => {
    try {
      dispatch(setLoading(true));
      const response = await wishlistApi.addToWishlist(item);
      
      if (response.data) {
        dispatch(setWishlist(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to add to wishlist'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFromWishlist = async (wishlistItemId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await wishlistApi.removeFromWishlist(wishlistItemId);
      
      if (response.data) {
        dispatch(setWishlist(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to remove from wishlist'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFromWishlistByProductId = async (productId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await wishlistApi.removeFromWishlistByProduct(productId);
      
      if (response.data) {
        dispatch(setWishlist(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to remove from wishlist'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearWishlist = async () => {
    try {
      dispatch(setLoading(true));
      const response = await wishlistApi.clearWishlist();
      
      if (response.data) {
        dispatch(setWishlist(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to clear wishlist'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getWishlistRecommendations = async () => {
    try {
      const response = await wishlistApi.getWishlistRecommendations();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const moveToCart = async (wishlistItemId: string, quantity: number = 1, size?: string, color?: string) => {
    try {
      const response = await wishlistApi.moveToCart(wishlistItemId, quantity, size, color);
      
      if (response.data) {
        dispatch(setWishlist(response.data.wishlist));
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const isInWishlist = async (productId: string) => {
    try {
      const response = await wishlistApi.isInWishlist(productId);
      return response.data || false;
    } catch (error) {
      return false;
    }
  };

  const getWishlistItemCount = () => {
    return wishlist?.totalItems || 0;
  };

  const isProductInWishlist = (productId: string) => {
    if (!wishlist) return false;
    
    return wishlist.items.some(item => item.productId === productId);
  };

  const toggleWishlist = async (productId: string) => {
    try {
      const inWishlist = isProductInWishlist(productId);
      
      if (inWishlist) {
        // Remove from wishlist
        const item = wishlist?.items.find(item => item.productId === productId);
        if (item) {
          await removeFromWishlist(item.id);
        }
      } else {
        // Add to wishlist
        await addToWishlist({ productId });
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    wishlist,
    isLoading,
    error,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    removeFromWishlistByProductId,
    clearWishlist,
    getWishlistRecommendations,
    moveToCart,
    isInWishlist,
    getWishlistItemCount,
    isProductInWishlist,
    toggleWishlist,
  };
};