/**
 * Enhanced Header Component with Advanced UI/UX
 * Features: Smart search, user menu, cart/wishlist indicators, animations
 */

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Paper,
  Fade,
  Zoom,
  Slide,
  useTheme,
  useMediaQuery,
  Autocomplete,
  Stack,
  Backdrop,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  LocalOffer as OfferIcon,
  TrendingUp as TrendingIcon,
  Clear as ClearIcon,
  ArrowForward as ArrowIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick?: () => void;
}

interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Black Leather Jacket',
    'Designer Dress',
    'Luxury Handbag'
  ]);
  const [trendingSearches] = useState<string[]>([
    'Winter Collection',
    'Premium Accessories',
    'Designer Shoes',
    'Black Friday Deals'
  ]);

  // Mock user data - replace with actual Redux state
  const user = {
    isAuthenticated: true,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  };

  // Mock cart/wishlist data - replace with actual Redux state
  const cartItems = 3;
  const wishlistItems = 7;
  const notifications = 2;

  // Mock search suggestions
  const mockSearchSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      name: 'Premium Black Leather Jacket',
      category: 'Jackets',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Elegant Black Dress',
      category: 'Dresses',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=100',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Luxury Black Handbag',
      category: 'Bags',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100',
      rating: 4.9
    }
  ];

  // Search functionality
  const handleSearch = (query: string) => {
    if (query.trim()) {
      setLoading(true);
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [query, ...prev.filter(item => item !== query)];
        return updated.slice(0, 5);
      });
      
      // Navigate to search results
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setSearchQuery('');
      setSearchFocused(false);
      setLoading(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    
    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = mockSearchSuggestions.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setUserMenuAnchor(null);
    navigate('/sign-in');
  };

  const navigation = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Products', path: '/products', icon: CategoryIcon },
    { name: 'Categories', path: '/categories', icon: CategoryIcon },
    { name: 'Orders', path: '/orders', icon: HistoryIcon },
    { name: 'Profile', path: '/profile', icon: PersonIcon },
  ];

  const quickLinks = [
    { name: 'Free Shipping', icon: ShippingIcon },
    { name: 'Secure Payment', icon: SecurityIcon },
    { name: '24/7 Support', icon: SupportIcon },
    { name: 'Premium Quality', icon: StarIcon },
  ];

  return (
    <>
      {/* Enhanced AppBar with glassmorphism effect */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          zIndex: theme.zIndex.appBar + 1
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 72 }, px: { xs: 2, sm: 3 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ 
                mr: 2,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h5"
            component="div"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mr: 4,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
              }
            }}
          >
            AllBlackery
          </Typography>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, mr: 4 }}>
              {navigation.slice(0, 3).map((item) => (
                <Button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    textTransform: 'none',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: 2,
                      backgroundColor: '#ffffff',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Enhanced Search Bar */}
          <Box sx={{ 
            flexGrow: 1, 
            maxWidth: { xs: '100%', sm: 600 },
            mx: { xs: 0, sm: 2 },
            position: 'relative'
          }}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                },
                '&:focus-within': {
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.1)',
                }
              }}
            >
              <TextField
                fullWidth
                placeholder="Search for premium fashion..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchSuggestions([]);
                        }}
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiInputBase-input': {
                      py: 1.5,
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.7)',
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
            </Paper>

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Paper
                    elevation={24}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 9999,
                      mt: 1,
                      maxHeight: 400,
                      overflowY: 'auto',
                      background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Search Suggestions */}
                    {searchSuggestions.length > 0 && (
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          Suggestions
                        </Typography>
                        {searchSuggestions.map((suggestion) => (
                          <Box
                            key={suggestion.id}
                            onClick={() => navigate(`/products/${suggestion.id}`)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              p: 1,
                              borderRadius: 1,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={suggestion.image}
                              alt={suggestion.name}
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                objectFit: 'cover',
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                {suggestion.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                  label={suggestion.category}
                                  size="small"
                                  sx={{
                                    height: 16,
                                    fontSize: '0.7rem',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.7)',
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  ${suggestion.price}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <StarIcon sx={{ fontSize: 16, color: '#ffd700' }} />
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {suggestion.rating}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Recent Searches */}
                    {searchQuery === '' && recentSearches.length > 0 && (
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          Recent Searches
                        </Typography>
                        {recentSearches.map((search, index) => (
                          <Box
                            key={index}
                            onClick={() => handleSearch(search)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              p: 1,
                              borderRadius: 1,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <HistoryIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }} />
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                              {search}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Trending Searches */}
                    {searchQuery === '' && (
                      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          Trending
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {trendingSearches.map((trend, index) => (
                            <Chip
                              key={index}
                              label={trend}
                              size="small"
                              onClick={() => handleSearch(trend)}
                              icon={<TrendingIcon sx={{ fontSize: 16 }} />}
                              sx={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.8)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255,255,255,0.2)',
                                  transform: 'scale(1.05)',
                                },
                                transition: 'all 0.2s ease',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton
              onClick={handleNotificationMenuClick}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Wishlist */}
            <IconButton
              onClick={() => navigate('/wishlist')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Badge badgeContent={wishlistItems} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* Cart */}
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Badge badgeContent={cartItems} color="primary">
                <CartIcon />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {user.isAuthenticated ? (
              <IconButton
                onClick={handleUserMenuClick}
                sx={{
                  ml: 1,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.firstName}
                  sx={{
                    width: 36,
                    height: 36,
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate('/sign-in')}
                sx={{
                  ml: 1,
                  background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                  color: 'black',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>

        {/* Quick Links Bar */}
        {!isMobile && (
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              py: 1,
              px: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              {quickLinks.map((link, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'white',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <link.icon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {link.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 24,
          sx: {
            mt: 1,
            minWidth: 200,
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {user.email}
          </Typography>
        </Box>
        
        <MenuItem onClick={() => { navigate('/profile'); setUserMenuAnchor(null); }}>
          <ListItemIcon>
            <PersonIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        
        <MenuItem onClick={() => { navigate('/orders'); setUserMenuAnchor(null); }}>
          <ListItemIcon>
            <HistoryIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
          </ListItemIcon>
          <ListItemText primary="Order History" />
        </MenuItem>
        
        {/* <MenuItem onClick={() => { navigate('/settings'); setUserMenuAnchor(null); }}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem> */}
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={() => setNotificationMenuAnchor(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 24,
          sx: {
            mt: 1,
            minWidth: 300,
            maxWidth: 400,
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          <MenuItem>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#00ff88',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Order Shipped
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Your order #AB123456 has been shipped
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          
          <MenuItem>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#ffaa00',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Special Offer
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  30% off on all black collection items
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <MenuItem onClick={() => { navigate('/notifications'); setNotificationMenuAnchor(null); }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', width: '100%' }}>
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
            border: 'none',
            borderRight: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              AllBlackery
            </Typography>
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        
        <List>
          {navigation.map((item) => (
            <ListItem
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon>
                <item.icon sx={{ color: 'rgba(255,255,255,0.7)' }} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  '& .MuiTypography-root': {
                    color: 'white',
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Header;