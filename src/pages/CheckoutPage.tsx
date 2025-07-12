/**
 * Enhanced Checkout Page with Premium UI/UX and Advanced Effects
 * Features: Multi-step checkout, payment integration, order summary, address management
 * Design: Dark theme with glassmorphism, animations, and premium interactions
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Paper,
  Alert,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  alpha,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Zoom,
  Slide
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as PayPalIcon,
  Apple as AppleIcon,
  Google as GoogleIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  LocalOffer as OfferIcon,
  Receipt as ReceiptIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  ExpandMore as ExpandMoreIcon,
  Lock as LockIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  Timer as TimerIcon,
  FlashOn as FlashIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

// Mock data interfaces
interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  subtotal: number;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple' | 'google';
  cardNumber?: string;
  expiryDate?: string;
  holderName?: string;
  isDefault: boolean;
}

const CheckoutPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0
  });

  // Mock cart data
  const mockCartItems: CartItem[] = [
    {
      id: '1',
      productId: '1',
      productName: 'Premium Black Leather Jacket',
      productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      price: 299.99,
      quantity: 1,
      size: 'M',
      color: 'Black',
      subtotal: 299.99
    },
    {
      id: '2',
      productId: '2',
      productName: 'Elegant Black Dress',
      productImage: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400',
      price: 189.99,
      quantity: 1,
      size: 'S',
      color: 'Black',
      subtotal: 189.99
    }
  ];

  // Mock addresses
  const mockAddresses: Address[] = [
    {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      firstName: 'John',
      lastName: 'Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ];

  // Mock payment methods
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/25',
      holderName: 'John Doe',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      isDefault: false
    }
  ];

  const steps = [
    {
      label: 'Cart Review',
      icon: CartIcon,
      description: 'Review your items'
    },
    {
      label: 'Shipping',
      icon: ShippingIcon,
      description: 'Delivery address'
    },
    {
      label: 'Payment',
      icon: PaymentIcon,
      description: 'Payment method'
    },
    {
      label: 'Review',
      icon: CheckCircleIcon,
      description: 'Final review'
    }
  ];

  // Initialize data
  useEffect(() => {
    setCartItems(mockCartItems);
    setAddresses(mockAddresses);
    setPaymentMethods(mockPaymentMethods);
    setSelectedAddress(mockAddresses.find(a => a.isDefault)?.id || '');
    setSelectedPayment(mockPaymentMethods.find(p => p.isDefault)?.id || '');
  }, []);

  // Calculate order summary
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const discount = promoApplied ? subtotal * 0.1 : 0;
    const total = subtotal + shipping + tax - discount;

    setOrderSummary({
      subtotal,
      shipping,
      tax,
      discount,
      total
    });
  }, [cartItems, promoApplied]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    }, 2000);
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CartReviewStep items={cartItems} />;
      case 1:
        return (
          <ShippingStep
            addresses={addresses}
            selectedAddress={selectedAddress}
            onAddressChange={setSelectedAddress}
            onAddAddress={() => setShowAddressDialog(true)}
          />
        );
      case 2:
        return (
          <PaymentStep
            paymentMethods={paymentMethods}
            selectedPayment={selectedPayment}
            onPaymentChange={setSelectedPayment}
            onAddPayment={() => setShowPaymentDialog(true)}
          />
        );
      case 3:
        return (
          <ReviewStep
            items={cartItems}
            address={addresses.find(a => a.id === selectedAddress)}
            payment={paymentMethods.find(p => p.id === selectedPayment)}
            summary={orderSummary}
          />
        );
      default:
        return null;
    }
  };

  if (orderPlaced) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: 'white'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{
            maxWidth: 500,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            textAlign: 'center',
            p: 4
          }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, color: '#00ff88', mb: 2 }} />
            </motion.div>
            
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              Order Placed Successfully!
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
              Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
            </Typography>
            
            <Button
              variant="contained"
              onClick={() => navigate('/orders')}
              sx={{
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                color: 'black',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              View Order History
            </Button>
          </Card>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      color: 'white',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/cart')}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              mb: 2,
              '&:hover': {
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Back to Cart
          </Button>
          
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 1
          }}>
            Checkout
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1rem'
          }}>
            Complete your order with our secure checkout process
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Card sx={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          mb: 4,
          p: 3
        }}>
          <Stepper activeStep={activeStep} alternativeLabel={!isMobile}>
            {steps.map((step, index) => (
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
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }
                  }}
                >
                  {step.label}
                  {!isMobile && (
                    <Typography variant="caption" sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      display: 'block',
                      mt: 0.5
                    }}>
                      {step.description}
                    </Typography>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Left Column - Step Content */}
          <Grid item xs={12} md={8}>
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
              p: 4
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {getStepContent(activeStep)}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 4,
                pt: 3,
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(255,255,255,0.3)',
                    }
                  }}
                >
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                    color: 'black',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                      transform: 'translateY(-2px)',
                    },
                    '&.Mui-disabled': {
                      background: 'rgba(255,255,255,0.3)',
                      color: 'rgba(0,0,0,0.5)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            <OrderSummary
              summary={orderSummary}
              promoCode={promoCode}
              promoApplied={promoApplied}
              onPromoChange={setPromoCode}
              onApplyPromo={handleApplyPromo}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Processing your order...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};

