/**
 * Advanced Product List Page with Stunning Filters and Animations
 * Premium shopping experience with advanced filtering and beautiful UI
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import {
  Home,
  ArrowForward,
  FilterList,
  Sort,
  ViewModule,
  ViewList,
  TrendingUp,
  Star,
  LocalOffer,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { IProduct, IProductFilters } from '../interfaces/ProductInterface';
import productApi from '../apis/productApi';

// Animation keyframes
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

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

const ProductListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<IProductFilters>({});
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  // Quick filters
  const quickFilters = [
    { label: 'Featured', value: { featured: true }, icon: Star, color: '#ffd700' },
    { label: 'On Sale', value: { minPrice: 0, maxPrice: 200 }, icon: LocalOffer, color: '#ff4444' },
    { label: 'New Arrivals', value: { sortBy: 'newest' }, icon: TrendingUp, color: '#00ff88' },
    { label: 'Best Rated', value: { sortBy: 'rating' }, icon: Star, color: '#4ECDC4' },
  ];

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProducts(filters);
        setProducts(response.data?.products || []);
        setTotalProducts(response.data?.pagination.total || 0);
        setTotalPages(response.data?.pagination.pages || 1);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: IProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters(prev => ({ ...prev, page }));
  };

  // Handle product interactions
  const handleProductClick = (product: IProduct) => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (product: IProduct) => {
    // Add to cart logic
    console.log('Adding to cart:', product.name);
  };

  const handleToggleWishlist = (product: IProduct) => {
    setWishlistItems(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleShare = (product: IProduct) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `${window.location.origin}/products/${product.id}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`);
    }
  };

  // Apply quick filter
  const applyQuickFilter = (filterValue: any) => {
    setFilters(prev => ({ ...prev, ...filterValue }));
  };

  return (
    <Box sx={{ pt: 10, pb: 6, minHeight: '100vh' }}>
      <Container maxWidth="xl">
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
                  '&:hover': {
                    color: '#ffffff',
                  },
                }}
              >
                <Home sx={{ mr: 0.5, fontSize: 20 }} />
                Home
              </Link>
              <Typography sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                Products
              </Typography>
            </Breadcrumbs>
          </Box>
        </Fade>

        {/* Page Header */}
        <Slide direction="up" in timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                mb: 2,
                color: '#ffffff',
                background: 'linear-gradient(45deg, #ffffff, #cccccc)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${slideInFromLeft} 1s ease-out`,
              }}
            >
              Premium Collection
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
                animation: `${slideInFromRight} 1s ease-out`,
              }}
            >
              Discover our curated selection of luxury fashion pieces, 
              crafted with attention to detail and timeless elegance.
            </Typography>
          </Box>
        </Slide>

        {/* Quick Filters */}
        <Fade in timeout={1200}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <FilterList />
              Quick Filters
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {quickFilters.map((filter, index) => (
                <Chip
                  key={filter.label}
                  label={filter.label}
                  icon={<filter.icon />}
                  onClick={() => applyQuickFilter(filter.value)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: `1px solid ${filter.color}`,
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    height: 44,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `${floatAnimation} ${3 + index * 0.5}s ease-in-out infinite`,
                    '&:hover': {
                      backgroundColor: filter.color,
                      color: '#000000',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${filter.color}30`,
                    },
                    '& .MuiChip-icon': {
                      color: 'inherit',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>

        {/* Product Grid */}
        <Fade in timeout={1400}>
          <ProductGrid
            products={products}
            loading={loading}
            onFilterChange={handleFilterChange}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onShare={handleShare}
            wishlistItems={wishlistItems}
            totalProducts={totalProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Fade>

        {/* Statistics */}
        {!loading && products.length > 0 && (
          <Fade in timeout={1600}>
            <Box
              sx={{
                mt: 8,
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Collection Statistics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 'bold' }}>
                    {totalProducts}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Total Products
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                    {products.filter(p => p.featured).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Featured Items
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: '#ffd700', fontWeight: 'bold' }}>
                    {products.filter(p => p.discount && p.discount > 0).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    On Sale
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: '#ff4444', fontWeight: 'bold' }}>
                    4.8
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Avg Rating
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        )}

        {/* Call to Action */}
        <Fade in timeout={1800}>
          <Box
            sx={{
              mt: 8,
              p: 6,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.9))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Can't Find What You're Looking For?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Our personal stylists are here to help you find the perfect piece
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 3,
                background: 'linear-gradient(45deg, #000000, #333333)',
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #333333, #000000)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Contact Personal Stylist
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ProductListPage;