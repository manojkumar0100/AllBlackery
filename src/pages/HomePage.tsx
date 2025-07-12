/**
 * Enhanced HomePage with Premium UI/UX and Advanced Effects
 * Features: Hero section, product showcase, categories, testimonials, newsletter
 * Design: Dark theme with glassmorphism, animations, and premium interactions
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Rating,
  TextField,
  IconButton,
  Paper,
  Divider,
  Stack,
  Fade,
  Zoom,
  Slide,
  useTheme,
  useMediaQuery,
  alpha,
  LinearProgress,
  Backdrop,
  CircularProgress,
  Skeleton
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  TrendingUp as TrendingIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Verified as VerifiedIcon,
  Diamond as DiamondIcon,
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Category as CategoryIcon,
  LocalOffer as OfferIcon,
  Grade as GradeIcon,
  People as PeopleIcon,
  Whatshot as WhatshotIcon,
  FlashOn as FlashIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  featured: boolean;
  isNew?: boolean;
  isSale?: boolean;
  colors?: string[];
  sizes?: string[];
}

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [emailSubscribe, setEmailSubscribe] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  
  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Premium Black Collection",
      subtitle: "Luxury Redefined",
      description: "Discover our exclusive collection of premium black fashion pieces",
      image: "https://images.unsplash.com/photo-1530904655194-92d55d4a006b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxibGFjayUyMGZhc2hpb258ZW58MHx8fGJsYWNrfDE3NTIyNTgxMTB8MA&ixlib=rb-4.1.0&q=85",
      cta: "Shop Now",
      offer: "Up to 30% OFF"
    },
    {
      id: 2,
      title: "Designer Accessories",
      subtitle: "Elegance in Every Detail",
      description: "Handcrafted luxury accessories for the modern individual",
      image: "https://images.unsplash.com/photo-1588770238925-31c80ffccb9a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3Nvcmllc3xlbnwwfHx8YmxhY2t8MTc1MjI1ODExNnww&ixlib=rb-4.1.0&q=85",
      cta: "Explore Collection",
      offer: "New Arrivals"
    },
    {
      id: 3,
      title: "Exclusive Black Fashion",
      subtitle: "Sophistication Unleashed",
      description: "Where luxury meets style in perfect harmony",
      image: "https://images.unsplash.com/photo-1707231510465-79974f06b009?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBhY2Nlc3Nvcmllc3xlbnwwfHx8YmxhY2t8MTc1MjI1ODExNnww&ixlib=rb-4.1.0&q=85",
      cta: "Shop Collection",
      offer: "Limited Edition"
    }
  ];

  // Mock data (replace with actual API calls)
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Black Leather Jacket',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      category: 'Jackets',
      rating: 4.8,
      reviews: 127,
      brand: 'AllBlackery',
      featured: true,
      isNew: false,
      isSale: true,
      colors: ['Black', 'Brown'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '2',
      name: 'Elegant Black Dress',
      price: 189.99,
      originalPrice: 249.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=800',
      category: 'Dresses',
      rating: 4.9,
      reviews: 89,
      brand: 'AllBlackery',
      featured: true,
      isNew: true,
      isSale: false,
      colors: ['Black', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: '3',
      name: 'Luxury Black Handbag',
      price: 249.99,
      originalPrice: 329.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      category: 'Bags',
      rating: 4.9,
      reviews: 234,
      brand: 'AllBlackery',
      featured: true,
      isNew: false,
      isSale: true,
      colors: ['Black', 'Gold'],
      sizes: ['One Size']
    },
    {
      id: '4',
      name: 'Designer Black Boots',
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
      category: 'Shoes',
      rating: 4.7,
      reviews: 156,
      brand: 'AllBlackery',
      featured: true,
      isNew: false,
      isSale: true,
      colors: ['Black', 'Brown'],
      sizes: ['6', '7', '8', '9', '10', '11']
    }
  ];

  const categories: Category[] = [
    {
      id: 'jackets',
      name: 'Jackets',
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400',
      productCount: 25,
      description: 'Premium leather and fabric jackets'
    },
    {
      id: 'dresses',
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400',
      productCount: 18,
      description: 'Elegant dresses for every occasion'
    },
    {
      id: 'bags',
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      productCount: 12,
      description: 'Luxury handbags and accessories'
    },
    {
      id: 'shoes',
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
      productCount: 22,
      description: 'Designer footwear collection'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b36c4877?w=100',
      rating: 5,
      comment: 'Absolutely love my AllBlackery jacket! The quality is exceptional and the style is perfect.',
      date: '2 days ago',
      verified: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      comment: 'Premium quality and fast shipping. Will definitely shop here again!',
      date: '1 week ago',
      verified: true
    },
    {
      id: '3',
      name: 'Emma Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5,
      comment: 'The black dress I ordered is stunning. Perfect fit and amazing quality.',
      date: '2 weeks ago',
      verified: true
    }
  ];

  const features = [
    {
      icon: ShippingIcon,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
      color: '#00ff88'
    },
    {
      icon: SecurityIcon,
      title: 'Secure Payment',
      description: 'Your payment information is safe',
      color: '#ff4444'
    },
    {
      icon: SupportIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support',
      color: '#ffaa00'
    },
    {
      icon: VerifiedIcon,
      title: 'Quality Guarantee',
      description: '100% authentic products',
      color: '#00aaff'
    }
  ];

  // Auto-play hero slider
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, heroSlides.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setProductsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Wishlist functionality
  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterSuccess(true);
      setEmailSubscribe('');
      setTimeout(() => setNewsletterSuccess(false), 3000);
    }, 1000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)'
      }}>
        <CircularProgress size={60} sx={{ color: '#ffffff' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      color: 'white'
    }}>
      {/* Hero Section with Advanced Slider */}
      <Box sx={{ 
        position: 'relative',
        height: { xs: '70vh', md: '90vh' },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
              backdropFilter: 'blur(2px)'
            }} />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Chip
                    label={heroSlides[currentSlide].offer}
                    sx={{
                      background: 'linear-gradient(45deg, #ff4444 30%, #ffaa00 90%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 2,
                      py: 1,
                      animation: 'pulse 2s infinite'
                    }}
                    icon={<FlashIcon />}
                  />
                </Box>
                
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(255,255,255,0.3)'
                  }}
                >
                  {heroSlides[currentSlide].title}
                </Typography>
                
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                    fontWeight: 300,
                    mb: 3,
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {heroSlides[currentSlide].subtitle}
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 4,
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: '600px',
                    lineHeight: 1.8
                  }}
                >
                  {heroSlides[currentSlide].description}
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/products')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 2,
                      px: 4,
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
                    {heroSlides[currentSlide].cta}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/categories')}
                    sx={{
                      py: 2,
                      px: 4,
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Browse Categories
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Slider Navigation */}
        <Box sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          zIndex: 3
        }}>
          <IconButton
            onClick={prevSlide}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            <PrevIcon />
          </IconButton>
          
          {heroSlides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
          
          <IconButton
            onClick={nextSlide}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            <NextIcon />
          </IconButton>
        </Box>

        {/* Auto-play toggle */}
        <IconButton
          onClick={() => setAutoPlay(!autoPlay)}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
            },
            transition: 'all 0.2s ease'
          }}
        >
          {autoPlay ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    p: 3,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: alpha(feature.color, 0.2),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      border: `2px solid ${feature.color}`,
                    }}
                  >
                    <feature.icon sx={{ fontSize: 30, color: feature.color }} />
                  </Box>
                  
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Featured Products
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Discover our hand-picked selection of premium black fashion pieces
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {(productsLoading ? Array(4).fill(0) : featuredProducts).map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={productsLoading ? index : product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {productsLoading ? (
                    <Skeleton variant="rectangular" height={250} />
                  ) : (
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      
                      {/* Product badges */}
                      <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 1 }}>
                        {product.isNew && (
                          <Chip
                            label="NEW"
                            size="small"
                            sx={{
                              backgroundColor: '#00ff88',
                              color: 'black',
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                        {product.isSale && (
                          <Chip
                            label={`-${product.discount}%`}
                            size="small"
                            sx={{
                              backgroundColor: '#ff4444',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                      </Box>
                      
                      {/* Wishlist button */}
                      <IconButton
                        onClick={() => toggleWishlist(product.id)}
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: wishlistItems.includes(product.id) ? '#ff4444' : 'rgba(0,0,0,0.6)',
                          '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {wishlistItems.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 3 }}>
                    {productsLoading ? (
                      <>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          {product.category}
                        </Typography>
                        
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            mb: 1,
                            fontSize: '1rem',
                            lineHeight: 1.3
                          }}
                        >
                          {product.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Rating
                            value={product.rating}
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
                            ({product.reviews})
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.2rem'
                            }}
                          >
                            ${product.price}
                          </Typography>
                          
                          {product.originalPrice && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(255,255,255,0.5)',
                                textDecoration: 'line-through'
                              }}
                            >
                              ${product.originalPrice}
                            </Typography>
                          )}
                        </Box>
                        
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<CartIcon />}
                          onClick={() => navigate(`/products/${product.id}`)}
                          sx={{
                            py: 1.5,
                            background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                            color: 'black',
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Add to Cart
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/products')}
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 2,
              px: 4,
              borderColor: 'rgba(255,255,255,0.5)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Shop by Category
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Explore our curated collections of premium fashion
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  onClick={() => navigate(`/products?category=${category.id}`)}
                  sx={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={category.image}
                      alt={category.name}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                          color: 'black',
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: 'none',
                        }}
                      >
                        Shop Now
                      </Button>
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1.2rem'
                      }}
                    >
                      {category.name}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        mb: 2,
                        lineHeight: 1.5
                      }}
                    >
                      {category.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CategoryIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {category.productCount} Products
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              What Our Customers Say
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Real experiences from our valued customers
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: 50,
                        height: 50,
                        border: '2px solid rgba(255,255,255,0.2)',
                      }}
                    />
                    
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem'
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        
                        {testimonial.verified && (
                          <VerifiedIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                        )}
                      </Box>
                      
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {testimonial.date}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{
                      mb: 2,
                      '& .MuiRating-iconFilled': {
                        color: '#ffd700',
                      },
                    }}
                  />
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6,
                      fontStyle: 'italic'
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4,
              p: 6,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Stay Updated with AllBlackery
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Subscribe to our newsletter and be the first to know about new collections, exclusive deals, and fashion tips.
            </Typography>

            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                maxWidth: '500px',
                mx: 'auto',
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={emailSubscribe}
                onChange={(e) => setEmailSubscribe(e.target.value)}
                type="email"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 3,
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
                    py: 2,
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                      opacity: 1,
                    },
                  },
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubscribing}
                sx={{
                  py: 2,
                  px: 4,
                  background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                  color: 'black',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 3,
                  textTransform: 'none',
                  minWidth: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isSubscribing ? <CircularProgress size={24} color="inherit" /> : 'Subscribe'}
              </Button>
            </Box>

            <AnimatePresence>
              {newsletterSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      backgroundColor: 'rgba(0,255,136,0.1)',
                      border: '1px solid rgba(0,255,136,0.3)',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <CheckIcon sx={{ color: '#00ff88' }} />
                    <Typography sx={{ color: '#00ff88', fontWeight: 600 }}>
                      Successfully subscribed! Welcome to AllBlackery.
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;