/**
 * Authentication Interface Definitions
 * Defines all types and interfaces for authentication-related operations
 */

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IFieldsInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IAuthPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IForgotPasswordInput {
  email: string;
}

export interface IResetPasswordInput {
  token: string;
  newPassword: string;
  confirmPassword: string;
  otp: string;
}

export interface IVerifyEmailInput {
  userId: string;
  otp: string;
}

export interface IGoogleAuthInput {
  token: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: IUser;
    accessToken: string;
    tokenType: string;
  };
}

export interface IAPIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}