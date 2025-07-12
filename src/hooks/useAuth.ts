/**
 * Custom Authentication Hook
 * Manages authentication state and actions
 */

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import authApi from '../apis/authApi';
import { ILoginPayload, ISignUpPayload } from '../interfaces/AuthInterface';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (loginData: ILoginPayload) => {
    try {
      dispatch(loginStart());
      const response = await authApi.login(loginData);
      
      if (response.data) {
        dispatch(loginSuccess({
          user: response.data.user,
          token: response.data.accessToken,
        }));
        
        // Store in localStorage
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  const register = async (signUpData: ISignUpPayload) => {
    try {
      dispatch(loginStart());
      const response = await authApi.register(signUpData);
      
      if (response.success) {
        // Registration successful, user needs to verify email
        return response;
      }
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Registration failed'));
      throw error;
    }
  };

  const googleLogin = async (token: string) => {
    try {
      dispatch(loginStart());
      const response = await authApi.googleAuth({ token });
      
      if (response.data) {
        dispatch(loginSuccess({
          user: response.data.user,
          token: response.data.accessToken,
        }));
        
        // Store in localStorage
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Google login failed'));
    }
  };

  const logoutUser = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await authApi.forgotPassword({ email });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (resetData: {
    token: string;
    newPassword: string;
    confirmPassword: string;
    otp: string;
  }) => {
    try {
      const response = await authApi.resetPassword(resetData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (verifyData: { userId: string; otp: string }) => {
    try {
      const response = await authApi.verifyEmail(verifyData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authApi.refreshToken();
      if (response.data) {
        dispatch(loginSuccess({
          user: response.data.user,
          token: response.data.accessToken,
        }));
        
        // Update localStorage
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    googleLogin,
    logout: logoutUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
    getCurrentUser,
    refreshToken,
  };
};