/**
 * Payment Related Interfaces
 */

/**
 * Payment Method Interface
 */
export interface IPaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'google_pay' | 'apple_pay' | 'bank_transfer';
  brand?: string; // Visa, MasterCard, etc.
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault: boolean;
  isExpired: boolean;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment Intent Interface (Stripe)
 */
export interface IPaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  clientSecret: string;
  paymentMethod?: string;
  description?: string;
  metadata?: Record<string, string>;
  createdAt: string;
}

/**
 * Payment Request
 */
export interface IPaymentRequest {
  amount: number;
  currency: string;
  paymentMethodId?: string;
  description?: string;
  orderId?: string;
  customerId?: string;
  metadata?: Record<string, string>;
  automaticPaymentMethods?: {
    enabled: boolean;
  };
}

/**
 * Payment Confirmation Request
 */
export interface IPaymentConfirmationRequest {
  paymentIntentId: string;
  paymentMethodId?: string;
  returnUrl?: string;
}

/**
 * Payment Webhook Event
 */
export interface IPaymentWebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string;
    idempotency_key: string;
  };
}

/**
 * Payment Refund Request
 */
export interface IPaymentRefundRequest {
  paymentIntentId: string;
  amount?: number; // If not provided, full refund
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
  metadata?: Record<string, string>;
}

/**
 * Payment Statistics
 */
export interface IPaymentStatistics {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  totalAmount: number;
  averageAmount: number;
  refundedAmount: number;
  pendingAmount: number;
  paymentMethods: {
    method: string;
    count: number;
    percentage: number;
  }[];
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
}

/**
 * Payment Error Interface
 */
export interface IPaymentError {
  code: string;
  message: string;
  type: 'card_error' | 'validation_error' | 'authentication_error' | 'rate_limit_error' | 'api_error';
  param?: string;
  decline_code?: string;
  charge?: string;
  payment_intent?: string;
  payment_method?: string;
  setup_intent?: string;
  source?: string;
}

/**
 * Payment Session (for checkout)
 */
export interface IPaymentSession {
  id: string;
  paymentIntentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  expiresAt: string;
  returnUrl: string;
  cancelUrl: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Saved Payment Method for Quick Checkout
 */
export interface ISavedPaymentMethod {
  id: string;
  customerId: string;
  type: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  nickname?: string;
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}