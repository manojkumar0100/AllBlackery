/**
 * 404 Not Found Page - Premium Design
 * Features: Animated elements, search suggestions, popular products
 */

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingBag as ShoppingBagIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

// Styled Components
const NotFoundContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
  minHeight: '100vh',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const AnimatedNumber = styled(Typography)(({ theme }) => ({
  fontSize: '12rem',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #ffffff 0%, #666666 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${float} 3s ease-in-out infinite`,
  lineHeight: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '6rem',
  },
}));

const GlowButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  color: '#000000',
  borderRadius: 25,
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 35px rgba(255, 255, 255, 0.3)',
  },
}));

const SuggestionCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  animation: `${pulse} 2s ease-in-out infinite`,
  '&:nth-of-type(1)': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    top: '60%',
    right: '15%',
    animationDelay: '0.5s',
  },
  '&:nth-of-type(3)': {
    bottom: '20%',
    left: '20%',
    animationDelay: '1s',
  },
}));

// Mock popular products
const popularProducts = [
  {
    id: '1',
    name: 'Black Leather Jacket',
    image: 'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=300&h=300&fit=crop',
    price: 299.99,
  },
  {
    id: '2',
    name: 'Elegant Black Dress',
    image: 'https://images.unsplash.com/photo-1707231510379-bb21c262e2c6?w=300&h=300&fit=crop',
    price: 189.99,
  },
  {
    id: '3',
    name: 'Designer Sneakers',
    image: 'https://images.pexels.com/photos/5949262/pexels-photo-5949262.jpeg?w=300&h=300&fit=crop',
    price: 149.99,
  },
];

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearchProducts = () => {
    navigate('/products');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <NotFoundContainer>
      {/* Floating Elements */}
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Error Message */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <AnimatedNumber variant="h1">404</AnimatedNumber>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                  maxWidth: '500px',
                  lineHeight: 1.6,
                }}
              >
                The page you're looking for seems to have vanished into the void. 
                But don't worry, our premium collection is still here waiting for you.
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <GlowButton
                  onClick={handleGoHome}
                  startIcon={<HomeIcon />}
                  size="large"
                >
                  Go Home
                </GlowButton>
                <Button
                  variant="outlined"
                  onClick={handleGoBack}
                  startIcon={<ArrowBackIcon />}
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    borderRadius: 25,
                    px: 4,
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Go Back
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSearchProducts}
                  startIcon={<SearchIcon />}
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    borderRadius: 25,
                    px: 4,
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Browse Products
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Popular Products */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#ffffff',
                }}
              >
                Popular Right Now
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                }}
              >
                Check out what others are loving from our collection
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {popularProducts.map((product, index) => (
                <Grid item xs={12} sm={4} key={product.id}>
                  <SuggestionCard 
                    sx={{ 
                      cursor: 'pointer',
                      animationDelay: `${index * 0.1}s`,
                    }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </SuggestionCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Help Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#ffffff',
            }}
          >
            Need Help?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 3,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Our customer support team is here to help you find exactly what you're looking for. 
            Get in touch with us for personalized assistance.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              borderRadius: 25,
              px: 4,
              '&:hover': {
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Container>
    </NotFoundContainer>
  );
};

export default NotFoundPage;