// Step Components
const CartReviewStep: React.FC<{ items: CartItem[] }> = ({ items }) => (
  <Box>
    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
      Review Your Items
    </Typography>
    
    <List>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ListItem sx={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            mb: 2,
            p: 2
          }}>
            <ListItemAvatar>
              <Avatar
                src={item.productImage}
                alt={item.productName}
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
            </ListItemAvatar>
            
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                  {item.productName}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  {item.size && (
                    <Chip label={`Size: ${item.size}`} size="small" sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.7rem'
                    }} />
                  )}
                  {item.color && (
                    <Chip label={`Color: ${item.color}`} size="small" sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.7rem'
                    }} />
                  )}
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Qty: {item.quantity}
                  </Typography>
                </Box>
              }
            />
            
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              ${item.subtotal.toFixed(2)}
            </Typography>
          </ListItem>
        </motion.div>
      ))}
    </List>
  </Box>
);

const ShippingStep: React.FC<{
  addresses: Address[];
  selectedAddress: string;
  onAddressChange: (id: string) => void;
  onAddAddress: () => void;
}> = ({ addresses, selectedAddress, onAddressChange, onAddAddress }) => (
  <Box>
    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
      Shipping Address
    </Typography>
    
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <RadioGroup
        value={selectedAddress}
        onChange={(e) => onAddressChange(e.target.value)}
      >
        {addresses.map((address) => (
          <FormControlLabel
            key={address.id}
            value={address.id}
            control={<Radio sx={{ color: 'white' }} />}
            label={
              <Card sx={{
                background: 'rgba(255,255,255,0.05)',
                border: selectedAddress === address.id 
                  ? '2px solid #00ff88' 
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                p: 2,
                ml: 1,
                width: '100%',
                transition: 'all 0.3s ease'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <HomeIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                  </Typography>
                  {address.isDefault && (
                    <Chip label="Default" size="small" color="primary" />
                  )}
                </Box>
                
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {address.firstName} {address.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {address.street}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {address.city}, {address.state} {address.zipCode}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {address.phone}
                </Typography>
              </Card>
            }
            sx={{ alignItems: 'flex-start', mb: 2 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
    
    <Button
      onClick={onAddAddress}
      startIcon={<AddIcon />}
      sx={{
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: 2,
        mt: 2,
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderColor: 'white',
        }
      }}
    >
      Add New Address
    </Button>
  </Box>
);

const PaymentStep: React.FC<{
  paymentMethods: PaymentMethod[];
  selectedPayment: string;
  onPaymentChange: (id: string) => void;
  onAddPayment: () => void;
}> = ({ paymentMethods, selectedPayment, onPaymentChange, onAddPayment }) => (
  <Box>
    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
      Payment Method
    </Typography>
    
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <RadioGroup
        value={selectedPayment}
        onChange={(e) => onPaymentChange(e.target.value)}
      >
        {paymentMethods.map((payment) => (
          <FormControlLabel
            key={payment.id}
            value={payment.id}
            control={<Radio sx={{ color: 'white' }} />}
            label={
              <Card sx={{
                background: 'rgba(255,255,255,0.05)',
                border: selectedPayment === payment.id 
                  ? '2px solid #00ff88' 
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                p: 2,
                ml: 1,
                width: '100%',
                transition: 'all 0.3s ease'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {payment.type === 'card' && <CreditCardIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />}
                  {payment.type === 'paypal' && <PayPalIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />}
                  {payment.type === 'apple' && <AppleIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />}
                  {payment.type === 'google' && <GoogleIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />}
                  
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                    {payment.type === 'card' ? 'Credit Card' : 
                     payment.type === 'paypal' ? 'PayPal' :
                     payment.type === 'apple' ? 'Apple Pay' : 'Google Pay'}
                  </Typography>
                  
                  {payment.isDefault && (
                    <Chip label="Default" size="small" color="primary" />
                  )}
                </Box>
                
                {payment.type === 'card' && (
                  <>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {payment.cardNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {payment.holderName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Expires: {payment.expiryDate}
                    </Typography>
                  </>
                )}
                
                {payment.type === 'paypal' && (
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    john.doe@example.com
                  </Typography>
                )}
              </Card>
            }
            sx={{ alignItems: 'flex-start', mb: 2 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
    
    <Button
      onClick={onAddPayment}
      startIcon={<AddIcon />}
      sx={{
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: 2,
        mt: 2,
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderColor: 'white',
        }
      }}
    >
      Add New Payment Method
    </Button>
  </Box>
);

const ReviewStep: React.FC<{
  items: CartItem[];
  address?: Address;
  payment?: PaymentMethod;
  summary: any;
}> = ({ items, address, payment, summary }) => (
  <Box>
    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
      Order Review
    </Typography>
    
    {/* Items Summary */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
        Items ({items.length})
      </Typography>
      {items.map((item) => (
        <Box key={item.id} sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {item.productName} x {item.quantity}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
            ${item.subtotal.toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
    
    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
    
    {/* Address Summary */}
    {address && (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
          Shipping Address
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {address.firstName} {address.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {address.street}, {address.city}, {address.state} {address.zipCode}
        </Typography>
      </Box>
    )}
    
    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
    
    {/* Payment Summary */}
    {payment && (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
          Payment Method
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {payment.type === 'card' ? `Card ending in ${payment.cardNumber?.slice(-4)}` : 
           payment.type === 'paypal' ? 'PayPal' :
           payment.type === 'apple' ? 'Apple Pay' : 'Google Pay'}
        </Typography>
      </Box>
    )}
  </Box>
);

const OrderSummary: React.FC<{
  summary: any;
  promoCode: string;
  promoApplied: boolean;
  onPromoChange: (code: string) => void;
  onApplyPromo: () => void;
}> = ({ summary, promoCode, promoApplied, onPromoChange, onApplyPromo }) => (
  <Card sx={{
    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3,
    p: 3,
    position: 'sticky',
    top: 20
  }}>
    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
      Order Summary
    </Typography>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
        Subtotal
      </Typography>
      <Typography variant="body2" sx={{ color: 'white' }}>
        ${summary.subtotal.toFixed(2)}
      </Typography>
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
        Shipping
      </Typography>
      <Typography variant="body2" sx={{ color: 'white' }}>
        {summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}
      </Typography>
    </Box>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
        Tax
      </Typography>
      <Typography variant="body2" sx={{ color: 'white' }}>
        ${summary.tax.toFixed(2)}
      </Typography>
    </Box>
    
    {summary.discount > 0 && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#00ff88' }}>
          Discount
        </Typography>
        <Typography variant="body2" sx={{ color: '#00ff88' }}>
          -${summary.discount.toFixed(2)}
        </Typography>
      </Box>
    )}
    
    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
        Total
      </Typography>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
        ${summary.total.toFixed(2)}
      </Typography>
    </Box>
    
    {/* Promo Code */}
    {!promoApplied && (
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
          Promo Code
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => onPromoChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
          <Button
            variant="outlined"
            onClick={onApplyPromo}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    )}
    
    {promoApplied && (
      <Alert severity="success" sx={{ mt: 2 }}>
        Promo code applied! You saved ${summary.discount.toFixed(2)}
      </Alert>
    )}
  </Card>
);

export default CheckoutPage;