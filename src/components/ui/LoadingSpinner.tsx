/**
 * Advanced Loading Spinner Component
 * Beautiful animated loading spinner with multiple variants
 */

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Advanced animation keyframes
const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowAnimation = keyframes`
  0% {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
  }
  100% {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
`;

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  variant?: 'circular' | 'pulse' | 'float' | 'glow';
  fullScreen?: boolean;
  overlay?: boolean;
}

/**
 * Advanced Loading Spinner with beautiful animations
 * @param size - Size of the spinner
 * @param message - Loading message to display
 * @param variant - Animation variant
 * @param fullScreen - Whether to show fullscreen
 * @param overlay - Whether to show overlay
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'Loading...',
  variant = 'circular',
  fullScreen = false,
  overlay = false,
}) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const getSpinnerComponent = () => {
    switch (variant) {
      case 'pulse':
        return (
          <Box
            sx={{
              width: sizeMap[size],
              height: sizeMap[size],
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ffffff, #cccccc)',
              animation: `${pulseAnimation} 2s infinite`,
            }}
          />
        );
      
      case 'float':
        return (
          <Box
            sx={{
              animation: `${floatAnimation} 3s ease-in-out infinite`,
            }}
          >
            <CircularProgress
              size={sizeMap[size]}
              sx={{
                color: '#ffffff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
          </Box>
        );
      
      case 'glow':
        return (
          <CircularProgress
            size={sizeMap[size]}
            sx={{
              color: '#ffffff',
              animation: `${glowAnimation} 2s ease-in-out infinite`,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        );
      
      default:
        return (
          <CircularProgress
            size={sizeMap[size]}
            sx={{
              color: '#ffffff',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        );
    }
  };

  const containerSx = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: overlay ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    backdropFilter: overlay ? 'blur(10px)' : 'none',
    zIndex: 9999,
  } : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  };

  return (
    <Box sx={containerSx}>
      {getSpinnerComponent()}
      {message && (
        <Typography
          variant="body1"
          sx={{
            color: '#ffffff',
            fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.25rem' : '1rem',
            fontWeight: 500,
            marginTop: 2,
            textAlign: 'center',
            opacity: 0.9,
            animation: `${pulseAnimation} 2s infinite`,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;