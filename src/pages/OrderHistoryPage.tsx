/**
 * Enhanced Order History Page with Premium UI/UX and Advanced Effects
 * Features: Order timeline, status tracking, invoice downloads, reorder functionality
 * Design: Dark theme with glassmorphism, animations, and premium interactions
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  LinearProgress,
  Skeleton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  Fade,
  Zoom,
  Slide
} from '@mui/material';

import{
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';

import {
  ShoppingBag as ShoppingBagIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  MoreVert as MoreVertIcon,
  Reorder as ReorderIcon,
  Support as SupportIcon,
  Visibility as VisibilityIcon,
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  LocalOffer as LocalOfferIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  TrackChanges as TrackChangesIcon,
  Inventory as InventoryIcon,
  LocalAtm as LocalAtmIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
  Schedule as ScheduleIcon,
  CheckBox as CheckBoxIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

// Interfaces
interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  subtotal: number;
  reviewed?: boolean;
}

interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  timestamp: string;
  description: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus['status'];
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  statusHistory: OrderStatus[];
  canCancel: boolean;
  canReturn: boolean;
  canReorder: boolean;
  invoiceUrl?: string;
}

const OrderHistoryPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [reviewDialog, setReviewDialog] = useState<{
    open: boolean;
    orderId: string;
    itemId: string;
    productName: string;
  } | null>(null);
  const [trackingDialog, setTrackingDialog] = useState<{
    open: boolean;
    order: Order | null;
  }>({ open: false, order: null });
  const [menuAnchor, setMenuAnchor] = useState<{
    element: HTMLElement | null;
    orderId: string;
  }>({ element: null, orderId: '' });

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'AB123456',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Premium Black Leather Jacket',
          productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
          price: 299.99,
          quantity: 1,
          size: 'M',
          color: 'Black',
          subtotal: 299.99,
          reviewed: false
        }
      ],
      totalAmount: 309.98,
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: 'Credit Card ending in 1234',
      trackingNumber: 'AB123456789',
      estimatedDelivery: '2024-01-18',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-15T10:00:00Z', description: 'Order placed' },
        { status: 'confirmed', timestamp: '2024-01-15T11:00:00Z', description: 'Payment confirmed' },
        { status: 'processing', timestamp: '2024-01-15T14:00:00Z', description: 'Order processing' },
        { status: 'shipped', timestamp: '2024-01-16T09:00:00Z', description: 'Order shipped' },
        { status: 'delivered', timestamp: '2024-01-17T15:30:00Z', description: 'Order delivered' }
      ],
      canCancel: false,
      canReturn: true,
      canReorder: true,
      invoiceUrl: '/api/orders/1/invoice'
    },
    {
      id: '2',
      orderNumber: 'AB123457',
      date: '2024-01-20',
      status: 'shipped',
      items: [
        {
          id: '2',
          productId: '2',
          productName: 'Elegant Black Dress',
          productImage: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400',
          price: 189.99,
          quantity: 1,
          size: 'S',
          color: 'Black',
          subtotal: 189.99
        },
        {
          id: '3',
          productId: '3',
          productName: 'Luxury Black Handbag',
          productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          price: 249.99,
          quantity: 1,
          subtotal: 249.99
        }
      ],
      totalAmount: 449.97,
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: 'Credit Card ending in 1234',
      trackingNumber: 'AB123456790',
      estimatedDelivery: '2024-01-25',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-20T10:00:00Z', description: 'Order placed' },
        { status: 'confirmed', timestamp: '2024-01-20T11:00:00Z', description: 'Payment confirmed' },
        { status: 'processing', timestamp: '2024-01-20T14:00:00Z', description: 'Order processing' },
        { status: 'shipped', timestamp: '2024-01-21T09:00:00Z', description: 'Order shipped' }
      ],
      canCancel: false,
      canReturn: false,
      canReorder: true,
      invoiceUrl: '/api/orders/2/invoice'
    },
    {
      id: '3',
      orderNumber: 'AB123458',
      date: '2024-01-25',
      status: 'processing',
      items: [
        {
          id: '4',
          productId: '4',
          productName: 'Designer Black Boots',
          productImage: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
          price: 199.99,
          quantity: 1,
          size: '9',
          color: 'Black',
          subtotal: 199.99
        }
      ],
      totalAmount: 209.98,
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: 'PayPal',
      estimatedDelivery: '2024-01-30',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-25T10:00:00Z', description: 'Order placed' },
        { status: 'confirmed', timestamp: '2024-01-25T11:00:00Z', description: 'Payment confirmed' },
        { status: 'processing', timestamp: '2024-01-25T14:00:00Z', description: 'Order processing' }
      ],
      canCancel: true,
      canReturn: false,
      canReorder: true,
      invoiceUrl: '/api/orders/3/invoice'
    }
  ];

  const tabs = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  // Initialize data
  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on tab and search
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (tabs[activeTab].value !== 'all') {
      filtered = filtered.filter(order => order.status === tabs[activeTab].value);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredOrders(filtered);
  }, [orders, activeTab, searchQuery]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '#ffaa00';
      case 'confirmed': return '#00aaff';
      case 'processing': return '#ff9800';
      case 'shipped': return '#2196f3';
      case 'delivered': return '#00ff88';
      case 'cancelled': return '#ff4444';
      case 'returned': return '#9c27b0';
      default: return '#cccccc';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <TimerIcon />;
      case 'confirmed': return <CheckBoxIcon />;
      case 'processing': return <InventoryIcon />;
      case 'shipped': return <ShippingIcon />;
      case 'delivered': return <CheckCircleIcon />;
      case 'cancelled': return <CancelIcon />;
      case 'returned': return <RefreshIcon />;
      default: return <InfoIcon />;
    }
  };

  const handleOrderAction = (action: string, orderId: string) => {
    setMenuAnchor({ element: null, orderId: '' });
    
    switch (action) {
      case 'track':
        const order = orders.find(o => o.id === orderId);
        if (order) {
          setTrackingDialog({ open: true, order });
        }
        break;
      case 'reorder':
        // Implement reorder logic
        navigate('/checkout');
        break;
      case 'cancel':
        // Implement cancel logic
        break;
      case 'return':
        // Implement return logic
        break;
      case 'download':
        // Implement invoice download
        break;
      case 'support':
        // Implement support contact
        break;
    }
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    // Implement review submission
    setReviewDialog(null);
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: 'white',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="text" width={300} height={60} />
            <Skeleton variant="text" width={500} height={30} />
          </Box>
          
          <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
        </Container>
      </Box>
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 1
          }}>
            Order History
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1rem',
            mb: 3
          }}>
            Track your orders and manage your purchases
          </Typography>

          {/* Search and Filter */}
          <Paper sx={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            p: 2,
            mb: 3
          }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Search orders or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiInputBase-input': {
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.7)',
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
              
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Filter
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Tabs */}
        <Card sx={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          mb: 4
        }}>
          <Tabs
            value={activeTab}
            onChange={(e, value) => setActiveTab(value)}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#00ff88',
              },
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                '&.Mui-selected': {
                  color: '#00ff88',
                },
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {tab.label}
                    <Badge
                      badgeContent={
                        tab.value === 'all' 
                          ? orders.length 
                          : orders.filter(o => o.status === tab.value).length
                      }
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#00ff88',
                          color: 'black',
                          fontWeight: 600,
                        }
                      }}
                    />
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Card>

        {/* Orders List */}
        <Box>
          {filteredOrders.length === 0 ? (
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
              p: 6,
              textAlign: 'center'
            }}>
              <ShoppingBagIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                No orders found
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                {searchQuery ? 'Try adjusting your search criteria' : 'Start shopping to see your orders here'}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/products')}
                sx={{
                  background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                  color: 'black',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start Shopping
              </Button>
            </Card>
          ) : (
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card sx={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    mb: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      {/* Order Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            Order #{order.orderNumber}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip
                            icon={getStatusIcon(order.status)}
                            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            sx={{
                              backgroundColor: alpha(getStatusColor(order.status), 0.2),
                              color: getStatusColor(order.status),
                              border: `1px solid ${getStatusColor(order.status)}`,
                              fontWeight: 600,
                            }}
                          />
                          
                          <IconButton
                            onClick={(e) => setMenuAnchor({ element: e.currentTarget, orderId: order.id })}
                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Order Summary */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </Typography>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            ${order.totalAmount.toFixed(2)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            onClick={() => setExpandedOrder(
                              expandedOrder === order.id ? null : order.id
                            )}
                            endIcon={
                              expandedOrder === order.id ? <ExpandLessIcon /> : <ExpandMoreIcon />
                            }
                            sx={{
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                              }
                            }}
                          >
                            {expandedOrder === order.id ? 'Show Less' : 'Show Details'}
                          </Button>
                          
                          {order.trackingNumber && (
                            <Button
                              onClick={() => setTrackingDialog({ open: true, order })}
                              sx={{
                                color: '#00ff88',
                                '&:hover': {
                                  backgroundColor: 'rgba(0,255,136,0.1)',
                                }
                              }}
                            >
                              Track Order
                            </Button>
                          )}
                        </Box>
                      </Box>

                      {/* Progress Bar */}
                      <LinearProgress
                        variant="determinate"
                        value={
                          order.status === 'pending' ? 20 :
                          order.status === 'confirmed' ? 40 :
                          order.status === 'processing' ? 60 :
                          order.status === 'shipped' ? 80 :
                          order.status === 'delivered' ? 100 : 0
                        }
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getStatusColor(order.status),
                            borderRadius: 2,
                          },
                        }}
                      />

                      {/* Expanded Details */}
                      <Collapse in={expandedOrder === order.id}>
                        <Box sx={{ mt: 3 }}>
                          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
                          
                          {/* Order Items */}
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                            Items
                          </Typography>
                          
                          <List>
                            {order.items.map((item) => (
                              <ListItem key={item.id} sx={{ px: 0 }}>
                                <ListItemAvatar>
                                  <Avatar
                                    src={item.productImage}
                                    alt={item.productName}
                                    sx={{ width: 60, height: 60, borderRadius: 2 }}
                                  />
                                </ListItemAvatar>
                                
                                <ListItemText
                                  primary={
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                                      {item.productName}
                                    </Typography>
                                  }
                                  secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                      {item.size && (
                                        <Chip label={`Size: ${item.size}`} size="small" sx={{
                                          backgroundColor: 'rgba(255,255,255,0.1)',
                                          color: 'rgba(255,255,255,0.8)',
                                          fontSize: '0.7rem'
                                        }} />
                                      )}
                                      {item.color && (
                                        <Chip label={`Color: ${item.color}`} size="small" sx={{
                                          backgroundColor: 'rgba(255,255,255,0.1)',
                                          color: 'rgba(255,255,255,0.8)',
                                          fontSize: '0.7rem'
                                        }} />
                                      )}
                                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        Qty: {item.quantity}
                                      </Typography>
                                    </Box>
                                  }
                                />
                                
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                                    ${item.subtotal.toFixed(2)}
                                  </Typography>
                                  
                                  {order.status === 'delivered' && !item.reviewed && (
                                    <Button
                                      size="small"
                                      onClick={() => setReviewDialog({
                                        open: true,
                                        orderId: order.id,
                                        itemId: item.id,
                                        productName: item.productName
                                      })}
                                      sx={{
                                        color: '#00ff88',
                                        fontSize: '0.8rem',
                                        mt: 1,
                                        '&:hover': {
                                          backgroundColor: 'rgba(0,255,136,0.1)',
                                        }
                                      }}
                                    >
                                      Write Review
                                    </Button>
                                  )}
                                </Box>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </Box>

        {/* Order Action Menu */}
        <Menu
          anchorEl={menuAnchor.element}
          open={Boolean(menuAnchor.element)}
          onClose={() => setMenuAnchor({ element: null, orderId: '' })}
          PaperProps={{
            sx: {
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              backdropFilter: 'blur(20px)',
            }
          }}
        >
          <MenuItem onClick={() => handleOrderAction('track', menuAnchor.orderId)}>
            <ListItemIcon>
              <TrackChangesIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="Track Order" />
          </MenuItem>
          
          <MenuItem onClick={() => handleOrderAction('download', menuAnchor.orderId)}>
            <ListItemIcon>
              <DownloadIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="Download Invoice" />
          </MenuItem>
          
          <MenuItem onClick={() => handleOrderAction('reorder', menuAnchor.orderId)}>
            <ListItemIcon>
              <ReorderIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="Reorder Items" />
          </MenuItem>
          
          <MenuItem onClick={() => handleOrderAction('support', menuAnchor.orderId)}>
            <ListItemIcon>
              <SupportIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="Contact Support" />
          </MenuItem>
        </Menu>

        {/* Review Dialog */}
        <Dialog
          open={Boolean(reviewDialog)}
          onClose={() => setReviewDialog(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              backdropFilter: 'blur(20px)',
            }
          }}
        >
          <DialogTitle sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            Write a Review
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
              {reviewDialog?.productName}
            </Typography>
            
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
              Rate this product
            </Typography>
            
            <Rating
              size="large"
              sx={{
                mb: 3,
                '& .MuiRating-iconFilled': {
                  color: '#ffd700',
                },
                '& .MuiRating-iconEmpty': {
                  color: 'rgba(255,255,255,0.3)',
                },
              }}
            />
            
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share your experience with this product..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
          </DialogContent>
          
          <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              onClick={() => setReviewDialog(null)}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleReviewSubmit(5, 'Great product!')}
              sx={{
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                },
              }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tracking Dialog */}
        <Dialog
          open={trackingDialog.open}
          onClose={() => setTrackingDialog({ open: false, order: null })}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              backdropFilter: 'blur(20px)',
            }
          }}
        >
          <DialogTitle sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            Track Order #{trackingDialog.order?.orderNumber}
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            {trackingDialog.order && (
              <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Tracking Number: {trackingDialog.order.trackingNumber}
                </Typography>
                
                <Timeline>
                  {trackingDialog.order.statusHistory.map((status, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot sx={{ backgroundColor: getStatusColor(status.status) }}>
                          {getStatusIcon(status.status)}
                        </TimelineDot>
                        {index < trackingDialog.order!.statusHistory.length - 1 && (
                          <TimelineConnector sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                          {status.description}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {new Date(status.timestamp).toLocaleString()}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              onClick={() => setTrackingDialog({ open: false, order: null })}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;