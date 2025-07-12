/**
 * Order API Service
 * Handles all order-related API operations
 */

import axiosClient from './axiosClient';
import { IOrder, IOrderCreateRequest, IOrderUpdateRequest, IApiResponse, IOrderFilters } from '../interfaces';

const orderApi = {
  /**
   * Get all orders for the current user
   */
  getOrders(filters?: IOrderFilters) {
    const url = 'orders';
    return axiosClient.get<unknown, IApiResponse<{ orders: IOrder[]; pagination: any }>>(url, { params: filters });
  },

  /**
   * Get single order by ID
   */
  getOrder(orderId: string) {
    const url = `orders/${orderId}`;
    return axiosClient.get<unknown, IApiResponse<IOrder>>(url);
  },

  /**
   * Create new order
   */
  createOrder(data: IOrderCreateRequest) {
    const url = 'orders';
    return axiosClient.post<unknown, IApiResponse<IOrder>>(url, data);
  },

  /**
   * Update order (admin only)
   */
  updateOrder(orderId: string, data: IOrderUpdateRequest) {
    const url = `orders/${orderId}`;
    return axiosClient.put<unknown, IApiResponse<IOrder>>(url, data);
  },

  /**
   * Cancel order
   */
  cancelOrder(orderId: string, reason?: string) {
    const url = `orders/${orderId}/cancel`;
    return axiosClient.post<unknown, IApiResponse<IOrder>>(url, { reason });
  },

  /**
   * Track order
   */
  trackOrder(orderId: string) {
    const url = `orders/${orderId}/track`;
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Get order invoice
   */
  getInvoice(orderId: string) {
    const url = `orders/${orderId}/invoice`;
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Download order invoice PDF
   */
  downloadInvoice(orderId: string) {
    const url = `orders/${orderId}/invoice/download`;
    return axiosClient.get(url, { responseType: 'blob' });
  },

  /**
   * Get order receipt
   */
  getReceipt(orderId: string) {
    const url = `orders/${orderId}/receipt`;
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Request order return
   */
  requestReturn(orderId: string, data: any) {
    const url = `orders/${orderId}/return`;
    return axiosClient.post<unknown, IApiResponse<any>>(url, data);
  },

  /**
   * Request order refund
   */
  requestRefund(orderId: string, data: any) {
    const url = `orders/${orderId}/refund`;
    return axiosClient.post<unknown, IApiResponse<any>>(url, data);
  },

  /**
   * Get order history
   */
  getOrderHistory(filters?: IOrderFilters) {
    const url = 'orders/history';
    return axiosClient.get<unknown, IApiResponse<{ orders: IOrder[]; pagination: any }>>(url, { params: filters });
  },

  /**
   * Reorder items from previous order
   */
  reorder(orderId: string) {
    const url = `orders/${orderId}/reorder`;
    return axiosClient.post<unknown, IApiResponse<any>>(url);
  },

  /**
   * Get order statistics (admin)
   */
  getOrderStatistics() {
    const url = 'orders/statistics';
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Export orders (admin)
   */
  exportOrders(filters?: IOrderFilters) {
    const url = 'orders/export';
    return axiosClient.get(url, { params: filters, responseType: 'blob' });
  },

  /**
   * Get order analytics (admin)
   */
  getOrderAnalytics(period?: string) {
    const url = 'orders/analytics';
    return axiosClient.get<unknown, IApiResponse<any>>(url, { params: { period } });
  }
};

export default orderApi;