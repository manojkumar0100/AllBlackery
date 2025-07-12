/**
 * Payment API Service
 * Handles all payment-related API operations including Stripe integration
 */

import axiosClient from './axiosClient';
import { IPaymentIntent, IPaymentRequest, IApiResponse } from '../interfaces';

const paymentApi = {
  /**
   * Create payment intent for Stripe
   */
  createPaymentIntent(data: IPaymentRequest) {
    const url = 'payments/create-intent';
    return axiosClient.post<unknown, IApiResponse<IPaymentIntent>>(url, data);
  },

  /**
   * Confirm payment intent
   */
  confirmPaymentIntent(paymentIntentId: string, paymentMethodId?: string) {
    const url = 'payments/confirm-intent';
    return axiosClient.post<unknown, IApiResponse<any>>(url, { paymentIntentId, paymentMethodId });
  },

  /**
   * Get payment methods for user
   */
  getPaymentMethods() {
    const url = 'payments/methods';
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Save payment method
   */
  savePaymentMethod(paymentMethodId: string, isDefault?: boolean) {
    const url = 'payments/methods';
    return axiosClient.post<unknown, IApiResponse<any>>(url, { paymentMethodId, isDefault });
  },

  /**
   * Delete payment method
   */
  deletePaymentMethod(paymentMethodId: string) {
    const url = `payments/methods/${paymentMethodId}`;
    return axiosClient.delete<unknown, IApiResponse<any>>(url);
  },

  /**
   * Set default payment method
   */
  setDefaultPaymentMethod(paymentMethodId: string) {
    const url = `payments/methods/${paymentMethodId}/default`;
    return axiosClient.post<unknown, IApiResponse<any>>(url);
  },

  /**
   * Process refund
   */
  processRefund(paymentIntentId: string, amount?: number, reason?: string) {
    const url = 'payments/refund';
    return axiosClient.post<unknown, IApiResponse<any>>(url, { paymentIntentId, amount, reason });
  },

  /**
   * Get payment history
   */
  getPaymentHistory(filters?: any) {
    const url = 'payments/history';
    return axiosClient.get<unknown, IApiResponse<any>>(url, { params: filters });
  },

  /**
   * Get payment statistics (admin)
   */
  getPaymentStatistics() {
    const url = 'payments/statistics';
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Validate payment method
   */
  validatePaymentMethod(paymentMethodId: string) {
    const url = `payments/validate/${paymentMethodId}`;
    return axiosClient.post<unknown, IApiResponse<any>>(url);
  },

  /**
   * Get Stripe publishable key
   */
  getStripeConfig() {
    const url = 'payments/stripe/config';
    return axiosClient.get<unknown, IApiResponse<{ publishableKey: string }>>(url);
  },

  /**
   * Handle Stripe webhook (internal use)
   */
  handleStripeWebhook(data: any) {
    const url = 'payments/stripe/webhook';
    return axiosClient.post<unknown, IApiResponse<any>>(url, data);
  },

  /**
   * Create checkout session
   */
  createCheckoutSession(data: any) {
    const url = 'payments/checkout/session';
    return axiosClient.post<unknown, IApiResponse<any>>(url, data);
  },

  /**
   * Get checkout session status
   */
  getCheckoutSessionStatus(sessionId: string) {
    const url = `payments/checkout/session/${sessionId}`;
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  }
};

export default paymentApi;