/**
 * Advanced Wishlist Page with Stunning Heart Animations
 * Premium wishlist experience with smooth interactions and recommendations
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
  Chip,
  Rating,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Zoom,
  Tooltip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Home,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Delete,
  Share,
  Visibility,
  LocalOffer,
  Star,
  HeartBroken,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { IWishlist, IWishlistItem, IWishlistRecommendation } from '../interfaces/WishlistInterface';
import wishlistApi from '../apis/wishlistApi';
import ProductCard from '../components/product/ProductCard';
import { IProduct } from '../interfaces/ProductInterface';

// Advanced animations
const heartBeatAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const particleAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const WishlistPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // State management
  const [wishlist, setWishlist] = useState<IWishlist | null>(null);
  const [recommendations, setRecommendations] = useState<IWishlistRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [animatingHearts, setAnimatingHearts] = useState<string[]>([]);

  // Load wishlist data
  useEffect(() => {
    const loadWishlistData = async () => {
      try {
        setLoading(true);
        const [wishlistResponse, recommendationsResponse] = await Promise.all([
          wishlistApi.getWishlist(),
          wishlistApi.getWishlistRecommendations(),
        ]);

        setWishlist(wishlistResponse.data || null);
        setRecommendations(recommendationsResponse.data || []);
      } catch (error) {
        console.error('Failed to load wishlist data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlistData();
  }, []);

  // Remove from wishlist
  const removeFromWishlist = async (itemId: string) => {
    try {
      setRemoving(itemId);
      setAnimatingHearts(prev => [...prev, itemId]);
      
      // Animate heart break
      setTimeout(async () => {
        await wishlistApi.removeFromWishlist(itemId);
        
        // Update local state
        if (wishlist) {
          const updatedItems = wishlist.items.filter(item => item.id !== itemId);
          setWishlist({ ...wishlist, items: updatedItems, totalItems: updatedItems.length });
        }

        setSuccessMessage('Item removed from wishlist!');
        setShowSuccess(true);
        setAnimatingHearts(prev => prev.filter(id => id !== itemId));
      }, 600);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    } finally {
      setRemoving(null);
    }
  };

  // Move to cart
  const moveToCart = async (itemId: string) => {
    try {
      const response = await wishlistApi.moveToCart(itemId);
      
      // Update local state
      if (wishlist) {
        const updatedItems = wishlist.items.filter(item => item.id !== itemId);
        setWishlist({ ...wishlist, items: updatedItems, totalItems: updatedItems.length });
      }

      setSuccessMessage(response.data?.cartMessage || 'Item moved to cart!');
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to move to cart:', error);
    }
  };

  // Share item
  const shareItem = (item: IWishlistItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.productName,
        text: `Check out this amazing product: ${item.productName}`,
        url: `${window.location.origin}/products/${item.productId}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${item.productId}`);
      setSuccessMessage('Link copied to clipboard!');
      setShowSuccess(true);
    }
  };

  // Convert wishlist item to product format
  const wishlistItemToProduct = (item: IWishlistItem): IProduct => ({
    id: item.productId,
    name: item.productName,
    description: '',
    price: item.productPrice,
    originalPrice: item.originalPrice,
    discount: item.discount,
    categoryId: '',
    categoryName: '',
    images: [item.productImage],
    sizes: item.sizes,
    colors: item.colors,
    stock: item.inStock ? 10 : 0,
    featured: false,
    rating: item.rating,
    reviews: item.reviews,
    brand: '',
    createdAt: item.addedAt,
    updatedAt: item.addedAt,
  });

  // Loading state
  if (loading) {
    return (
      <Box sx={{ pt: 10, pb: 6, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ color: '#ffffff', textAlign: 'center' }}>
            Loading your wishlist...
          </Typography>
        </Container>
      </Box>
    );
  }

  // Empty wishlist
  if (!wishlist || wishlist.items.length === 0) {
    return (
      <Box sx={{ pt: 10, pb: 6, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <HeartBroken sx={{ fontSize: 120, color: 'rgba(255, 255, 255, 0.3)', mb: 3 }} />
              <Typography
                variant="h3"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Your Wishlist is Empty
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                Save your favorite items to your wishlist and never lose track of them.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #ff4444, #ff6666)',
                  color: '#ffffff',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff6666, #ff4444)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(255, 68, 68, 0.3)',
                  },
                }}
              >
                Find Your Favorites
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 10, pb: 6, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs
              separator={<ArrowForward fontSize="small" />}
              sx={{
                '& .MuiBreadcrumbs-separator': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              <Link
                onClick={() => navigate('/')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                <Home sx={{ mr: 0.5, fontSize: 20 }} />
                Home
              </Link>
              <Typography sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                Wishlist
              </Typography>
            </Breadcrumbs>
          </Box>
        </Fade>

        {/* Page Header */}
        <Slide direction="up" in timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <Favorite
                sx={{
                  fontSize: 60,
                  color: '#ff4444',
                  mr: 2,
                  animation: `${heartBeatAnimation} 2s ease-in-out infinite`,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                  color: '#ffffff',
                  background: 'linear-gradient(45deg, #ff4444, #ff6666)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: `${slideInFromLeft} 1s ease-out`,
                }}
              >
                My Wishlist
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
              }}
            >
              {wishlist.totalItems} {wishlist.totalItems === 1 ? 'item' : 'items'} you love
            </Typography>
          </Box>
        </Slide>

        {/* Wishlist Items */}
        <Grid container spacing={4}>
          {wishlist.items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Fade in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    height: '100%',
                    opacity: removing === item.id ? 0.5 : 1,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {/* Heart particles for animation */}
                  {animatingHearts.includes(item.id) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        pointerEvents: 'none',
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Favorite
                          key={i}
                          sx={{
                            position: 'absolute',
                            color: '#ff4444',
                            fontSize: 20,
                            animation: `${particleAnimation} 1s ease-out`,
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${i * 72}deg) translateY(-20px)`,
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Product Image */}
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.productImage}
                      alt={item.productName}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />

                    {/* Discount Badge */}
                    {item.discount && item.discount > 0 && (
                      <Chip
                        icon={<LocalOffer />}
                        label={`${item.discount}% OFF`}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background: 'linear-gradient(45deg, #ff4444, #ff6666)',
                          color: '#ffffff',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          animation: `${floatAnimation} 3s ease-in-out infinite`,
                        }}
                      />
                    )}

                    {/* Stock Status */}
                    {!item.inStock && (
                      <Chip
                        label="Out of Stock"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: 'rgba(255, 68, 68, 0.9)',
                          color: '#ffffff',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                        }}
                      />
                    )}

                    {/* Quick Actions */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '.MuiCard-root:hover &': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Tooltip title="View Product" arrow>
                        <IconButton
                          onClick={() => navigate(`/products/${item.productId}`)}
                          sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)',
                            color: '#ffffff',
                            width: 40,
                            height: 40,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            },
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Share" arrow>
                        <IconButton
                          onClick={() => shareItem(item)}
                          sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)',
                            color: '#ffffff',
                            width: 40,
                            height: 40,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            },
                          }}
                        >
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* Product Details */}
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                        mb: 1,
                        color: '#ffffff',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '2.8rem',
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#cccccc',
                        },
                      }}
                      onClick={() => navigate(`/products/${item.productId}`)}
                    >
                      {item.productName}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Rating
                        value={item.rating}
                        readOnly
                        size="small"
                        sx={{
                          color: '#ffd700',
                          '& .MuiRating-iconFilled': {
                            color: '#ffd700',
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 1,
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.875rem',
                        }}
                      >
                        ({item.reviews})
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#ffffff',
                          mr: 1,
                        }}
                      >
                        ${item.productPrice}
                      </Typography>
                      {item.originalPrice && item.originalPrice > item.productPrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          ${item.originalPrice}
                        </Typography>
                      )}
                    </Box>

                    {/* Added Date */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.8rem',
                        mb: 2,
                      }}
                    >
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => moveToCart(item.id)}
                        disabled={!item.inStock}
                        startIcon={<ShoppingCart />}
                        sx={{
                          background: item.inStock
                            ? 'linear-gradient(135deg, #000000 0%, #333333 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          fontWeight: 600,
                          py: 1.5,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: item.inStock
                              ? 'linear-gradient(135deg, #333333 0%, #000000 100%)'
                              : 'rgba(255, 255, 255, 0.1)',
                            transform: item.inStock ? 'translateY(-2px)' : 'none',
                          },
                        }}
                      >
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>

                      <IconButton
                        onClick={() => removeFromWishlist(item.id)}
                        disabled={removing === item.id}
                        sx={{
                          color: '#ff4444',
                          border: '1px solid #ff4444',
                          borderRadius: 2,
                          width: 48,
                          height: 48,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ff4444',
                            color: '#ffffff',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Favorite />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Fade in timeout={1600}>
            <Box sx={{ mt: 8 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  mb: 4,
                  textAlign: 'center',
                }}
              >
                Recommended for You
              </Typography>
              <Grid container spacing={3}>
                {recommendations.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Zoom in timeout={1000 + index * 200}>
                      <Card
                        onClick={() => navigate(`/products/${item.id}`)}
                        sx={{
                          borderRadius: 3,
                          overflow: 'hidden',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: 200,
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                            {item.category}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Rating value={item.rating} size="small" readOnly />
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              ({item.rating})
                            </Typography>
                          </Box>
                          <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 'bold' }}>
                            ${item.price}
                            {item.discount && (
                              <Chip
                                label={`${item.discount}% OFF`}
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: '#ff4444',
                                  color: '#ffffff',
                                  fontSize: '0.7rem',
                                }}
                              />
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            color: '#ff4444',
            border: '1px solid rgba(255, 68, 68, 0.3)',
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WishlistPage;