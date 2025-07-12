/**
 * Enhanced Cart Page with Advanced UI/UX and Amazon-like Features
 * Features: Cart management, product suggestions, saved items, promo codes, shipping options
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  Chip,
  Avatar,
  Rating,
  Stack,
  Paper,
  Alert,
  Skeleton,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Badge,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon,
  LocalOffer as OfferIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  Verified as VerifiedIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  LocalAtm as PaymentIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  PersonPin as PersonIcon,
  Lock as LockIcon,
  Shield as ShieldIcon,
  Celebration as CelebrationIcon,
  Discount as DiscountIcon,
  FlashOn as FlashIcon,
  Timer as TimerIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
  images?: string[];
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockQuantity: number;
  isOnSale: boolean;
  isFreeShipping: boolean;
  estimatedDelivery: string;
  category: string;
}

interface SuggestedItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  reason: string; // Why it's suggested
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  maxDiscount?: number;
  description: string;
  expiresAt?: string;
  isValid: boolean;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  isRecommended?: boolean;
}

const CartPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // State management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [suggestedItems, setSuggestedItems] = useState<SuggestedItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [showPromoDialog, setShowPromoDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveForLaterItem, setSaveForLaterItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({
    open: false,
    message: '',
    severity: 'info'
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<SuggestedItem[]>([]);

  // Mock data
  const mockCartItems: CartItem[] = [
    {
      id: '1',
      productId: '1',
      name: 'Premium Black Leather Jacket',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      quantity: 1,
      size: 'M',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
      brand: 'AllBlackery',
      rating: 4.8,
      reviews: 127,
      inStock: true,
      stockQuantity: 5,
      isOnSale: true,
      isFreeShipping: true,
      estimatedDelivery: '2-3 business days',
      category: 'Jackets'
    },
    {
      id: '2',
      productId: '2',
      name: 'Elegant Black Dress',
      price: 189.99,
      originalPrice: 249.99,
      discount: 24,
      quantity: 2,
      size: 'S',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400',
      images: ['https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400'],
      brand: 'AllBlackery',
      rating: 4.9,
      reviews: 89,
      inStock: true,
      stockQuantity: 3,
      isOnSale: false,
      isFreeShipping: false,
      estimatedDelivery: '3-5 business days',
      category: 'Dresses'
    },
    {
      id: '3',
      productId: '3',
      name: 'Luxury Black Handbag',
      price: 249.99,
      originalPrice: 329.99,
      discount: 24,
      quantity: 1,
      size: 'One Size',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
      brand: 'AllBlackery',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      stockQuantity: 8,
      isOnSale: true,
      isFreeShipping: true,
      estimatedDelivery: '1-2 business days',
      category: 'Bags'
    }
  ];

  const mockSuggestedItems: SuggestedItem[] = [
    {
      id: '4',
      name: 'Designer Black Boots',
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
      rating: 4.7,
      reviews: 156,
      category: 'Shoes',
      brand: 'AllBlackery',
      reason: 'Frequently bought together'
    },
    {
      id: '5',
      name: 'Black Statement Necklace',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
      rating: 4.6,
      reviews: 78,
      category: 'Accessories',
      brand: 'AllBlackery',
      reason: 'Perfect complement to your style'
    },
    {
      id: '6',
      name: 'Premium Black Scarf',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1601762417128-b7f0c4e56b0a?w=400',
      rating: 4.5,
      reviews: 92,
      category: 'Accessories',
      brand: 'AllBlackery',
      reason: 'Customers who bought this also bought'
    }
  ];

  const availablePromos: PromoCode[] = [
    {
      code: 'SAVE20',
      discount: 20,
      type: 'percentage',
      minAmount: 100,
      maxDiscount: 50,
      description: '20% off orders over $100',
      expiresAt: '2024-12-31',
      isValid: true
    },
    {
      code: 'FREESHIP',
      discount: 15,
      type: 'fixed',
      description: 'Free shipping on any order',
      isValid: true
    },
    {
      code: 'FIRST50',
      discount: 50,
      type: 'fixed',
      minAmount: 200,
      description: '$50 off your first order over $200',
      isValid: true
    }
  ];

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 9.99,
      estimatedDays: '5-7 business days',
      description: 'Reliable delivery at a great price',
      icon: ShippingIcon,
      features: ['Package tracking', 'Insurance included']
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 19.99,
      estimatedDays: '2-3 business days',
      description: 'Fast delivery for urgent orders',
      icon: FlashIcon,
      features: ['Priority handling', 'Package tracking', 'Insurance included'],
      isRecommended: true
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 39.99,
      estimatedDays: '1 business day',
      description: 'Next-day delivery guaranteed',
      icon: TimerIcon,
      features: ['Next-day delivery', 'Priority handling', 'Real-time tracking', 'Full insurance']
    }
  ];

  const checkoutSteps = ['Cart', 'Shipping', 'Payment', 'Review'];

  // Load cart data
  useEffect(() => {
    const loadCartData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCartItems(mockCartItems);
        setSuggestedItems(mockSuggestedItems);
        setLoading(false);
      }, 1000);
    };

    loadCartData();
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const promoDiscount = appliedPromo ? 
    (appliedPromo.type === 'percentage' ? 
      Math.min(subtotal * (appliedPromo.discount / 100), appliedPromo.maxDiscount || Infinity) : 
      appliedPromo.discount) : 0;
  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const shippingCost = selectedShippingOption?.price || 0;
  const tax = (subtotal - promoDiscount) * 0.08; // 8% tax
  const total = subtotal - promoDiscount + shippingCost + tax;

  // Handle quantity updates
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setUpdating(itemId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCartItems(items => 
        items.map(item => 
          item.id === itemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      
      setSnackbar({
        open: true,
        message: 'Quantity updated successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update quantity',
        severity: 'error'
      });
    } finally {
      setUpdating(null);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId: string) => {
    setUpdating(itemId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCartItems(items => items.filter(item => item.id !== itemId));
      
      setSnackbar({
        open: true,
        message: 'Item removed from cart',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to remove item',
        severity: 'error'
      });
    } finally {
      setUpdating(null);
    }
  };

  // Save item for later
  const saveForLater = async (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSavedItems(items => [...items, item]);
      setCartItems(items => items.filter(item => item.id !== itemId));
      
      setSnackbar({
        open: true,
        message: 'Item saved for later',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save item',
        severity: 'error'
      });
    }
  };

  // Apply promo code
  const applyPromoCode = async () => {
    if (!promoCode) return;

    try {
      // Simulate API call to validate promo code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const promo = availablePromos.find(p => p.code === promoCode.toUpperCase());
      
      if (promo && promo.isValid) {
        if (promo.minAmount && subtotal < promo.minAmount) {
          setSnackbar({
            open: true,
            message: `Minimum order amount of $${promo.minAmount} required`,
            severity: 'warning'
          });
          return;
        }
        
        setAppliedPromo(promo);
        setPromoCode('');
        setSnackbar({
          open: true,
          message: 'Promo code applied successfully!',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Invalid or expired promo code',
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to apply promo code',
        severity: 'error'
      });
    }
  };

  // Add suggested item to cart
  const addSuggestedItem = async (suggestedItem: SuggestedItem) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCartItem: CartItem = {
        id: Date.now().toString(),
        productId: suggestedItem.id,
        name: suggestedItem.name,
        price: suggestedItem.price,
        originalPrice: suggestedItem.originalPrice,
        discount: suggestedItem.discount,
        quantity: 1,
        size: 'M', // Default size
        color: 'Black', // Default color
        image: suggestedItem.image,
        brand: suggestedItem.brand,
        rating: suggestedItem.rating,
        reviews: suggestedItem.reviews,
        inStock: true,
        stockQuantity: 10,
        isOnSale: !!suggestedItem.discount,
        isFreeShipping: true,
        estimatedDelivery: '2-3 business days',
        category: suggestedItem.category
      };
      
      setCartItems(items => [...items, newCartItem]);
      
      setSnackbar({
        open: true,
        message: 'Item added to cart',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add item',
        severity: 'error'
      });
    }
  };

  // Toggle wishlist
  const toggleWishlist = (productId: string) => {
    setWishlistItems(items => 
      items.includes(productId) 
        ? items.filter(id => id !== productId)
        : [...items, productId]
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {[1, 2, 3].map((i) => (
              <Card key={i} sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={120} />
                  </Grid>
                  <Grid item xs={9}>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="40%" />
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" height={40} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="rectangular" height={50} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 4 }}>
            <CartIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
            <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
              Your Cart is Empty
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                py: 2,
                px: 4,
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                color: 'black',
                fontWeight: 600,
                fontSize: '1.1rem',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Shopping
            </Button>
          </Box>
        </motion.div>
      </Container>
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Shopping Cart
            </Typography>
            
            <Chip
              label={`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`}
              sx={{
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                color: 'black',
                fontWeight: 600,
              }}
            />
          </Box>
        </motion.div>

        {/* Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card sx={{ 
            mb: 4,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <CardContent>
              <Stepper activeStep={currentStep} alternativeLabel>
                {checkoutSteps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          color: 'rgba(255,255,255,0.7)',
                        },
                        '& .MuiStepLabel-label.Mui-active': {
                          color: 'white',
                        },
                        '& .MuiStepIcon-root': {
                          color: 'rgba(255,255,255,0.3)',
                        },
                        '& .MuiStepIcon-root.Mui-active': {
                          color: 'white',
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </motion.div>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack spacing={3}>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card sx={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      },
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                          {/* Product Image */}
                          <Grid item xs={12} sm={3}>
                            <Box sx={{ position: 'relative' }}>
                              <CardMedia
                                component="img"
                                height="150"
                                image={item.image}
                                alt={item.name}
                                sx={{
                                  borderRadius: 2,
                                  objectFit: 'cover',
                                  transition: 'transform 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                  },
                                }}
                              />
                              
                              {/* Sale Badge */}
                              {item.isOnSale && (
                                <Chip
                                  label={`-${item.discount}%`}
                                  size="small"
                                  sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: '#ff4444',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                  }}
                                />
                              )}
                            </Box>
                          </Grid>

                          {/* Product Details */}
                          <Grid item xs={12} sm={5}>
                            <Box>
                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                                {item.brand}
                              </Typography>
                              
                              <Typography
                                variant="h6"
                                sx={{
                                  color: 'white',
                                  fontWeight: 600,
                                  mb: 1,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  },
                                }}
                                onClick={() => navigate(`/products/${item.productId}`)}
                              >
                                {item.name}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Rating
                                  value={item.rating}
                                  precision={0.1}
                                  readOnly
                                  size="small"
                                  sx={{
                                    '& .MuiRating-iconFilled': {
                                      color: '#ffd700',
                                    },
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  ({item.reviews})
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <Chip
                                  label={`Size: ${item.size}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    color: 'rgba(255,255,255,0.8)',
                                  }}
                                />
                                <Chip
                                  label={`Color: ${item.color}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    color: 'rgba(255,255,255,0.8)',
                                  }}
                                />
                              </Box>
                              
                              {item.isFreeShipping && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <ShippingIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                                  <Typography variant="caption" sx={{ color: '#00ff88' }}>
                                    Free Shipping
                                  </Typography>
                                </Box>
                              )}
                              
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Delivery: {item.estimatedDelivery}
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Quantity Controls */}
                          <Grid item xs={12} sm={2}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={updating === item.id}
                                  sx={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': {
                                      backgroundColor: 'rgba(255,255,255,0.2)',
                                    },
                                    '&:disabled': {
                                      color: 'rgba(255,255,255,0.3)',
                                    },
                                  }}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    minWidth: 30,
                                    textAlign: 'center',
                                  }}
                                >
                                  {item.quantity}
                                </Typography>
                                
                                <IconButton
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={updating === item.id || item.quantity >= item.stockQuantity}
                                  sx={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': {
                                      backgroundColor: 'rgba(255,255,255,0.2)',
                                    },
                                    '&:disabled': {
                                      color: 'rgba(255,255,255,0.3)',
                                    },
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                              
                              {item.stockQuantity <= 5 && (
                                <Typography variant="caption" sx={{ color: '#ffaa00', textAlign: 'center' }}>
                                  Only {item.stockQuantity} left
                                </Typography>
                              )}
                            </Box>
                          </Grid>

                          {/* Price & Actions */}
                          <Grid item xs={12} sm={2}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.2rem'
                                  }}
                                >
                                  ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                                
                                {item.originalPrice && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: 'rgba(255,255,255,0.5)',
                                      textDecoration: 'line-through',
                                      fontSize: '0.9rem'
                                    }}
                                  >
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </Typography>
                                )}
                              </Box>
                              
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Add to Wishlist">
                                  <IconButton
                                    onClick={() => toggleWishlist(item.productId)}
                                    sx={{
                                      color: wishlistItems.includes(item.productId) ? '#ff4444' : 'rgba(255,255,255,0.7)',
                                      '&:hover': {
                                        color: '#ff4444',
                                        backgroundColor: 'rgba(255,68,68,0.1)',
                                      },
                                    }}
                                  >
                                    {wishlistItems.includes(item.productId) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                  </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Save for Later">
                                  <IconButton
                                    onClick={() => saveForLater(item.id)}
                                    sx={{
                                      color: 'rgba(255,255,255,0.7)',
                                      '&:hover': {
                                        color: 'white',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                      },
                                    }}
                                  >
                                    <SaveIcon />
                                  </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Remove from Cart">
                                  <IconButton
                                    onClick={() => removeItem(item.id)}
                                    disabled={updating === item.id}
                                    sx={{
                                      color: 'rgba(255,255,255,0.7)',
                                      '&:hover': {
                                        color: '#ff4444',
                                        backgroundColor: 'rgba(255,68,68,0.1)',
                                      },
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                      
                      {/* Loading Overlay */}
                      {updating === item.id && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 3,
                        }}>
                          <CircularProgress size={40} sx={{ color: 'white' }} />
                        </Box>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>

            {/* Suggested Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card sx={{
                mt: 4,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <AutoAwesomeIcon sx={{ color: '#ffaa00' }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      You might also like
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    {suggestedItems.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                          },
                        }}>
                          <CardMedia
                            component="img"
                            height="150"
                            image={item.image}
                            alt={item.name}
                            sx={{ borderRadius: '8px 8px 0 0' }}
                          />
                          
                          <CardContent sx={{ p: 2 }}>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                              {item.reason}
                            </Typography>
                            
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                mb: 1,
                                fontSize: '0.9rem'
                              }}
                            >
                              {item.name}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <Rating
                                value={item.rating}
                                precision={0.1}
                                readOnly
                                size="small"
                                sx={{
                                  '& .MuiRating-iconFilled': {
                                    color: '#ffd700',
                                  },
                                }}
                              />
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                ({item.reviews})
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                  }}
                                >
                                  ${item.price}
                                </Typography>
                                
                                {item.originalPrice && (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: 'rgba(255,255,255,0.5)',
                                      textDecoration: 'line-through',
                                      ml: 1
                                    }}
                                  >
                                    ${item.originalPrice}
                                  </Typography>
                                )}
                              </Box>
                              
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => addSuggestedItem(item)}
                                sx={{
                                  background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                                  color: 'black',
                                  fontWeight: 600,
                                  fontSize: '0.8rem',
                                  textTransform: 'none',
                                  '&:hover': {
                                    background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                                  },
                                }}
                              >
                                Add to Cart
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card sx={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
                position: 'sticky',
                top: 100,
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                    Order Summary
                  </Typography>
                  
                  {/* Promo Code */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgba(255,255,255,0.7)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255,255,255,0.7)',
                              opacity: 1,
                            },
                          },
                        }}
                      />
                      
                      <Button
                        variant="outlined"
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: 'white',
                          '&:hover': {
                            borderColor: 'rgba(255,255,255,0.5)',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                    
                    {appliedPromo && (
                      <Alert
                        severity="success"
                        sx={{
                          backgroundColor: 'rgba(0,255,136,0.1)',
                          border: '1px solid rgba(0,255,136,0.3)',
                          color: '#00ff88',
                          '& .MuiAlert-icon': {
                            color: '#00ff88',
                          },
                        }}
                        action={
                          <IconButton
                            onClick={() => setAppliedPromo(null)}
                            sx={{ color: '#00ff88' }}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                      >
                        {appliedPromo.description}
                      </Alert>
                    )}
                  </Box>
                  
                  {/* Shipping Options */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                      Shipping Options
                    </Typography>
                    
                    <FormControl fullWidth>
                      <Select
                        value={selectedShipping}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255,255,255,0.3)',
                          },
                          '& .MuiSelect-select': {
                            color: 'white',
                          },
                          '& .MuiSvgIcon-root': {
                            color: 'white',
                          },
                        }}
                      >
                        {shippingOptions.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                              <option.icon sx={{ fontSize: 20 }} />
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {option.name} - ${option.price}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  {option.estimatedDays}
                                </Typography>
                              </Box>
                              {option.isRecommended && (
                                <Chip
                                  label="Recommended"
                                  size="small"
                                  sx={{
                                    backgroundColor: '#00ff88',
                                    color: 'black',
                                    fontWeight: 600,
                                    fontSize: '0.7rem'
                                  }}
                                />
                              )}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  {/* Price Breakdown */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Subtotal ({cartItems.length} items)
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                        ${subtotal.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    {savings > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#00ff88' }}>
                          Savings
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00ff88', fontWeight: 600 }}>
                          -${savings.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                    
                    {appliedPromo && promoDiscount > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#00ff88' }}>
                          Promo ({appliedPromo.code})
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00ff88', fontWeight: 600 }}>
                          -${promoDiscount.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Shipping
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                        ${shippingCost.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Tax
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                        ${tax.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        Total
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        ${total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Checkout Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/checkout')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 2,
                      background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                      color: 'black',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(255,255,255,0.4)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  {/* Security Features */}
                  <Box sx={{ mt: 3 }}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Secure Checkout
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShieldIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Money Back Guarantee
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            backgroundColor: snackbar.severity === 'success' ? 'rgba(0,255,136,0.1)' : 
                             snackbar.severity === 'error' ? 'rgba(255,68,68,0.1)' : 
                             snackbar.severity === 'warning' ? 'rgba(255,170,0,0.1)' : 
                             'rgba(0,170,255,0.1)',
            border: `1px solid ${snackbar.severity === 'success' ? 'rgba(0,255,136,0.3)' : 
                                 snackbar.severity === 'error' ? 'rgba(255,68,68,0.3)' : 
                                 snackbar.severity === 'warning' ? 'rgba(255,170,0,0.3)' : 
                                 'rgba(0,170,255,0.3)'}`,
            color: snackbar.severity === 'success' ? '#00ff88' : 
                   snackbar.severity === 'error' ? '#ff4444' : 
                   snackbar.severity === 'warning' ? '#ffaa00' : 
                   '#00aaff',
            '& .MuiAlert-icon': {
              color: snackbar.severity === 'success' ? '#00ff88' : 
                     snackbar.severity === 'error' ? '#ff4444' : 
                     snackbar.severity === 'warning' ? '#ffaa00' : 
                     '#00aaff',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;