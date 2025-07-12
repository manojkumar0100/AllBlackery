/**
 * Custom hook for OTP (One-Time Password) verification
 * Handles OTP generation, sending, and verification
 */

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

// TODO: For SMS OTP, configure Twilio or similar service
// Get credentials from: https://www.twilio.com/console
// Account SID and Auth Token needed

interface OTPRequest {
  email?: string;
  phone?: string;
  type: 'email' | 'sms';
  purpose: 'registration' | 'login' | 'password_reset' | 'profile_update';
}

interface OTPVerification {
  email?: string;
  phone?: string;
  otp: string;
  purpose: string;
}

interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export const useOTP = () => {
  const [countdown, setCountdown] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Send OTP mutation
  const sendOtpMutation = useMutation({
    mutationFn: async (otpRequest: OTPRequest): Promise<OTPResponse> => {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpRequest),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsOtpSent(true);
        setCountdown(data.expiresIn || 300); // 5 minutes default
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    },
  });

  // Verify OTP mutation
  const verifyOtpMutation = useMutation({
    mutationFn: async (verification: OTPVerification): Promise<OTPResponse> => {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verification),
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsOtpSent(false);
        setCountdown(0);
      }
    },
  });

  const sendOtp = useCallback(async (otpRequest: OTPRequest) => {
    return await sendOtpMutation.mutateAsync(otpRequest);
  }, [sendOtpMutation]);

  const verifyOtp = useCallback(async (verification: OTPVerification) => {
    return await verifyOtpMutation.mutateAsync(verification);
  }, [verifyOtpMutation]);

  const resendOtp = useCallback(async (otpRequest: OTPRequest) => {
    if (countdown > 0) {
      throw new Error('Please wait before resending OTP');
    }
    return await sendOtp(otpRequest);
  }, [sendOtp, countdown]);

  const formatCountdown = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    sendOtp,
    verifyOtp,
    resendOtp,
    formatCountdown,
    isOtpSent,
    countdown,
    canResend: countdown === 0,
    isSending: sendOtpMutation.isPending,
    isVerifying: verifyOtpMutation.isPending,
    sendError: sendOtpMutation.error,
    verifyError: verifyOtpMutation.error,
  };
};

export default useOTP;