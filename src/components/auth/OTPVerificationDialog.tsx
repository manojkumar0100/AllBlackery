/**
 * OTP Verification Dialog Component
 * Handles OTP input and verification with advanced UI
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Timer as TimerIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useOTP } from '../../hooks/useOTP';

interface OTPVerificationDialogProps {
  open: boolean;
  onClose: () => void;
  email?: string;
  phone?: string;
  purpose: 'registration' | 'login' | 'password_reset' | 'profile_update';
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const OTPVerificationDialog: React.FC<OTPVerificationDialogProps> = ({
  open,
  onClose,
  email,
  phone,
  purpose,
  onSuccess,
  onError,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    sendOtp,
    verifyOtp,
    resendOtp,
    formatCountdown,
    isOtpSent,
    countdown,
    canResend,
    isSending,
    isVerifying,
    sendError,
    verifyError,
  } = useOTP();

  useEffect(() => {
    if (open && !isOtpSent) {
      handleSendOtp();
    }
  }, [open]);

  useEffect(() => {
    if (sendError) {
      setError(sendError.message);
      onError?.(sendError.message);
    }
  }, [sendError, onError]);

  useEffect(() => {
    if (verifyError) {
      setError(verifyError.message);
      onError?.(verifyError.message);
    }
  }, [verifyError, onError]);

  const handleSendOtp = async () => {
    try {
      await sendOtp({
        email,
        phone,
        type: email ? 'email' : 'sms',
        purpose,
      });
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (otpCode?: string) => {
    const otpToVerify = otpCode || otp.join('');
    
    if (otpToVerify.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    try {
      const result = await verifyOtp({
        email,
        phone,
        otp: otpToVerify,
        purpose,
      });

      if (result.success) {
        onSuccess?.(result);
        onClose();
      } else {
        setError(result.message || 'Invalid verification code');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({
        email,
        phone,
        type: email ? 'email' : 'sms',
        purpose,
      });
      setError(null);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);

    if (pastedData.length === 6) {
      handleVerifyOtp(pastedData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          backdropFilter: 'blur(20px)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        color: 'white',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        pb: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SecurityIcon sx={{ color: '#00ff88' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Verify Your {email ? 'Email' : 'Phone'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.7)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            We've sent a 6-digit verification code to
          </Typography>
          <Chip
            label={email || phone}
            sx={{
              backgroundColor: 'rgba(0,255,136,0.1)',
              color: '#00ff88',
              border: '1px solid rgba(0,255,136,0.3)',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* OTP Input Fields */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                },
              }}
              sx={{
                width: 50,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff88',
                    boxShadow: '0 0 0 2px rgba(0,255,136,0.2)',
                  },
                },
              }}
            />
          ))}
        </Box>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Countdown and Resend */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          {countdown > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimerIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Resend in {formatCountdown(countdown)}
              </Typography>
            </Box>
          ) : (
            <Button
              variant="text"
              onClick={handleResendOtp}
              disabled={isSending}
              startIcon={isSending ? <CircularProgress size={16} /> : <RefreshIcon />}
              sx={{
                color: '#00ff88',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0,255,136,0.1)',
                },
              }}
            >
              Resend Code
            </Button>
          )}
        </Box>

        <Typography variant="caption" sx={{ 
          color: 'rgba(255,255,255,0.6)', 
          textAlign: 'center',
          display: 'block',
        }}>
          Didn't receive the code? Check your spam folder or try resending.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button
          onClick={onClose}
          sx={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleVerifyOtp()}
          disabled={isVerifying || otp.join('').length !== 6}
          startIcon={isVerifying ? <CircularProgress size={20} /> : undefined}
          sx={{
            background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
            color: 'black',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255,255,255,0.3)',
              color: 'rgba(0,0,0,0.5)',
            },
          }}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OTPVerificationDialog;