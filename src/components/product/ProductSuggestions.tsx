/**
 * Product Suggestions Component
 * Displays recommended products based on user behavior
 */

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  Chip,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  TrendingUp as TrendingIcon,
  Whatshot as HotIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Product {
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
  isHot?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

interface ProductSuggestionsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showPrice?: boolean;
  showRating?: boolean;
  showAddToCart?: boolean;
  showWishlist?: boolean;
  loading?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistItems?: string[];
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({
  products,
  title = 'Recommended for You',
  subtitle = 'Based on your browsing history',
  maxItems = 4,
  showPrice = true,
  showRating = true,
  showAddToCart = true,
  showWishlist = true,
  loading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistItems = [],
}) => {
  const navigate = useNavigate();

  const displayProducts = products.slice(0, maxItems);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onAddToCart?.(productId);
  };

  const handleToggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onToggleWishlist?.(productId);
  };

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={200} height={20} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {Array(maxItems).fill(0).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 3,
              }}>
                <Skeleton variant="rectangular" height={250} />
                <CardContent>
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Skeleton variant="text" height={20} width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 700,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TrendingIcon sx={{ color: '#00ff88' }} />
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1rem',
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {displayProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={12/maxItems} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                onClick={() => handleProductClick(product.id)}
                sx={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
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
                  
                  {/* Product Badges */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {product.isHot && (
                      <Chip
                        icon={<HotIcon sx={{ fontSize: 14 }} />}
                        label="Hot"
                        size="small"
                        sx={{
                          backgroundColor: '#ff4444',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    )}
                    {product.isTrending && (
                      <Chip
                        icon={<TrendingIcon sx={{ fontSize: 14 }} />}
                        label="Trending"
                        size="small"
                        sx={{
                          backgroundColor: '#00ff88',
                          color: 'black',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    )}
                    {product.isNew && (
                      <Chip
                        label="New"
                        size="small"
                        sx={{
                          backgroundColor: '#ffaa00',
                          color: 'black',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    )}
                    {product.discount && (
                      <Chip
                        label={`-${product.discount}%`}
                        size="small"
                        sx={{
                          backgroundColor: '#ff4444',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    )}
                  </Box>
                  
                  {/* Wishlist Button */}
                  {showWishlist && (
                    <IconButton
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: wishlistItems.includes(product.id) ? '#ff4444' : 'rgba(0,0,0,0.6)',
                        '&:hover': {
                          backgroundColor: 'white',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {wishlistItems.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  )}
                </Box>
                
                <CardContent sx={{ p: 2 }}>
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
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  {showRating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
                  )}
                  
                  {showPrice && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                        }}
                      >
                        ${product.price}
                      </Typography>
                      
                      {product.originalPrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255,255,255,0.5)',
                            textDecoration: 'line-through',
                          }}
                        >
                          ${product.originalPrice}
                        </Typography>
                      )}
                    </Box>
                  )}
                  
                  {showAddToCart && (
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      startIcon={<CartIcon />}
                      onClick={(e) => handleAddToCart(e, product.id)}
                      sx={{
                        py: 1,
                        background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                        color: 'black',
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductSuggestions;