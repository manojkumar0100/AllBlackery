/**
 * Product Detail Page - Premium Shopping Experience
 * Features: Image gallery, size/color selection, reviews, recommendations
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
  Zoom,
  Fade,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  ShoppingCart as CartIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  SwapHoriz as CompareIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled Components
const ProductContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
  minHeight: '100vh',
  color: '#ffffff',
}));

const ImageGallery = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
}));

const MainImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '500px',
  objectFit: 'cover',
  borderRadius: 16,
  cursor: 'zoom-in',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ThumbnailImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '80px',
  objectFit: 'cover',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover, &.active': {
    border: '2px solid #ffffff',
    transform: 'scale(1.05)',
  },
}));

const SizeButton = styled(Button)(({ theme }) => ({
  minWidth: 48,
  height: 48,
  borderRadius: 8,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: '#ffffff',
  margin: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#ffffff',
  },
  '&.selected': {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#ffffff',
  },
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  color: '#000000',
  borderRadius: 25,
  padding: theme.spacing(2, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
  },
}));

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Premium Black Leather Jacket',
  description: 'Crafted from the finest Italian leather, this premium black jacket embodies sophistication and style. Perfect for any occasion, combining comfort with elegance.',
  price: 299.99,
  originalPrice: 399.99,
  images: [
    'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1707231510465-79974f06b009?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1707231510379-bb21c262e2c6?w=600&h=600&fit=crop',
    'https://images.pexels.com/photos/5949262/pexels-photo-5949262.jpeg?w=600&h=600&fit=crop',
  ],
  rating: 4.8,
  reviews: 124,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'Dark Brown'],
  category: 'Outerwear',
  brand: 'AllBlackery',
  inStock: true,
  stock: 15,
  features: [
    'Premium Italian Leather',
    'Water Resistant',
    'Multiple Pockets',
    'Adjustable Fit',
    'Lifetime Warranty',
  ],
  specifications: {
    'Material': '100% Genuine Leather',
    'Lining': 'Silk Blend',
    'Care': 'Professional Clean Only',
    'Origin': 'Made in Italy',
    'Weight': '1.2 kg',
  },
};

const mockReviews = [
  {
    id: '1',
    userName: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612661c?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely stunning!',
    comment: 'The quality is exceptional and the fit is perfect. Worth every penny!',
    helpful: 12,
  },
  {
    id: '2',
    userName: 'Michael R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-10',
    title: 'Premium quality',
    comment: 'Best leather jacket I\'ve ever owned. The craftsmanship is outstanding.',
    helpful: 8,
  },
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Add to cart:', { id, size: selectedSize, color: selectedColor, quantity });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockProduct.name,
        text: mockProduct.description,
        url: window.location.href,
      });
    }
  };

  return (
    <ProductContainer sx={{ pt: { xs: 7, md: 8 } }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumb */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: '#ffffff' },
            }}
          >
            Back to Products
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid item xs={12} md={6}>
            <ImageGallery>
              <Zoom in={true} timeout={500}>
                <Box sx={{ mb: 2 }}>
                  <MainImage
                    src={mockProduct.images[selectedImage]}
                    alt={mockProduct.name}
                  />
                </Box>
              </Zoom>
              <Grid container spacing={1}>
                {mockProduct.images.map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <ThumbnailImage
                      src={image}
                      alt={`${mockProduct.name} ${index + 1}`}
                      className={selectedImage === index ? 'active' : ''}
                      onClick={() => setSelectedImage(index)}
                    />
                  </Grid>
                ))}
              </Grid>
            </ImageGallery>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={mockProduct.brand}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      mb: 1,
                    }}
                  />
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {mockProduct.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Rating value={mockProduct.rating} readOnly sx={{ color: '#ffd700' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      ({mockProduct.reviews} reviews)
                    </Typography>
                  </Box>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      ${mockProduct.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        textDecoration: 'line-through',
                      }}
                    >
                      ${mockProduct.originalPrice}
                    </Typography>
                    <Chip
                      label={`Save ${Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}%`}
                      color="error"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#4caf50' }}>
                    In Stock ({mockProduct.stock} items available)
                  </Typography>
                </Box>

                {/* Color Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Color: {selectedColor}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {mockProduct.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? 'contained' : 'outlined'}
                        onClick={() => setSelectedColor(color)}
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: selectedColor === color ? '#000000' : '#ffffff',
                          backgroundColor: selectedColor === color ? '#ffffff' : 'transparent',
                        }}
                      >
                        {color}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Size Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Size: {selectedSize || 'Select Size'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {mockProduct.sizes.map((size) => (
                      <SizeButton
                        key={size}
                        className={selectedSize === size ? 'selected' : ''}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </SizeButton>
                    ))}
                  </Box>
                </Box>

                {/* Actions */}
                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <AddToCartButton
                        fullWidth
                        onClick={handleAddToCart}
                        startIcon={<CartIcon />}
                        size="large"
                      >
                        Add to Cart
                      </AddToCartButton>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleWishlistToggle}
                        startIcon={isWishlisted ? <FavoriteFilledIcon /> : <FavoriteIcon />}
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: isWishlisted ? '#ff4444' : '#ffffff',
                          '&:hover': {
                            borderColor: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleShare}
                        startIcon={<ShareIcon />}
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: '#ffffff',
                          '&:hover': {
                            borderColor: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        Share
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                {/* Features */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Key Features
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {mockProduct.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        variant="outlined"
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: '#ffffff',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Guarantees */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                    <Typography variant="body2">Secure Payment</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShippingIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                    <Typography variant="body2">Free Shipping</Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box sx={{ mt: 6 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <Tab label="Description" />
            <Tab label={`Reviews (${mockProduct.reviews})`} />
            <Tab label="Specifications" />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  {mockProduct.description}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  This exceptional piece represents the pinnacle of modern fashion design. 
                  Every detail has been carefully considered to ensure both comfort and style. 
                  The premium materials and expert craftsmanship make this a timeless addition 
                  to any wardrobe.
                </Typography>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                {mockReviews.map((review) => (
                  <Card
                    key={review.id}
                    sx={{
                      mb: 2,
                      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={review.avatar} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {review.userName}
                          </Typography>
                          <Rating value={review.rating} size="small" readOnly />
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {review.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {review.comment}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {review.helpful} people found this helpful
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 2,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {key}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ProductContainer>
  );
};

export default ProductDetailPage;