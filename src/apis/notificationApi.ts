/**
 * Notification API Service
 * Handles all notification-related API operations
 */

import axiosClient from './axiosClient';
import { INotification, INotificationPreferences, IApiResponse, INotificationFilters } from '../interfaces';

const notificationApi = {
  /**
   * Get all notifications for the current user
   */
  getNotifications(filters?: INotificationFilters) {
    const url = 'notifications';
    return axiosClient.get<unknown, IApiResponse<{ notifications: INotification[]; pagination: any }>>(url, { params: filters });
  },

  /**
   * Get unread notifications count
   */
  getUnreadCount() {
    const url = 'notifications/unread-count';
    return axiosClient.get<unknown, IApiResponse<{ count: number }>>(url);
  },

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string) {
    const url = `notifications/${notificationId}/read`;
    return axiosClient.post<unknown, IApiResponse<INotification>>(url);
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead() {
    const url = 'notifications/read-all';
    return axiosClient.post<unknown, IApiResponse<undefined>>(url);
  },

  /**
   * Archive notification
   */
  archiveNotification(notificationId: string) {
    const url = `notifications/${notificationId}/archive`;
    return axiosClient.post<unknown, IApiResponse<INotification>>(url);
  },

  /**
   * Delete notification
   */
  deleteNotification(notificationId: string) {
    const url = `notifications/${notificationId}`;
    return axiosClient.delete<unknown, IApiResponse<undefined>>(url);
  },

  /**
   * Get notification preferences
   */
  getPreferences() {
    const url = 'notifications/preferences';
    return axiosClient.get<unknown, IApiResponse<INotificationPreferences>>(url);
  },

  /**
   * Update notification preferences
   */
  updatePreferences(preferences: Partial<INotificationPreferences>) {
    const url = 'notifications/preferences';
    return axiosClient.put<unknown, IApiResponse<INotificationPreferences>>(url, preferences);
  },

  /**
   * Subscribe to push notifications
   */
  subscribeToPush(subscription: any) {
    const url = 'notifications/push/subscribe';
    return axiosClient.post<unknown, IApiResponse<any>>(url, subscription);
  },

  /**
   * Unsubscribe from push notifications
   */
  unsubscribeFromPush() {
    const url = 'notifications/push/unsubscribe';
    return axiosClient.post<unknown, IApiResponse<any>>(url);
  },

  /**
   * Send test notification
   */
  sendTestNotification(type: string) {
    const url = 'notifications/test';
    return axiosClient.post<unknown, IApiResponse<any>>(url, { type });
  },

  /**
   * Get notification statistics (admin)
   */
  getNotificationStatistics() {
    const url = 'notifications/statistics';
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Send bulk notification (admin)
   */
  sendBulkNotification(data: any) {
    const url = 'notifications/bulk';
    return axiosClient.post<unknown, IApiResponse<any>>(url, data);
  },

  /**
   * Get notification templates (admin)
   */
  getNotificationTemplates() {
    const url = 'notifications/templates';
    return axiosClient.get<unknown, IApiResponse<any>>(url);
  },

  /**
   * Update notification template (admin)
   */
  updateNotificationTemplate(templateId: string, data: any) {
    const url = `notifications/templates/${templateId}`;
    return axiosClient.put<unknown, IApiResponse<any>>(url, data);
  }
};

export default notificationApi;