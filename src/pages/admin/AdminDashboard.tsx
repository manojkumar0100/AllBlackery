/**
 * Enhanced Admin Dashboard with Premium UI/UX and Advanced Effects
 * Features: Analytics, product management, order management, user management, reports
 * Design: Dark theme with glassmorphism, animations, and premium interactions
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  alpha,
  Switch,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Alert,
  Snackbar} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ShoppingBag as ShoppingBagIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  StarRate as StarRateIcon,
  LocalShipping as LocalShippingIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Category as CategoryIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as PayPalIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Interfaces
interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  usersGrowth: number;
  productsGrowth: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
}

interface TopProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  sales: number;
  revenue: number;
  rating: number;
  reviews: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  joinedDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
}

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<{ element: HTMLElement | null; id: string }>({ element: null, id: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as any });

  // Mock data
  const mockStats: DashboardStats = {
    totalRevenue: 125430.50,
    totalOrders: 1247,
    totalUsers: 3520,
    totalProducts: 156,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    usersGrowth: 15.2,
    productsGrowth: 4.7
  };

  const mockRecentOrders: RecentOrder[] = [
    {
      id: '1',
      orderNumber: 'AB123456',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      amount: 299.99,
      status: 'shipped',
      date: '2024-01-20T10:30:00Z',
      items: 2
    },
    {
      id: '2',
      orderNumber: 'AB123457',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      amount: 149.99,
      status: 'pending',
      date: '2024-01-20T09:15:00Z',
      items: 1
    },
    {
      id: '3',
      orderNumber: 'AB123458',
      customerName: 'Mike Johnson',
      customerEmail: 'mike.johnson@example.com',
      amount: 489.99,
      status: 'delivered',
      date: '2024-01-19T16:45:00Z',
      items: 3
    },
    {
      id: '4',
      orderNumber: 'AB123459',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah.wilson@example.com',
      amount: 199.99,
      status: 'confirmed',
      date: '2024-01-19T14:20:00Z',
      items: 1
    }
  ];

  const mockTopProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Premium Black Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      category: 'Jackets',
      sales: 87,
      revenue: 26099.13,
      rating: 4.8,
      reviews: 127
    },
    {
      id: '2',
      name: 'Elegant Black Dress',
      image: 'https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400',
      category: 'Dresses',
      sales: 64,
      revenue: 12159.36,
      rating: 4.9,
      reviews: 89
    },
    {
      id: '3',
      name: 'Luxury Black Handbag',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      category: 'Bags',
      sales: 42,
      revenue: 10499.58,
      rating: 4.9,
      reviews: 234
    },
    {
      id: '4',
      name: 'Designer Black Boots',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
      category: 'Shoes',
      sales: 35,
      revenue: 6999.65,
      rating: 4.7,
      reviews: 156
    }
  ];

  const mockUsers: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      role: 'user',
      status: 'active',
      joinedDate: '2023-01-15',
      lastLogin: '2024-01-20T10:30:00Z',
      totalOrders: 12,
      totalSpent: 2450.99
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b36c4877?w=100',
      role: 'user',
      status: 'active',
      joinedDate: '2023-03-22',
      lastLogin: '2024-01-19T15:45:00Z',
      totalOrders: 8,
      totalSpent: 1890.50
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      role: 'admin',
      status: 'active',
      joinedDate: '2022-11-10',
      lastLogin: '2024-01-20T08:20:00Z',
      totalOrders: 0,
      totalSpent: 0
    }
  ];

  const tabs = [
    { label: 'Overview', icon: DashboardIcon },
    { label: 'Orders', icon: ShoppingBagIcon },
    { label: 'Products', icon: InventoryIcon },
    { label: 'Users', icon: PeopleIcon },
    { label: 'Analytics', icon: AnalyticsIcon },
    { label: 'Settings', icon: SettingsIcon }
  ];

  // Initialize data
  useEffect(() => {
    setTimeout(() => {
      setDashboardStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setTopProducts(mockTopProducts);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffaa00';
      case 'confirmed': return '#00aaff';
      case 'shipped': return '#2196f3';
      case 'delivered': return '#00ff88';
      case 'cancelled': return '#ff4444';
      case 'active': return '#00ff88';
      case 'inactive': return '#ffaa00';
      case 'banned': return '#ff4444';
      default: return '#cccccc';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ScheduleIcon />;
      case 'confirmed': return <CheckCircleIcon />;
      case 'shipped': return <LocalShippingIcon />;
      case 'delivered': return <CheckCircleIcon />;
      case 'cancelled': return <CancelIcon />;
      case 'active': return <CheckCircleIcon />;
      case 'inactive': return <WarningIcon />;
      case 'banned': return <ErrorIcon />;
      default: return <InfoIcon />;
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor({ element: event.currentTarget, id });
  };

  const handleMenuClose = () => {
    setMenuAnchor({ element: null, id: '' });
  };

  const handleAction = (action: string, item: any) => {
    handleMenuClose();
    setSelectedItem(item);
    
    switch (action) {
      case 'view':
        // Implement view action
        break;
      case 'edit':
        setDialogOpen(true);
        break;
      case 'delete':
        // Implement delete action
        setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
        break;
      default:
        break;
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 0:
        return <OverviewTab />;
      case 1:
        return <OrdersTab />;
      case 2:
        return <ProductsTab />;
      case 3:
        return <UsersTab />;
      case 4:
        return <AnalyticsTab />;
      case 5:
        return <SettingsTab />;
      default:
        return null;
    }
  };

  // Tab Components
  const OverviewTab = () => (
    <Box>
      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(0,255,136,0.1) 0%, rgba(0,204,102,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: 3,
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,255,136,0.3)',
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <AttachMoneyIcon sx={{ fontSize: 40, color: '#00ff88' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                  <Typography variant="caption" sx={{ color: '#00ff88', fontWeight: 600 }}>
                    +{dashboardStats?.revenueGrowth}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                ${dashboardStats?.totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Revenue
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(33,150,243,0.1) 0%, rgba(21,101,192,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(33,150,243,0.2)',
              borderRadius: 3,
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(33,150,243,0.3)',
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <ShoppingBagIcon sx={{ fontSize: 40, color: '#2196f3' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                  <Typography variant="caption" sx={{ color: '#00ff88', fontWeight: 600 }}>
                    +{dashboardStats?.ordersGrowth}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                {dashboardStats?.totalOrders.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Orders
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(255,170,0,0.1) 0%, rgba(230,150,0,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,170,0,0.2)',
              borderRadius: 3,
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(255,170,0,0.3)',
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: '#ffaa00' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                  <Typography variant="caption" sx={{ color: '#00ff88', fontWeight: 600 }}>
                    +{dashboardStats?.usersGrowth}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                {dashboardStats?.totalUsers.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Users
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(156,39,176,0.1) 0%, rgba(123,31,162,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(156,39,176,0.2)',
              borderRadius: 3,
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(156,39,176,0.3)',
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <InventoryIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#00ff88' }} />
                  <Typography variant="caption" sx={{ color: '#00ff88', fontWeight: 600 }}>
                    +{dashboardStats?.productsGrowth}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                {dashboardStats?.totalProducts.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Products
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Orders & Top Products */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 3
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
              Recent Orders
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Order</TableCell>
                    <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Customer</TableCell>
                    <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell sx={{ color: 'white' }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            #{order.orderNumber}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {new Date(order.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {order.customerName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {order.items} item{order.items > 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                        ${order.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, order.id)}
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 3
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
              Top Products
            </Typography>
            
            <List>
              {topProducts.map((product, index) => (
                <ListItem key={product.id} sx={{ px: 0, py: 1 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={product.image}
                      alt={product.name}
                      sx={{ width: 50, height: 50, borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {product.sales} sales • ${product.revenue.toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <StarRateIcon sx={{ fontSize: 14, color: '#ffd700' }} />
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {product.rating} ({product.reviews})
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 700 }}>
                      #{index + 1}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const OrdersTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Order Management
      </Typography>
      
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              startIcon={<SearchIcon />}
              sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Search
            </Button>
            <Button
              startIcon={<FilterListIcon />}
              sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Filter
            </Button>
          </Box>
          
          <Button
            startIcon={<DownloadIcon />}
            sx={{
              background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
              color: 'black',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
              }
            }}
          >
            Export
          </Button>
        </Box>
        
        {/* Orders table would go here - similar to recent orders but with more columns */}
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', py: 8 }}>
          Detailed orders management interface would be implemented here
        </Typography>
      </Card>
    </Box>
  );

  const ProductsTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Product Management
      </Typography>
      
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              startIcon={<SearchIcon />}
              sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Search
            </Button>
            <Button
              startIcon={<CategoryIcon />}
              sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Categories
            </Button>
          </Box>
          
          <Button
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
              color: 'black',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
              }
            }}
          >
            Add Product
          </Button>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', py: 8 }}>
          Product management interface with inventory, pricing, and category management would be implemented here
        </Typography>
      </Card>
    </Box>
  );

  const UsersTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        User Management
      </Typography>
      
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Orders</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Spent</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={user.avatar} alt={user.firstName} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      sx={{
                        backgroundColor: user.role === 'admin' ? 'rgba(255,170,0,0.2)' : 'rgba(33,150,243,0.2)',
                        color: user.role === 'admin' ? '#ffaa00' : '#2196f3',
                        border: `1px solid ${user.role === 'admin' ? '#ffaa00' : '#2196f3'}`,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(user.status)}
                      label={user.status}
                      sx={{
                        backgroundColor: alpha(getStatusColor(user.status), 0.2),
                        color: getStatusColor(user.status),
                        border: `1px solid ${getStatusColor(user.status)}`,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {user.totalOrders}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    ${user.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, user.id)}
                      sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );

  const AnalyticsTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Analytics & Reports
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 3,
            height: 300
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Revenue Chart
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 200,
              color: 'rgba(255,255,255,0.7)'
            }}>
              <BarChartIcon sx={{ fontSize: 80, mr: 2 }} />
              Chart Component Would Go Here
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 3,
            height: 300
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Order Statistics
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 200,
              color: 'rgba(255,255,255,0.7)'
            }}>
              <PieChartIcon sx={{ fontSize: 80, mr: 2 }} />
              Pie Chart Component Would Go Here
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const SettingsTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        System Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 3
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
              General Settings
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Maintenance Mode"
                  secondary="Enable to restrict access during updates"
                  primaryTypographyProps={{ color: 'white' }}
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Switch />
              </ListItem>
              
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Send automated emails to customers"
                  primaryTypographyProps={{ color: 'white' }}
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Switch defaultChecked />
              </ListItem>
              
              <ListItem>
                <ListItemText
                  primary="Analytics Tracking"
                  secondary="Collect usage analytics and insights"
                  primaryTypographyProps={{ color: 'white' }}
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            p: 3
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
              Payment Settings
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <CreditCardIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Stripe Integration"
                  secondary="Configure Stripe payment gateway"
                  primaryTypographyProps={{ color: 'white' }}
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Button size="small" sx={{ color: '#00ff88' }}>
                  Configure
                </Button>
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <PayPalIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </ListItemIcon>
                <ListItemText
                  primary="PayPal Integration"
                  secondary="Configure PayPal payment gateway"
                  primaryTypographyProps={{ color: 'white' }}
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Button size="small" sx={{ color: '#00ff88' }}>
                  Configure
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

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
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
          
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
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
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 1
          }}>
            Admin Dashboard
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1rem'
          }}>
            Manage your e-commerce platform with powerful tools and insights
          </Typography>
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
                icon={<tab.icon />}
                label={tab.label}
                iconPosition="start"
                sx={{
                  minHeight: 64,
                  '& .MuiTab-icon': {
                    mb: 0,
                    mr: 1,
                  },
                }}
              />
            ))}
          </Tabs>
        </Card>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {getTabContent()}
          </motion.div>
        </AnimatePresence>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor.element}
          open={Boolean(menuAnchor.element)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              backdropFilter: 'blur(20px)',
            }
          }}
        >
          <MenuItem onClick={() => handleAction('view', selectedItem)}>
            <ListItemIcon>
              <VisibilityIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="View Details" />
          </MenuItem>
          
          <MenuItem onClick={() => handleAction('edit', selectedItem)}>
            <ListItemIcon>
              <EditIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          
          <MenuItem onClick={() => handleAction('delete', selectedItem)}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AdminDashboard;