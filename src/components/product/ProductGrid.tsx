/**
 * Advanced Product Grid Component
 * Responsive grid with filtering, sorting, and beautiful animations
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Chip,
  Button,
  Collapse,
  IconButton,
  Skeleton,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FilterList,
  Sort,
  ViewModule,
  ViewList,
  Search,
  Clear,
  TuneOutlined,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { IProduct, IProductFilters } from '../../interfaces/ProductInterface';
import ProductCard from './ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const staggerAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface ProductGridProps {
  products: IProduct[];
  loading?: boolean;
  onFilterChange?: (filters: IProductFilters) => void;
  onProductClick?: (product: IProduct) => void;
  onAddToCart?: (product: IProduct) => void;
  onToggleWishlist?: (product: IProduct) => void;
  onShare?: (product: IProduct) => void;
  wishlistItems?: string[];
  totalProducts?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

/**
 * Advanced Product Grid with filtering, sorting, and animations
 * @param products - Array of products
 * @param loading - Loading state
 * @param onFilterChange - Filter change handler
 * @param onProductClick - Product click handler
 * @param onAddToCart - Add to cart handler
 * @param onToggleWishlist - Toggle wishlist handler
 * @param onShare - Share handler
 * @param wishlistItems - Array of wishlist product IDs
 * @param totalProducts - Total number of products
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param onPageChange - Page change handler
 */
const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onFilterChange,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  onShare,
  wishlistItems = [],
  totalProducts = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Filter options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
  ];

  const categories = [
    { value: 'jackets', label: 'Jackets' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'blazers', label: 'Blazers' },
    { value: 'bags', label: 'Bags' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const brands = ['AllBlackery', 'Premium Collection', 'Luxury Line'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'Dark Brown', 'Charcoal', 'Matte Black'];

  // Handle filter changes
  useEffect(() => {
    const filters: IProductFilters = {
      search: searchQuery || undefined,
      categoryId: selectedCategory || undefined,
      sortBy: sortBy as any,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
      colors: selectedColors.length > 0 ? selectedColors : undefined,
      featured: featuredOnly || undefined,
    };

    onFilterChange?.(filters);
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
    featuredOnly,
    onFilterChange,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('newest');
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setFeaturedOnly(false);
  };

  const getGridColumns = () => {
    if (viewMode === 'list') return 1;
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const renderProductSkeleton = () => (
    <Box
      sx={{
        animation: `${fadeInUp} 0.6s ease-out`,
      }}
    >
      <Skeleton
        variant="rectangular"
        height={240}
        sx={{
          borderRadius: 2,
          mb: 2,
        }}
      />
      <Skeleton variant="text" height={28} width="80%" />
      <Skeleton variant="text" height={20} width="60%" />
      <Skeleton variant="text" height={32} width="40%" />
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with Search, Sort, and View Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          mb: 3,
          p: 3,
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Search Bar */}
        <TextField
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />,
            endAdornment: searchQuery && (
              <IconButton
                onClick={() => setSearchQuery('')}
                sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                <Clear />
              </IconButton>
            ),
          }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              color: '#ffffff',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ffffff',
              },
            },
          }}
        />

        {/* Sort Control */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            startAdornment={<Sort sx={{ mr: 1 }} />}
            sx={{
              color: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* View Mode and Filter Toggle */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            sx={{
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {viewMode === 'grid' ? <ViewList /> : <ViewModule />}
          </IconButton>

          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              color: '#ffffff',
              background: showFilters ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <TuneOutlined />
          </IconButton>
        </Box>
      </Box>

      {/* Advanced Filters */}
      <Collapse in={showFilters}>
        <Box
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
            Advanced Filters
          </Typography>

          <Grid container spacing={3}>
            {/* Category Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price Range */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Typography>
              <Box sx={{ px: 1 }}>
                {/* Price range slider would go here */}
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Use slider to adjust price range
                </Typography>
              </Box>
            </Grid>

            {/* Featured Only */}
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant={featuredOnly ? 'contained' : 'outlined'}
                onClick={() => setFeaturedOnly(!featuredOnly)}
                sx={{
                  width: '100%',
                  color: featuredOnly ? '#000000' : '#ffffff',
                  backgroundColor: featuredOnly ? '#ffd700' : 'transparent',
                  borderColor: '#ffd700',
                  '&:hover': {
                    backgroundColor: featuredOnly ? '#ffed4a' : 'rgba(255, 215, 0, 0.1)',
                  },
                }}
              >
                Featured Only
              </Button>
            </Grid>

            {/* Clear Filters */}
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                onClick={clearFilters}
                startIcon={<Clear />}
                sx={{
                  width: '100%',
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>

          {/* Active Filters */}
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedCategory && (
              <Chip
                label={`Category: ${categories.find(c => c.value === selectedCategory)?.label}`}
                onDelete={() => setSelectedCategory('')}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              />
            )}
            {searchQuery && (
              <Chip
                label={`Search: ${searchQuery}`}
                onDelete={() => setSearchQuery('')}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              />
            )}
            {featuredOnly && (
              <Chip
                label="Featured Only"
                onDelete={() => setFeaturedOnly(false)}
                sx={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#ffd700' }}
              />
            )}
          </Box>
        </Box>
      </Collapse>

      {/* Results Summary */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          {totalProducts > 0 ? `${totalProducts} Products Found` : 'No Products Found'}
        </Typography>
        {totalProducts > 0 && (
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Showing {products.length} of {totalProducts} products
          </Typography>
        )}
      </Box>

      {/* Product Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {renderProductSkeleton()}
            </Grid>
          ))}
        </Grid>
      ) : products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid 
              item 
              xs={12} 
              sm={getGridColumns() === 1 ? 12 : 6} 
              md={12 / getGridColumns()}
              key={product.id}
            >
              <Fade
                in={true}
                timeout={300 + index * 100}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div>
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onShare={onShare}
                    isInWishlist={wishlistItems.includes(product.id)}
                    variant={product.featured ? 'featured' : 'default'}
                  />
                </div>
              </Fade>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: '#ffffff', mb: 2 }}>
            No Products Found
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
            Try adjusting your search criteria or clearing filters
          </Typography>
          <Button
            variant="outlined"
            onClick={clearFilters}
            sx={{
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                onClick={() => onPageChange?.(index + 1)}
                sx={{
                  minWidth: 44,
                  height: 44,
                  borderRadius: 2,
                  color: currentPage === index + 1 ? '#000000' : '#ffffff',
                  backgroundColor: currentPage === index + 1 ? '#ffffff' : 'transparent',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: currentPage === index + 1 ? '#f5f5f5' : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;