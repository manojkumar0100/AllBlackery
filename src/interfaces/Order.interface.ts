/**
 * Order Management Related Interfaces
 */

/**
 * Order Status Enum
 */
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'returned';

/**
 * Payment Status Enum
 */
export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partial_refund';

/**
 * Order Item Interface
 */
export interface IOrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size?: string;
  color?: string;
  totalPrice: number;
  discount?: number;
  sku?: string;
}

/**
 * Order Shipping Address
 */
export interface IOrderShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

/**
 * Order Billing Address
 */
export interface IOrderBillingAddress extends IOrderShippingAddress {
  // Same as shipping address
}

/**
 * Order Payment Information
 */
export interface IOrderPayment {
  method: 'credit_card' | 'debit_card' | 'paypal' | 'stripe' | 'google_pay' | 'apple_pay' | 'cash_on_delivery';
  status: PaymentStatus;
  transactionId?: string;
  paymentIntentId?: string;
  last4?: string; // Last 4 digits of card
  brand?: string; // Visa, MasterCard, etc.
  paidAt?: string;
  refundedAt?: string;
  refundAmount?: number;
}

/**
 * Order Shipping Information
 */
export interface IOrderShipping {
  method: string;
  provider: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cost: number;
}

/**
 * Order Tax Information
 */
export interface IOrderTax {
  rate: number;
  amount: number;
  jurisdiction: string;
}

/**
 * Order Discount Information
 */
export interface IOrderDiscount {
  code?: string;
  type: 'percentage' | 'fixed';
  value: number;
  amount: number;
  description: string;
}

/**
 * Order Timeline Event
 */
export interface IOrderTimelineEvent {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  by?: string; // User who performed the action
}

/**
 * Order Main Interface
 */
export interface IOrder {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: IOrderItem[];
  subtotal: number;
  discount: IOrderDiscount[];
  tax: IOrderTax;
  shipping: IOrderShipping;
  total: number;
  currency: string;
  shippingAddress: IOrderShippingAddress;
  billingAddress: IOrderBillingAddress;
  payment: IOrderPayment;
  timeline: IOrderTimelineEvent[];
  notes?: string;
  customerNotes?: string;
  invoiceUrl?: string;
  receiptUrl?: string;
  refundReason?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Order Create Request
 */
export interface IOrderCreateRequest {
  items: {
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }[];
  shippingAddress: IOrderShippingAddress;
  billingAddress?: IOrderBillingAddress;
  paymentMethod: string;
  shippingMethod: string;
  couponCode?: string;
  customerNotes?: string;
}

/**
 * Order Update Request (Admin)
 */
export interface IOrderUpdateRequest {
  status?: OrderStatus;
  trackingNumber?: string;
  notes?: string;
  shippingMethod?: string;
  estimatedDelivery?: string;
}

/**
 * Order Return Request
 */
export interface IOrderReturnRequest {
  orderId: string;
  items: {
    orderItemId: string;
    quantity: number;
    reason: string;
  }[];
  reason: string;
  description?: string;
  images?: string[];
}

/**
 * Order Refund Request
 */
export interface IOrderRefundRequest {
  orderId: string;
  amount: number;
  reason: string;
  description?: string;
}

/**
 * Order Statistics
 */
export interface IOrderStatistics {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  returnRate: number;
  topSellingProducts: {
    productId: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }[];
}

/**
 * Order Filter Options
 */
export interface IOrderFilters {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string; // Search by order number, customer name, etc.
  page?: number;
  limit?: number;
  sortBy?: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc' | 'status';
}