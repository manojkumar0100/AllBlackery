/**
 * Advanced Card Component
 * Beautiful card with hover effects and animations
 */

import React from 'react';
import { 
  Card as MuiCard, 
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import { keyframes } from '@mui/system';

// Advanced animation keyframes
const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 8px 40px rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  }
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

interface CardProps {
  variant?: 'elevated' | 'outlined' | 'glass' | 'gradient' | 'shimmer';
  hover?: 'lift' | 'glow' | 'scale' | 'rotate' | 'float';
  image?: string;
  imageHeight?: number;
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  clickable?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  sx?: any;
  onClick?: () => void;
}

/**
 * Advanced Card Component with stunning visual effects
 * @param variant - Card style variant
 * @param hover - Hover animation effect
 * @param image - Card image URL
 * @param imageHeight - Height of the image
 * @param title - Card title
 * @param subtitle - Card subtitle
 * @param content - Card content
 * @param actions - Card actions
 * @param clickable - Whether card is clickable
 * @param loading - Whether card is in loading state
 * @param children - Card children
 * @param sx - Additional styles
 * @param onClick - Click handler
 */
const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  hover = 'lift',
  image,
  imageHeight = 200,
  title,
  subtitle,
  content,
  actions,
  clickable = false,
  loading = false,
  children,
  sx,
  onClick,
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        };
      
      case 'outlined':
        return {
          background: 'transparent',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: 'none',
        };
      
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        };
      
      case 'gradient':
        return {
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)',
          backgroundSize: '400% 400%',
          border: 'none',
          animation: `${shimmerAnimation} 3s ease-in-out infinite`,
          color: '#ffffff',
        };
      
      case 'shimmer':
        return {
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
          backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: `${shimmerAnimation} 2s infinite`,
        };
      
      default:
        return {};
    }
  };

  const getHoverStyles = () => {
    switch (hover) {
      case 'lift':
        return {
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          },
        };
      
      case 'glow':
        return {
          '&:hover': {
            animation: `${glowAnimation} 2s ease-in-out infinite`,
          },
        };
      
      case 'scale':
        return {
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          },
        };
      
      case 'rotate':
        return {
          '&:hover': {
            transform: 'rotate(2deg) scale(1.02)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          },
        };
      
      case 'float':
        return {
          '&:hover': {
            animation: `${floatAnimation} 3s ease-in-out infinite`,
          },
        };
      
      default:
        return {};
    }
  };

  const getLoadingOverlay = () => {
    if (!loading) return null;
    
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'inherit',
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
      </Box>
    );
  };

  return (
    <MuiCard
      onClick={clickable ? onClick : undefined}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: clickable ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...getVariantStyles(),
        ...getHoverStyles(),
        ...sx,
      }}
    >
      {getLoadingOverlay()}
      
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      )}
      
      {(title || subtitle || content) && (
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {title && (
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: '#ffffff',
                mb: 1,
              }}
            >
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 2,
              }}
            >
              {subtitle}
            </Typography>
          )}
          
          {content && (
            <Box sx={{ color: '#ffffff' }}>
              {content}
            </Box>
          )}
        </CardContent>
      )}
      
      {children && (
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </CardContent>
      )}
      
      {actions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;