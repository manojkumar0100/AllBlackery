/**
 * Authentication API Services
 * Handles all authentication-related API calls with fake backend
 */

import axios from 'axios';
import { 
  ILoginPayload, 
  ISignUpPayload, 
  IAuthResponse, 
  IAPIResponse,
  IForgotPasswordInput,
  IResetPasswordInput,
  IVerifyEmailInput,
  IGoogleAuthInput,
  IUser
} from '../interfaces/AuthInterface';

// Mock API base URL - Replace with actual backend URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

/**
 * Mock Authentication Service
 * This provides fake responses for development - replace with real API calls
 */
class AuthService {
  /**
   * User login with email and password
   * @param loginData - Email and password
   * @returns Promise<IAuthResponse>
   */
  async login(loginData: ILoginPayload): Promise<IAuthResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/login', loginData);
      
      // Mock successful response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const mockUser: IUser = {
        id: '1',
        email: loginData.email,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        role: 'user',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse: IAuthResponse = {
        success: true,
        message: 'Login successful',
        data: {
          user: mockUser,
          accessToken: 'mock-jwt-token-12345',
          tokenType: 'bearer',
        },
      };

      // Store token and user in localStorage
      localStorage.setItem('accessToken', mockResponse.data!.accessToken);
      localStorage.setItem('user', JSON.stringify(mockResponse.data!.user));

      return mockResponse;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  /**
   * User registration
   * @param signUpData - User registration data
   * @returns Promise<IAPIResponse>
   */
  async register(signUpData: ISignUpPayload): Promise<IAPIResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/register', signUpData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Registration successful! Please check your email for verification.',
        data: { userId: '1' },
      };
    } catch (error) {
      throw new Error('Registration failed');
    }
  }

  /**
   * Google OAuth login
   * @param googleData - Google OAuth token
   * @returns Promise<IAuthResponse>
   */
  async googleAuth(googleData: IGoogleAuthInput): Promise<IAuthResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/google', googleData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: IUser = {
        id: '1',
        email: 'user@gmail.com',
        firstName: 'Google',
        lastName: 'User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        role: 'user',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse: IAuthResponse = {
        success: true,
        message: 'Google authentication successful',
        data: {
          user: mockUser,
          accessToken: 'mock-google-jwt-token-12345',
          tokenType: 'bearer',
        },
      };

      localStorage.setItem('accessToken', mockResponse.data!.accessToken);
      localStorage.setItem('user', JSON.stringify(mockResponse.data!.user));

      return mockResponse;
    } catch (error) {
      throw new Error('Google authentication failed');
    }
  }

  /**
   * Forgot password - send reset email
   * @param forgotData - Email address
   * @returns Promise<IAPIResponse>
   */
  async forgotPassword(forgotData: IForgotPasswordInput): Promise<IAPIResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/forgot-password', forgotData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Password reset email sent successfully',
        data: { resetToken: 'mock-reset-token-12345' },
      };
    } catch (error) {
      throw new Error('Failed to send reset email');
    }
  }

  /**
   * Reset password with token and OTP
   * @param resetData - Reset token, new password, and OTP
   * @returns Promise<IAPIResponse>
   */
  async resetPassword(resetData: IResetPasswordInput): Promise<IAPIResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/reset-password', resetData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Password reset successful',
      };
    } catch (error) {
      throw new Error('Password reset failed');
    }
  }

  /**
   * Verify email with OTP
   * @param verifyData - User ID and OTP
   * @returns Promise<IAPIResponse>
   */
  async verifyEmail(verifyData: IVerifyEmailInput): Promise<IAPIResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/verify-email', verifyData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Email verified successfully',
      };
    } catch (error) {
      throw new Error('Email verification failed');
    }
  }

  /**
   * Logout user
   * @returns Promise<IAPIResponse>
   */
  async logout(): Promise<IAPIResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/logout');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  /**
   * Get current user info
   * @returns Promise<IAPIResponse<IUser>>
   */
  async getCurrentUser(): Promise<IAPIResponse<IUser>> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.get('/users/me');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('No user found');
      }

      const user: IUser = JSON.parse(userStr);
      
      return {
        success: true,
        message: 'User information retrieved successfully',
        data: user,
      };
    } catch (error) {
      throw new Error('Failed to get user information');
    }
  }

  /**
   * Refresh access token
   * @returns Promise<IAuthResponse>
   */
  async refreshToken(): Promise<IAuthResponse> {
    try {
      // Mock API call - replace with actual endpoint
      // const response = await authApi.post('/auth/refresh');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('No user found');
      }

      const user: IUser = JSON.parse(userStr);
      const newToken = 'mock-refreshed-jwt-token-12345';
      
      localStorage.setItem('accessToken', newToken);
      
      return {
        success: true,
        message: 'Token refreshed successfully',
        data: {
          user,
          accessToken: newToken,
          tokenType: 'bearer',
        },
      };
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }
}

export default new AuthService();