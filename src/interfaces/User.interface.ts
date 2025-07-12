/**
 * User Authentication and Account Management Interfaces
 */

/**
 * User Registration Data
 */
export interface IAuthPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
}

/**
 * User Login Data
 */
export interface ILoginPayload {
  email: string;
  password: string;
}

/**
 * User Data Response
 */
export interface IUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication Response
 */
export interface IAuthResponse {
  user: IUserData;
  accessToken: string;
  tokenType: string;
}

/**
 * Google OAuth Request
 */
export interface IGoogleAuthRequest {
  token: string;
}

/**
 * Forgot Password Request
 */
export interface IForgotPasswordRequest {
  email: string;
}

/**
 * Reset Password Request
 */
export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
  otp: string;
}

/**
 * Email Verification Request
 */
export interface IEmailVerificationRequest {
  userId: string;
  otp: string;
}

/**
 * User Profile Update
 */
export interface IUserProfileUpdate {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  currentPassword?: string;
  newPassword?: string;
}

/**
 * User Preferences
 */
export interface IUserPreferences {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  currency: string;
}

/**
 * User Address
 */
export interface IUserAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}