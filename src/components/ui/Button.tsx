/**
 * Advanced Button Component
 * Customizable button with multiple variants and animations
 */

import React from 'react';
import { 
  Button as MuiButton, 
  ButtonProps as MuiButtonProps, 
  CircularProgress,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import { keyframes } from '@mui/system';

// Advanced animation keyframes
const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  20% {
    transform: scale(0.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'shimmer' | 'glass';
  loading?: boolean;
  loadingText?: string;
  animation?: 'none' | 'pulse' | 'bounce' | 'glow';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Advanced Button Component with stunning animations and effects
 * @param variant - Button style variant
 * @param loading - Whether button is in loading state
 * @param loadingText - Text to show when loading
 * @param animation - Animation effect
 * @param icon - Icon to display
 * @param iconPosition - Position of icon
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  loadingText = 'Loading...',
  animation = 'none',
  icon,
  iconPosition = 'left',
  children,
  disabled,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #333333 0%, #000000 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          },
        };
      
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          color: '#000000',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        };
      
      case 'outline':
        return {
          background: 'transparent',
          color: '#ffffff',
          border: '2px solid #ffffff',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#ffffff',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
          },
        };
      
      case 'ghost':
        return {
          background: 'transparent',
          color: '#ffffff',
          border: 'none',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
        };
      
      case 'gradient':
        return {
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)',
          backgroundSize: '400% 400%',
          color: '#ffffff',
          border: 'none',
          animation: `${shimmerAnimation} 3s ease-in-out infinite`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          },
        };
      
      case 'shimmer':
        return {
          background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
          backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          color: '#ffffff',
          border: 'none',
          animation: `${shimmerAnimation} 2s infinite`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          },
        };
      
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          },
        };
      
      default:
        return {};
    }
  };

  const getAnimationStyles = () => {
    switch (animation) {
      case 'pulse':
        return {
          animation: `${pulseAnimation} 2s infinite`,
        };
      case 'bounce':
        return {
          '&:hover': {
            animation: 'bounce 0.6s',
          },
        };
      case 'glow':
        return {
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
          },
        };
      default:
        return {};
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress
            size={16}
            sx={{
              color: 'inherit',
            }}
          />
          {loadingText}
        </Box>
      );
    }

    if (icon) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {iconPosition === 'left' && icon}
          {children}
          {iconPosition === 'right' && icon}
        </Box>
      );
    }

    return children;
  };

  return (
    <MuiButton
      disabled={disabled || loading}
      sx={{
        borderRadius: 3,
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          transition: 'all 0.3s ease',
          borderRadius: 'inherit',
          zIndex: 1,
        },
        '&:hover::before': {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        '& .MuiButton-startIcon, & .MuiButton-endIcon': {
          zIndex: 2,
        },
        '& .MuiButton-label': {
          zIndex: 2,
        },
        ...getVariantStyles(),
        ...getAnimationStyles(),
        ...sx,
      }}
      {...props}
    >
      {renderContent()}
    </MuiButton>
  );
};

export default Button;