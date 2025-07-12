/**
 * Notification Related Interfaces
 */

/**
 * Notification Type Enum
 */
export type NotificationType = 
  | 'order_confirmation'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_cancelled'
  | 'payment_successful'
  | 'payment_failed'
  | 'refund_processed'
  | 'price_drop'
  | 'back_in_stock'
  | 'sale_alert'
  | 'account_verification'
  | 'password_reset'
  | 'login_alert'
  | 'product_review'
  | 'wishlist_item_sale'
  | 'cart_abandonment'
  | 'newsletter'
  | 'promotional'
  | 'system_maintenance'
  | 'security_alert';

/**
 * Notification Channel Enum
 */
export type NotificationChannel = 
  | 'email'
  | 'sms'
  | 'push'
  | 'in_app'
  | 'webhook';

/**
 * Notification Priority Enum
 */
export type NotificationPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

/**
 * Notification Interface
 */
export interface INotification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>; // Additional data for the notification
  isRead: boolean;
  isArchived: boolean;
  scheduledAt?: string;
  sentAt?: string;
  readAt?: string;
  expiresAt?: string;
  retryCount: number;
  maxRetries: number;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Notification Template Interface
 */
export interface INotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  channel: NotificationChannel;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[]; // List of variables that can be used in the template
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Notification Preferences Interface
 */
export interface INotificationPreferences {
  userId: string;
  email: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    priceDrops: boolean;
    backInStock: boolean;
    promotions: boolean;
    newsletter: boolean;
    securityAlerts: boolean;
  };
  sms: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    securityAlerts: boolean;
  };
  push: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    priceDrops: boolean;
    backInStock: boolean;
    promotions: boolean;
    cartReminders: boolean;
  };
  inApp: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    priceDrops: boolean;
    backInStock: boolean;
    promotions: boolean;
    system: boolean;
  };
  frequency: {
    promotional: 'daily' | 'weekly' | 'monthly' | 'never';
    priceDrops: 'immediately' | 'daily' | 'weekly' | 'never';
    backInStock: 'immediately' | 'daily' | 'never';
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // 24-hour format
    endTime: string;
    timezone: string;
  };
}

/**
 * Send Notification Request
 */
export interface ISendNotificationRequest {
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  priority?: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>;
  scheduledAt?: string;
  expiresAt?: string;
  templateId?: string;
  templateVariables?: Record<string, any>;
}

/**
 * Bulk Notification Request
 */
export interface IBulkNotificationRequest {
  userIds: string[];
  type: NotificationType;
  channel: NotificationChannel;
  priority?: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>;
  scheduledAt?: string;
  templateId?: string;
  templateVariables?: Record<string, any>;
}

/**
 * Email Notification Data
 */
export interface IEmailNotificationData {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  attachments?: {
    filename: string;
    content: string;
    contentType: string;
  }[];
  templateId?: string;
  templateVariables?: Record<string, any>;
}

/**
 * SMS Notification Data
 */
export interface ISMSNotificationData {
  to: string;
  message: string;
  from?: string;
}

/**
 * Push Notification Data
 */
export interface IPushNotificationData {
  title: string;
  message: string;
  icon?: string;
  image?: string;
  badge?: string;
  sound?: string;
  clickAction?: string;
  data?: Record<string, any>;
  actions?: {
    action: string;
    title: string;
    icon?: string;
  }[];
}

/**
 * Notification Statistics
 */
export interface INotificationStatistics {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalOpened: number;
  totalClicked: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  byChannel: {
    channel: NotificationChannel;
    sent: number;
    delivered: number;
    failed: number;
    opened: number;
    clicked: number;
  }[];
  byType: {
    type: NotificationType;
    sent: number;
    delivered: number;
    failed: number;
    opened: number;
    clicked: number;
  }[];
}

/**
 * Notification Filter Options
 */
export interface INotificationFilters {
  userId?: string;
  type?: NotificationType[];
  channel?: NotificationChannel[];
  status?: string[];
  isRead?: boolean;
  isArchived?: boolean;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date_desc' | 'date_asc' | 'priority' | 'type';
}