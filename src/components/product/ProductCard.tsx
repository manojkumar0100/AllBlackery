/**
 * Advanced Product Card Component
 * Beautiful product card with hover effects, animations, and interactive features
 */

import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Rating,
  Button,
  Tooltip,
  Badge,
  useTheme,
  alpha,
  Fade,
  Zoom,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCartOutlined,
  ShareOutlined,
  VisibilityOutlined,
  FlashOn,
  LocalOffer,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { IProduct } from '../../interfaces/ProductInterface';
import { useNavigate } from 'react-router-dom';

// Advanced animation keyframes
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

const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

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

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
  onToggleWishlist?: (product: IProduct) => void;
  onShare?: (product: IProduct) => void;
  isInWishlist?: boolean;
  loading?: boolean;
  variant?: 'default' | 'compact' | 'featured' | 'premium';
}

/**
 * Advanced Product Card with stunning visual effects and animations
 * @param product - Product data
 * @param onAddToCart - Add to cart handler
 * @param onToggleWishlist - Toggle wishlist handler
 * @param onShare - Share handler
 * @param isInWishlist - Whether product is in wishlist
 * @param loading - Loading state
 * @param variant - Card variant
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onShare,
  isInWishlist = false,
  loading = false,
  variant = 'default',
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistAnimating(true);
    onToggleWishlist?.(product);
    setTimeout(() => setIsWishlistAnimating(false), 600);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(product);
  };

  const getDiscountPercentage = () => {
    if (!product.originalPrice || !product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          height: 320,
          '& .MuiCardMedia-root': {
            height: 180,
          },
        };
      
      case 'featured':
        return {
          height: 480,
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          '&:hover': {
            border: '2px solid rgba(255, 215, 0, 0.6)',
            animation: `${glowAnimation} 2s ease-in-out infinite`,
          },
          '& .MuiCardMedia-root': {
            height: 280,
          },
        };
      
      case 'premium':
        return {
          height: 420,
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
          backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: `${shimmerAnimation} 3s infinite`,
          '&:hover': {
            animation: `${shimmerAnimation} 1.5s infinite`,
          },
          '& .MuiCardMedia-root': {
            height: 250,
          },
        };
      
      default:
        return {
          height: 400,
          '& .MuiCardMedia-root': {
            height: 240,
          },
        };
    }
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProduct}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        '&:hover': {
          transform: 'translateY(-12px) scale(1.02)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        ...getVariantStyles(),
      }}
    >
      {/* Loading Overlay */}
      {loading && (
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
      )}

      {/* Product Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={product.images[imageIndex] || product.images[0]}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        
        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {product.images.map((_, index) => (
              <Box
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(index);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === imageIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <Chip
            icon={<LocalOffer />}
            label={`${product.discount}% OFF`}
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'linear-gradient(45deg, #ff4444, #ff6666)',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              animation: `${floatAnimation} 3s ease-in-out infinite`,
              '& .MuiChip-icon': {
                color: '#ffffff',
              },
            }}
          />
        )}

        {/* Featured Badge */}
        {product.featured && (
          <Chip
            icon={<FlashOn />}
            label="FEATURED"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'linear-gradient(45deg, #ffd700, #ffed4a)',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              animation: `${glowAnimation} 2s ease-in-out infinite`,
            }}
          />
        )}

        {/* Quick Actions */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Tooltip title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'} arrow>
              <IconButton
                onClick={handleToggleWishlist}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  color: isInWishlist ? '#ff4444' : '#ffffff',
                  width: 44,
                  height: 44,
                  transition: 'all 0.3s ease',
                  animation: isWishlistAnimating ? `${heartBeatAnimation} 0.6s ease` : 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    transform: 'scale(1.1)',
                    color: '#ff4444',
                  },
                }}
              >
                {isInWishlist ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Quick View" arrow>
              <IconButton
                onClick={handleViewProduct}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  width: 44,
                  height: 44,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share" arrow>
              <IconButton
                onClick={handleShare}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  width: 44,
                  height: 44,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ShareOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        {/* Stock Status */}
        {product.stock <= 5 && product.stock > 0 && (
          <Chip
            label={`Only ${product.stock} left!`}
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: 'linear-gradient(45deg, #ff8800, #ffaa00)',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              animation: `${floatAnimation} 2s ease-in-out infinite`,
            }}
          />
        )}
      </Box>

      {/* Product Details */}
      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        {/* Brand */}
        {product.brand && (
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 1,
              mb: 0.5,
            }}
          >
            {product.brand}
          </Typography>
        )}

        {/* Product Name */}
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
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Rating
            value={product.rating}
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
            ({product.reviews})
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
            ${product.price}
          </Typography>
          {product.originalPrice && product.originalPrice > product.price && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'line-through',
                color: 'rgba(255, 255, 255, 0.5)',
                mr: 1,
              }}
            >
              ${product.originalPrice}
            </Typography>
          )}
          {getDiscountPercentage() > 0 && (
            <Chip
              label={`${getDiscountPercentage()}% OFF`}
              size="small"
              sx={{
                background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: 24,
              }}
            />
          )}
        </Box>

        {/* Add to Cart Button */}
        <Zoom in={isHovered}>
          <Button
            fullWidth
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            startIcon={<ShoppingCartOutlined />}
            sx={{
              background: product.stock === 0 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              color: '#ffffff',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: product.stock === 0 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'linear-gradient(135deg, #333333 0%, #000000 100%)',
                transform: product.stock === 0 ? 'none' : 'translateY(-2px)',
                boxShadow: product.stock === 0 ? 'none' : '0 8px 25px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Zoom>
      </CardContent>
    </Card>
  );
};

export default ProductCard;