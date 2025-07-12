/**
 * Advanced Toast Notification Component
 * Beautiful toast notifications with animations and effects
 */

import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertColor,
  Box,
  Typography,
  IconButton,
  Fade,
  Slide,
  useTheme,
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Error,
  Warning,
  Info,
  Celebration,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Advanced animations
const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const sparkleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
`;

interface ToastProps {
  open?: boolean;
  message?: string;
  severity?: AlertColor;
  duration?: number;
  onClose?: () => void;
  showIcon?: boolean;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Advanced Toast Component with stunning animations
 * @param open - Whether toast is open
 * @param message - Toast message
 * @param severity - Toast severity level
 * @param duration - Auto-hide duration
 * @param onClose - Close handler
 * @param showIcon - Whether to show icon
 * @param showAction - Whether to show action button
 * @param actionLabel - Action button label
 * @param onAction - Action button handler
 */
const Toast: React.FC<ToastProps> = ({
  open = false,
  message = '',
  severity = 'info',
  duration = 4000,
  onClose,
  showIcon = true,
  showAction = false,
  actionLabel = 'Action',
  onAction,
}) => {
  const theme = useTheme();
  const [showSparkles, setShowSparkles] = useState(false);

  // Show sparkles for success messages
  useEffect(() => {
    if (open && severity === 'success') {
      setShowSparkles(true);
      const timer = setTimeout(() => setShowSparkles(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [open, severity]);

  const getIcon = () => {
    switch (severity) {
      case 'success':
        return <CheckCircle />;
      case 'error':
        return <Error />;
      case 'warning':
        return <Warning />;
      case 'info':
        return <Info />;
      default:
        return <Info />;
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case 'success':
        return '#00ff88';
      case 'error':
        return '#ff4444';
      case 'warning':
        return '#ffaa00';
      case 'info':
        return '#4ECDC4';
      default:
        return '#4ECDC4';
    }
  };

  const getSeverityBackground = () => {
    switch (severity) {
      case 'success':
        return 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 106, 0.1))';
      case 'error':
        return 'linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(255, 102, 102, 0.1))';
      case 'warning':
        return 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(255, 193, 7, 0.1))';
      case 'info':
        return 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(69, 183, 209, 0.1))';
      default:
        return 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(69, 183, 209, 0.1))';
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'left' }}
      >
        <Alert
          severity={severity}
          onClose={onClose}
          sx={{
            minWidth: 300,
            maxWidth: 500,
            borderRadius: 3,
            background: getSeverityBackground(),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${getSeverityColor()}30`,
            color: '#ffffff',
            animation: `${slideInRight} 0.5s ease-out`,
            position: 'relative',
            overflow: 'hidden',
            '& .MuiAlert-icon': {
              color: getSeverityColor(),
              fontSize: 24,
              animation: severity === 'success' ? `${pulseAnimation} 0.8s ease-out` : 'none',
            },
            '& .MuiAlert-message': {
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '1rem',
            },
            '& .MuiAlert-action': {
              color: '#ffffff',
              '& .MuiIconButton-root': {
                color: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${getSeverityColor()}, ${getSeverityColor()}80)`,
            },
          }}
          action={
            showAction && (
              <IconButton
                onClick={onAction}
                sx={{
                  color: '#ffffff',
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {actionLabel}
              </IconButton>
            )
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showIcon && getIcon()}
            <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500 }}>
              {message}
            </Typography>
          </Box>
        </Alert>
      </Snackbar>

      {/* Sparkle Animation for Success */}
      {showSparkles && severity === 'success' && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 40,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 8,
                height: 8,
                background: '#ffd700',
                borderRadius: '50%',
                animation: `${sparkleAnimation} 1s ease-out`,
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${i * 45}deg) translateY(-30px)`,
              }}
            />
          ))}
        </Box>
      )}
    </>
  );
};

// Toast Provider Context
interface ToastContextType {
  showToast: (message: string, severity?: AlertColor, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = React.createContext<ToastContextType>({
  showToast: () => {},
  showSuccess: () => {},
  showError: () => {},
  showWarning: () => {},
  showInfo: () => {},
});

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    severity: AlertColor;
    duration: number;
  }>>([]);

  const showToast = (message: string, severity: AlertColor = 'info', duration: number = 4000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, severity, duration }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const showSuccess = (message: string, duration: number = 4000) => {
    showToast(message, 'success', duration);
  };

  const showError = (message: string, duration: number = 5000) => {
    showToast(message, 'error', duration);
  };

  const showWarning = (message: string, duration: number = 4000) => {
    showToast(message, 'warning', duration);
  };

  const showInfo = (message: string, duration: number = 4000) => {
    showToast(message, 'info', duration);
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          open={true}
          message={toast.message}
          severity={toast.severity}
          duration={toast.duration}
          onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default Toast;