/**
 * Custom Cart Hook
 * Manages cart state and actions
 */

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setCart,
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItem as updateCartItemAction,
  clearCart as clearCartAction,
  setLoading,
  setError,
} from '../redux/slices/cartSlice';
import cartApi from '../apis/cartApi';
import { IAddToCartInput, IUpdateCartItemInput } from '../interfaces/CartInterface';

export const useCart = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector(
    (state: RootState) => state.cart
  );

  const loadCart = async () => {
    try {
      dispatch(setLoading(true));
      const response = await cartApi.getCart();
      
      if (response.data) {
        dispatch(setCart(response.data));
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to load cart'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addToCart = async (item: IAddToCartInput) => {
    try {
      dispatch(setLoading(true));
      const response = await cartApi.addToCart(item);
      
      if (response.data) {
        dispatch(setCart(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to add to cart'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateCartItem = async (item: IUpdateCartItemInput) => {
    try {
      dispatch(setLoading(true));
      const response = await cartApi.updateCartItem(item);
      
      if (response.data) {
        dispatch(setCart(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to update cart'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await cartApi.removeFromCart(cartItemId);
      
      if (response.data) {
        dispatch(setCart(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to remove from cart'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearCart = async () => {
    try {
      dispatch(setLoading(true));
      const response = await cartApi.clearCart();
      
      if (response.data) {
        dispatch(setCart(response.data));
        return response;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to clear cart'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCartSummary = async () => {
    try {
      const response = await cartApi.getCartSummary();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCartRecommendations = async () => {
    try {
      const response = await cartApi.getCartRecommendations();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const applyCoupon = async (couponCode: string) => {
    try {
      const response = await cartApi.applyCoupon(couponCode);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCartItemCount = () => {
    return cart?.totalItems || 0;
  };

  const getCartTotal = () => {
    return cart?.totalAmount || 0;
  };

  const isInCart = (productId: string, size?: string, color?: string) => {
    if (!cart) return false;
    
    return cart.items.some(item => 
      item.productId === productId &&
      (!size || item.size === size) &&
      (!color || item.color === color)
    );
  };

  return {
    cart,
    isLoading,
    error,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartSummary,
    getCartRecommendations,
    applyCoupon,
    getCartItemCount,
    getCartTotal,
    isInCart,
  };
};