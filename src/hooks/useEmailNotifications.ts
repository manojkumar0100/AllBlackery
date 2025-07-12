/**
 * Custom hook for email notification management
 * Handles various email notifications throughout the app
 */

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

// TODO: Configure email service (SendGrid recommended)
// Get API key from: https://sendgrid.com/
// Add to environment variables: REACT_APP_SENDGRID_API_KEY

interface EmailNotification {
  to: string;
  subject: string;
  templateId: string;
  templateData?: Record<string, any>;
  type: 'welcome' | 'login' | 'password_reset' | 'order_confirmation' | 'order_shipped' | 'order_delivered' | 'marketing' | 'security_alert';
}

interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

export const useEmailNotifications = () => {
  const [emailHistory, setEmailHistory] = useState<EmailNotification[]>([]);

  // Send email mutation
  const sendEmailMutation = useMutation({
    mutationFn: async (emailData: EmailNotification): Promise<EmailResponse> => {
      const response = await fetch('/api/notifications/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        setEmailHistory(prev => [...prev, variables]);
      }
    },
  });

  // Predefined email templates
  const sendWelcomeEmail = useCallback(async (userEmail: string, userData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: 'Welcome to AllBlackery!',
      templateId: 'welcome',
      templateData: userData,
      type: 'welcome',
    });
  }, [sendEmailMutation]);

  const sendLoginNotification = useCallback(async (userEmail: string, loginData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: 'Login Notification - AllBlackery',
      templateId: 'login',
      templateData: loginData,
      type: 'login',
    });
  }, [sendEmailMutation]);

  const sendPasswordResetEmail = useCallback(async (userEmail: string, resetData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: 'Password Reset - AllBlackery',
      templateId: 'password_reset',
      templateData: resetData,
      type: 'password_reset',
    });
  }, [sendEmailMutation]);

  const sendOrderConfirmation = useCallback(async (userEmail: string, orderData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      templateId: 'order_confirmation',
      templateData: orderData,
      type: 'order_confirmation',
    });
  }, [sendEmailMutation]);

  const sendOrderShipped = useCallback(async (userEmail: string, shippingData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: `Order Shipped - ${shippingData.orderNumber}`,
      templateId: 'order_shipped',
      templateData: shippingData,
      type: 'order_shipped',
    });
  }, [sendEmailMutation]);

  const sendOrderDelivered = useCallback(async (userEmail: string, deliveryData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: `Order Delivered - ${deliveryData.orderNumber}`,
      templateId: 'order_delivered',
      templateData: deliveryData,
      type: 'order_delivered',
    });
  }, [sendEmailMutation]);

  const sendSecurityAlert = useCallback(async (userEmail: string, alertData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: 'Security Alert - AllBlackery',
      templateId: 'security_alert',
      templateData: alertData,
      type: 'security_alert',
    });
  }, [sendEmailMutation]);

  const sendMarketingEmail = useCallback(async (userEmail: string, marketingData: any) => {
    return await sendEmailMutation.mutateAsync({
      to: userEmail,
      subject: marketingData.subject,
      templateId: 'marketing',
      templateData: marketingData,
      type: 'marketing',
    });
  }, [sendEmailMutation]);

  return {
    sendWelcomeEmail,
    sendLoginNotification,
    sendPasswordResetEmail,
    sendOrderConfirmation,
    sendOrderShipped,
    sendOrderDelivered,
    sendSecurityAlert,
    sendMarketingEmail,
    emailHistory,
    isSending: sendEmailMutation.isPending,
    error: sendEmailMutation.error,
  };
};

export default useEmailNotifications;