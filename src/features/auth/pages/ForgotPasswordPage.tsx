/**
 * Enhanced Forgot Password Page with Premium UI/UX and Advanced Effects
 * Features: Email verification, OTP verification, password reset with 2FA support
 * Design: Dark theme with glassmorphism, animations, and premium interactions
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
  Zoom,
  Slide
} from '@mui/material';
import {
  Email as EmailIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Timer as TimerIcon,
  Refresh as RefreshIcon,
  Send as SendIcon,
  VpnKey as VpnKeyIcon,
  Shield as ShieldIcon,
  MarkEmail as MarkEmailIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

// Interfaces
interface ForgotPasswordStep {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ForgotPasswordStep>({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<ForgotPasswordStep>>({});
  const [success, setSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });

  const steps = [
    {
      label: 'Email Verification',
      icon: EmailIcon,
      description: 'Enter your email address'
    },
    {
      label: 'OTP Verification',
      icon: SecurityIcon,
      description: 'Enter verification code'
    },
    {
      label: 'Reset Password',
      icon: LockIcon,
      description: 'Create new password'
    },
    {
      label: 'Success',
      icon: CheckCircleIcon,
      description: 'Password reset complete'
    }
  ];

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    };
  };

  // Handle email submission
  const handleEmailSubmit = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOtpSent(true);
      setCountdown(60);
      setActiveStep(1);
      setAlertMessage({ type: 'success', message: 'Verification code sent to your email!' });
      
      setTimeout(() => setAlertMessage({ type: '', message: '' }), 3000);
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Failed to send verification code. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    if (formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter the 6-digit verification code' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - in real app, verify with backend
      if (formData.otp === '123456') {
        setActiveStep(2);
        setAlertMessage({ type: 'success', message: 'Verification successful!' });
      } else {
        setErrors({ otp: 'Invalid verification code' });
        setAlertMessage({ type: 'error', message: 'Invalid verification code. Please try again.' });
      }
      
      setTimeout(() => setAlertMessage({ type: '', message: '' }), 3000);
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Verification failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    const passwordValidation = validatePassword(formData.newPassword);
    
    if (!passwordValidation.isValid) {
      setErrors({ newPassword: 'Password does not meet requirements' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setActiveStep(3);
      setSuccess(true);
      setAlertMessage({ type: 'success', message: 'Password reset successful!' });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Failed to reset password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountdown(60);
      setAlertMessage({ type: 'success', message: 'Verification code resent!' });
      
      setTimeout(() => setAlertMessage({ type: '', message: '' }), 3000);
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Failed to resend code. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      navigate('/sign-in');
    }
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <MarkEmailIcon sx={{ fontSize: 80, color: '#00ff88', mb: 3 }} />
            
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              Forgot Password?
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 400, mx: 'auto' }}>
              No worries! Enter your email address and we'll send you a verification code to reset your password.
            </Typography>
            
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
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
                  '&.Mui-error fieldset': {
                    borderColor: '#ff4444',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#00ff88',
                  },
                  '&.Mui-error': {
                    color: '#ff4444',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#ff4444',
                },
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleEmailSubmit}
              disabled={loading || !formData.email}
              startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
              sx={{
                py: 2,
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(0,255,136,0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(0,255,136,0.4)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(255,255,255,0.3)',
                  color: 'rgba(0,0,0,0.5)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Send Verification Code
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <VpnKeyIcon sx={{ fontSize: 80, color: '#00ff88', mb: 3 }} />
            
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              Verify Your Email
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 400, mx: 'auto' }}>
              We've sent a 6-digit verification code to <strong>{formData.email}</strong>. Enter the code below to continue.
            </Typography>
            
            <TextField
              fullWidth
              label="Verification Code"
              value={formData.otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setFormData(prev => ({ ...prev, otp: value }));
              }}
              error={!!errors.otp}
              helperText={errors.otp || 'Enter the 6-digit code sent to your email'}
              inputProps={{
                maxLength: 6,
                style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em' }
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
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
                  '&.Mui-error fieldset': {
                    borderColor: '#ff4444',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#00ff88',
                  },
                  '&.Mui-error': {
                    color: '#ff4444',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: errors.otp ? '#ff4444' : 'rgba(255,255,255,0.7)',
                },
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleOtpVerification}
              disabled={loading || formData.otp.length !== 6}
              startIcon={loading ? <CircularProgress size={20} /> : <ShieldIcon />}
              sx={{
                py: 2,
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(0,255,136,0.3)',
                mb: 2,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(0,255,136,0.4)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(255,255,255,0.3)',
                  color: 'rgba(0,0,0,0.5)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Verify Code
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Didn't receive the code?
              </Typography>
              
              {countdown > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimerIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Resend in {countdown}s
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="text"
                  onClick={handleResendOtp}
                  disabled={loading}
                  startIcon={<RefreshIcon />}
                  sx={{
                    color: '#00ff88',
                    textTransform: 'none',
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(0,255,136,0.1)',
                    }
                  }}
                >
                  Resend Code
                </Button>
              )}
            </Box>
          </Box>
        );

      case 2:
        const passwordValidation = validatePassword(formData.newPassword);
        
        return (
          <Box sx={{ textAlign: 'center' }}>
            <LockIcon sx={{ fontSize: 80, color: '#00ff88', mb: 3 }} />
            
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              Create New Password
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Choose a strong password that you haven't used before for better security.
            </Typography>
            
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
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
                  '&.Mui-error fieldset': {
                    borderColor: '#ff4444',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#00ff88',
                  },
                  '&.Mui-error': {
                    color: '#ff4444',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#ff4444',
                },
              }}
            />

            {/* Password Requirements */}
            {formData.newPassword && (
              <Paper sx={{
                background: 'rgba(255,255,255,0.05)',
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
                  Password Requirements:
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  {Object.entries({
                    'At least 8 characters': passwordValidation.requirements.minLength,
                    'One uppercase letter': passwordValidation.requirements.hasUpperCase,
                    'One lowercase letter': passwordValidation.requirements.hasLowerCase,
                    'One number': passwordValidation.requirements.hasNumbers,
                    'One special character': passwordValidation.requirements.hasSpecialChar,
                  }).map(([requirement, met]) => (
                    <Typography
                      key={requirement}
                      variant="body2"
                      sx={{
                        color: met ? '#00ff88' : 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5
                      }}
                    >
                      {met ? '✓' : '○'} {requirement}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            )}
            
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
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
                  '&.Mui-error fieldset': {
                    borderColor: '#ff4444',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#00ff88',
                  },
                  '&.Mui-error': {
                    color: '#ff4444',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#ff4444',
                },
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handlePasswordReset}
              disabled={loading || !passwordValidation.isValid || formData.newPassword !== formData.confirmPassword}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
              sx={{
                py: 2,
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(0,255,136,0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(0,255,136,0.4)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(255,255,255,0.3)',
                  color: 'rgba(0,0,0,0.5)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Reset Password
            </Button>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <CheckCircleIcon sx={{ fontSize: 120, color: '#00ff88', mb: 3 }} />
            </motion.div>
            
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              Password Reset Successful!
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Your password has been successfully reset. You can now log in with your new password.
            </Typography>
            
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/sign-in')}
              startIcon={<ArrowForwardIcon />}
              sx={{
                py: 2,
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(0,255,136,0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(0,255,136,0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Continue to Sign In
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a1a2a 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            color: 'rgba(255,255,255,0.7)',
            mb: 3,
            '&:hover': {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          {activeStep === 0 ? 'Back to Sign In' : 'Back'}
        </Button>

        {/* Alert Messages */}
        <AnimatePresence>
          {alertMessage.message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                severity={alertMessage.type as any}
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-message': {
                    fontWeight: 600
                  }
                }}
                action={
                  <IconButton
                    size="small"
                    onClick={() => setAlertMessage({ type: '', message: '' })}
                    sx={{ color: 'inherit' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                {alertMessage.message}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}>
            {/* Progress Stepper */}
            {activeStep < 3 && (
              <Box sx={{ p: 3, pb: 0 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.slice(0, 3).map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        icon={
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: index <= activeStep 
                              ? 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)'
                              : 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: index <= activeStep ? 'black' : 'rgba(255,255,255,0.7)',
                            transition: 'all 0.3s ease'
                          }}>
                            <step.icon sx={{ fontSize: 20 }} />
                          </Box>
                        }
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            '&.Mui-active': {
                              color: '#00ff88',
                            },
                            '&.Mui-completed': {
                              color: '#00ff88',
                            },
                          }
                        }}
                      >
                        {!isMobile && step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            )}

            {/* Content */}
            <CardContent sx={{ p: 4 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {getStepContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>

            {/* Footer */}
            <Box sx={{ 
              p: 3, 
              pt: 0, 
              borderTop: activeStep < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Remember your password?{' '}
                <Link
                  component={RouterLink}
                  to="/sign-in"
                  sx={{
                    color: '#00ff88',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;