/**
 * Google Sign-In Button Component
 * Handles Google OAuth authentication with premium UI
 */

import React from 'react';
import {
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

interface GoogleSignInButtonProps {
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  fullWidth = true,
  size = 'large',
  variant = 'outlined',
  disabled = false,
  onSuccess,
  onError,
}) => {
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google sign-in failed';
      onError?.(errorMessage);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        onClick={handleGoogleSignIn}
        disabled={disabled || isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} sx={{ color: '#4285f4' }} />
          ) : (
            <GoogleIcon sx={{ color: '#4285f4' }} />
          )
        }
        sx={{
          py: size === 'large' ? 2 : 1.5,
          px: 3,
          borderColor: 'rgba(255,255,255,0.3)',
          color: 'white',
          fontWeight: 600,
          fontSize: size === 'large' ? '1.1rem' : '1rem',
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.5)',
            backgroundColor: 'rgba(255,255,255,0.1)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(66,133,244,0.3)',
          },
          '&.Mui-disabled': {
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            backgroundColor: 'rgba(255,255,255,0.02)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </Button>
    </motion.div>
  );
};

export default GoogleSignInButton;