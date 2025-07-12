/**
 * Stripe Payment Form Component
 * Handles credit card payment processing with Stripe Elements
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useStripePayment } from '../../hooks/useStripePayment';

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency = 'usd',
  description,
  onSuccess,
  onError,
}) => {
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { processPayment } = useStripePayment();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'rgba(255,255,255,0.05)',
        '::placeholder': {
          color: 'rgba(255,255,255,0.7)',
        },
      },
      invalid: {
        color: '#ff4444',
        iconColor: '#ff4444',
      },
    },
    hidePostalCode: false,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const result = await processPayment({
        amount: amount * 100, // Convert to cents
        currency,
        description,
        metadata: {
          saveCard: saveCard.toString(),
        },
      });

      if (result.success) {
        setSuccess(true);
        onSuccess?.(result.paymentIntent);
      } else {
        setError(result.error || 'Payment failed');
        onError?.(result.error || 'Payment failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{
          background: 'linear-gradient(145deg, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.05) 100%)',
          border: '1px solid rgba(0,255,136,0.3)',
          borderRadius: 3,
          textAlign: 'center',
          p: 3,
        }}>
          <SecurityIcon sx={{ fontSize: 60, color: '#00ff88', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 600, mb: 1 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Your payment has been processed successfully.
          </Typography>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card sx={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 3,
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CreditCardIcon sx={{ color: '#00ff88', mr: 2 }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Payment Details
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Payment Amount */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            p: 2,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Total Amount
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              ${amount.toFixed(2)}
            </Typography>
          </Box>

          {/* Card Element */}
          <Box sx={{
            p: 2,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.1)',
            mb: 3,
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              Card Information
            </Typography>
            <CardElement options={cardElementOptions} />
          </Box>

          {/* Save Card Option */}
          <FormControlLabel
            control={
              <Switch
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00ff88',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#00ff88',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Save this card for future payments
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : <LockIcon />}
            sx={{
              py: 2,
              background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
              color: 'black',
              fontWeight: 600,
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
            {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>

          {/* Security Notice */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <SecurityIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', mr: 1 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Your payment information is secure and encrypted
            </Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default StripePaymentForm;