/**
 * Custom hook for Stripe payment integration
 * Handles payment processing with proper error handling
 */

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// TODO: Add your Stripe publishable key
// Get from: https://dashboard.stripe.com/apikeys
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

interface PaymentData {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
}

interface PaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
}

export const useStripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  // Create payment intent
  const createPaymentIntentMutation = useMutation({
    mutationFn: async (paymentData: PaymentData) => {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return response.json();
    },
  });

  const processPayment = useCallback(async (paymentData: PaymentData): Promise<PaymentResult> => {
    if (!stripe || !elements) {
      return { success: false, error: 'Stripe not loaded' };
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const { data: paymentIntent } = await createPaymentIntentMutation.mutateAsync(paymentData);

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Confirm payment
      const { error, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, paymentIntent: confirmedPayment };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Payment failed' 
      };
    } finally {
      setIsProcessing(false);
    }
  }, [stripe, elements, createPaymentIntentMutation]);

  const processPaymentWithToken = useCallback(async (
    paymentData: PaymentData,
    paymentMethodId: string
  ): Promise<PaymentResult> => {
    if (!stripe) {
      return { success: false, error: 'Stripe not loaded' };
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const { data: paymentIntent } = await createPaymentIntentMutation.mutateAsync(paymentData);

      // Confirm payment with existing payment method
      const { error, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: paymentMethodId,
        }
      );

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, paymentIntent: confirmedPayment };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Payment failed' 
      };
    } finally {
      setIsProcessing(false);
    }
  }, [stripe, createPaymentIntentMutation]);

  return {
    processPayment,
    processPaymentWithToken,
    isProcessing,
    error: createPaymentIntentMutation.error,
  };
};

export default useStripePayment;