/**
 * Enhanced Profile Page with Premium UI/UX and Advanced Effects
 * Features: Profile management, settings, preferences, security, account information
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
  Avatar,
  Button,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Paper,
  Chip,
  Badge,
  LinearProgress,
  useTheme,
  useMediaQuery,
  alpha,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Stack,
  Slide,
  Fade,
  Zoom
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingBag as ShoppingBagIcon,
  Receipt as ReceiptIcon,
  CreditCard as CreditCardIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  DateRange as DateRangeIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  VolumeUp as VolumeUpIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon,
  Group as GroupIcon,
  LocalOffer as LocalOfferIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Verified as VerifiedIcon,
  Shield as ShieldIcon,
  Fingerprint as FingerprintIcon,
  VpnKey as VpnKeyIcon,
  DeviceUnknown as DeviceUnknownIcon,
  Smartphone as SmartphoneIcon,
  Computer as ComputerIcon,
  TabletMac as TabletMacIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

// Interfaces
interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  bio: string;
  joinedDate: string;
  isVerified: boolean;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    currency: string;
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      marketing: boolean;
      orderUpdates: boolean;
    };
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    reviewsWritten: number;
    wishlistItems: number;
    membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  };
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  cardNumber?: string;
  expiryDate?: string;
  holderName?: string;
  isDefault: boolean;
  lastUsed: string;
}

interface LoginDevice {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loginDevices, setLoginDevices] = useState<LoginDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as any });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock data
  const mockProfile: UserProfile = {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    gender: 'male',
    bio: 'Fashion enthusiast and style lover. Always looking for the latest trends in black fashion.',
    joinedDate: '2023-01-15',
    isVerified: true,
    preferences: {
      theme: 'dark',
      language: 'English',
      currency: 'USD',
      timezone: 'America/New_York',
      notifications: {
        email: true,
        sms: true,
        push: true,
        marketing: false,
        orderUpdates: true,
      }
    },
    stats: {
      totalOrders: 24,
      totalSpent: 2850.50,
      reviewsWritten: 18,
      wishlistItems: 12,
      membershipLevel: 'Gold'
    }
  };

  const mockAddresses: Address[] = [
    {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      firstName: 'John',
      lastName: 'Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ];

  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/25',
      holderName: 'John Doe',
      isDefault: true,
      lastUsed: '2024-01-15'
    },
    {
      id: '2',
      type: 'paypal',
      isDefault: false,
      lastUsed: '2024-01-10'
    }
  ];

  const mockLoginDevices: LoginDevice[] = [
    {
      id: '1',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'New York, NY',
      lastActive: '2024-01-20T10:30:00Z',
      isCurrent: true
    },
    {
      id: '2',
      device: 'iPhone 15',
      browser: 'Safari 17.0',
      location: 'New York, NY',
      lastActive: '2024-01-19T15:45:00Z',
      isCurrent: false
    },
    {
      id: '3',
      device: 'iPad Pro',
      browser: 'Safari 17.0',
      location: 'New York, NY',
      lastActive: '2024-01-18T09:20:00Z',
      isCurrent: false
    }
  ];

  const tabs = [
    { label: 'Profile', icon: PersonIcon },
    { label: 'Security', icon: SecurityIcon },
    { label: 'Addresses', icon: ShippingIcon },
    { label: 'Payment', icon: PaymentIcon },
    { label: 'Preferences', icon: SettingsIcon },
    { label: 'Privacy', icon: ShieldIcon }
  ];

  // Initialize data
  useEffect(() => {
    setTimeout(() => {
      setProfile(mockProfile);
      setAddresses(mockAddresses);
      setPaymentMethods(mockPaymentMethods);
      setLoginDevices(mockLoginDevices);
      setEditData(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = () => {
    setLoading(true);
    
    setTimeout(() => {
      setProfile(prev => ({ ...prev!, ...editData }));
      setEditMode(false);
      setLoading(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({ open: true, message: 'New passwords do not match!', severity: 'error' });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setShowPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
      setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setLoading(true);
    
    setTimeout(() => {
      setShowDeleteDialog(false);
      setLoading(false);
      // In real app, this would log out the user and redirect
      navigate('/sign-in');
    }, 2000);
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'Bronze': return '#cd7f32';
      case 'Silver': return '#c0c0c0';
      case 'Gold': return '#ffd700';
      case 'Platinum': return '#e5e4e2';
      default: return '#cccccc';
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <SmartphoneIcon />;
    } else if (device.toLowerCase().includes('ipad') || device.toLowerCase().includes('tablet')) {
      return <TabletMacIcon />;
    } else if (device.toLowerCase().includes('mac') || device.toLowerCase().includes('windows')) {
      return <ComputerIcon />;
    } else {
      return <DeviceUnknownIcon />;
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab />;
      case 1:
        return <SecurityTab />;
      case 2:
        return <AddressesTab />;
      case 3:
        return <PaymentTab />;
      case 4:
        return <PreferencesTab />;
      case 5:
        return <PrivacyTab />;
      default:
        return null;
    }
  };

  // Tab Components
  const ProfileTab = () => (
    <Box>
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3,
        mb: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                size="small"
                sx={{
                  backgroundColor: '#00ff88',
                  color: 'black',
                  '&:hover': { backgroundColor: '#00cc66' }
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 16 }} />
              </IconButton>
            }
          >
            <Avatar
              src={profile?.avatar}
              alt={profile?.firstName}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid rgba(255,255,255,0.2)',
                mr: 3
              }}
            />
          </Badge>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                {profile?.firstName} {profile?.lastName}
              </Typography>
              {profile?.isVerified && (
                <VerifiedIcon sx={{ color: '#00ff88', fontSize: 24 }} />
              )}
              <Chip
                label={profile?.stats.membershipLevel}
                sx={{
                  backgroundColor: alpha(getMembershipColor(profile?.stats.membershipLevel || 'Bronze'), 0.2),
                  color: getMembershipColor(profile?.stats.membershipLevel || 'Bronze'),
                  border: `1px solid ${getMembershipColor(profile?.stats.membershipLevel || 'Bronze')}`,
                  fontWeight: 600,
                }}
              />
            </Box>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
              {profile?.bio}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                onClick={() => setEditMode(!editMode)}
                variant={editMode ? 'outlined' : 'contained'}
                startIcon={editMode ? <CancelIcon /> : <EditIcon />}
                sx={{
                  background: editMode ? 'transparent' : 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                  color: editMode ? 'white' : 'black',
                  borderColor: editMode ? 'rgba(255,255,255,0.3)' : 'transparent',
                  fontWeight: 600,
                  '&:hover': {
                    background: editMode ? 'rgba(255,255,255,0.1)' : 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>
              
              {editMode && (
                <Button
                  onClick={handleSaveProfile}
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                    color: 'black',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Save Changes
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* Profile Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700 }}>
                {profile?.stats.totalOrders}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Orders
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700 }}>
                ${profile?.stats.totalSpent.toFixed(0)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Spent
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700 }}>
                {profile?.stats.reviewsWritten}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Reviews Written
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700 }}>
                {profile?.stats.wishlistItems}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Wishlist Items
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Profile Form */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={editData.firstName || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
              disabled={!editMode}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: editMode ? 'rgba(255,255,255,0.05)' : 'transparent',
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
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={editData.lastName || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
              disabled={!editMode}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: editMode ? 'rgba(255,255,255,0.05)' : 'transparent',
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
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={editData.email || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!editMode}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: editMode ? 'rgba(255,255,255,0.05)' : 'transparent',
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
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={editData.phone || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!editMode}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: editMode ? 'rgba(255,255,255,0.05)' : 'transparent',
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
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Bio"
              value={editData.bio || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!editMode}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: editMode ? 'rgba(255,255,255,0.05)' : 'transparent',
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
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );

  const SecurityTab = () => (
    <Box>
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3,
        mb: 3
      }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
          Security Settings
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <LockIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Change Password"
              secondary="Update your password to keep your account secure"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Button
                onClick={() => setShowPasswordDialog(true)}
                sx={{ color: '#00ff88' }}
              >
                Change
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <ListItem>
            <ListItemIcon>
              <FingerprintIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary="Add an extra layer of security to your account"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={true}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00ff88',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#00ff88',
                  },
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <ListItem>
            <ListItemIcon>
              <VpnKeyIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Login Activity"
              secondary="Review devices and sessions where you're logged in"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Button sx={{ color: '#00ff88' }}>
                Review
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>

      {/* Active Sessions */}
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3
      }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
          Active Sessions
        </Typography>
        
        <List>
          {loginDevices.map((device, index) => (
            <ListItem key={device.id}>
              <ListItemIcon>
                {getDeviceIcon(device.device)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                      {device.device}
                    </Typography>
                    {device.isCurrent && (
                      <Chip
                        label="Current Session"
                        size="small"
                        sx={{
                          backgroundColor: '#00ff88',
                          color: 'black',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {device.browser} • {device.location}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      Last active: {new Date(device.lastActive).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
              {!device.isCurrent && (
                <ListItemSecondaryAction>
                  <Button
                    size="small"
                    sx={{ color: '#ff4444' }}
                  >
                    Revoke
                  </Button>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );

  const AddressesTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Saved Addresses
      </Typography>
      
      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} key={address.id}>
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
              p: 3,
              position: 'relative'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HomeIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                  </Typography>
                  {address.isDefault && (
                    <Chip
                      label="Default"
                      size="small"
                      sx={{
                        backgroundColor: '#00ff88',
                        color: 'black',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>
                
                <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  <EditIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                {address.firstName} {address.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                {address.street}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                {address.city}, {address.state} {address.zipCode}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {address.phone}
              </Typography>
            </Card>
          </Grid>
        ))}
        
        <Grid item xs={12} sm={6}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px dashed rgba(255,255,255,0.3)',
            borderRadius: 3,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#00ff88',
              backgroundColor: 'rgba(0,255,136,0.05)',
            }
          }}>
            <AddIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Add New Address
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const PaymentTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Payment Methods
      </Typography>
      
      <Grid container spacing={3}>
        {paymentMethods.map((payment) => (
          <Grid item xs={12} sm={6} key={payment.id}>
            <Card sx={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
              p: 3,
              position: 'relative'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CreditCardIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {payment.type === 'card' ? 'Credit Card' : 'PayPal'}
                  </Typography>
                  {payment.isDefault && (
                    <Chip
                      label="Default"
                      size="small"
                      sx={{
                        backgroundColor: '#00ff88',
                        color: 'black',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>
                
                <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  <EditIcon />
                </IconButton>
              </Box>
              
              {payment.type === 'card' ? (
                <>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    {payment.cardNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                    {payment.holderName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Expires: {payment.expiryDate}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  john.doe@example.com
                </Typography>
              )}
              
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 2, display: 'block' }}>
                Last used: {new Date(payment.lastUsed).toLocaleDateString()}
              </Typography>
            </Card>
          </Grid>
        ))}
        
        <Grid item xs={12} sm={6}>
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px dashed rgba(255,255,255,0.3)',
            borderRadius: 3,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#00ff88',
              backgroundColor: 'rgba(0,255,136,0.05)',
            }
          }}>
            <AddIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Add Payment Method
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const PreferencesTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Preferences
      </Typography>
      
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3
      }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive order updates and promotions via email"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={profile?.preferences.notifications.email}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00ff88',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#00ff88',
                  },
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <ListItem>
            <ListItemIcon>
              <PhoneIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="SMS Notifications"
              secondary="Receive important updates via SMS"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={profile?.preferences.notifications.sms}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00ff88',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#00ff88',
                  },
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <ListItem>
            <ListItemIcon>
              <LocalOfferIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Marketing Communications"
              secondary="Receive promotional offers and newsletters"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={profile?.preferences.notifications.marketing}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00ff88',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#00ff88',
                  },
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    </Box>
  );

  const PrivacyTab = () => (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
        Privacy & Data
      </Typography>
      
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        p: 3,
        mb: 3
      }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Download Your Data"
              secondary="Get a copy of your data in a portable format"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Button sx={{ color: '#00ff88' }}>
                Download
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <ListItem>
            <ListItemIcon>
              <DeleteIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Delete Account"
              secondary="Permanently delete your account and all associated data"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <ListItemSecondaryAction>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                sx={{ color: '#ff4444' }}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)'
      }}>
        <CircularProgress size={60} sx={{ color: '#ffffff' }} />
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
            My Profile
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1rem'
          }}>
            Manage your account settings and preferences
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

        {/* Change Password Dialog */}
        <Dialog
          open={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
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
            Change Password
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <TextField
              fullWidth
              type={showCurrentPassword ? 'text' : 'password'}
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              sx={{
                mb: 2,
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
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            
            <TextField
              fullWidth
              type={showNewPassword ? 'text' : 'password'}
              label="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              sx={{
                mb: 2,
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
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
              onClick={() => setShowPasswordDialog(false)}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              sx={{
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                },
              }}
            >
              Update Password
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
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
            Delete Account
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              This action cannot be undone. All your data will be permanently deleted.
            </Alert>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Are you sure you want to delete your account? This will permanently remove:
            </Typography>
            
            <List sx={{ mt: 2 }}>
              <ListItem>
                <ListItemText
                  primary="• All your personal information"
                  primaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="• Order history and invoices"
                  primaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="• Wishlist and saved items"
                  primaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="• Reviews and ratings"
                  primaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
              </ListItem>
            </List>
          </DialogContent>
          
          <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              onClick={() => setShowDeleteDialog(false)}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              sx={{
                background: 'linear-gradient(45deg, #ff4444 30%, #cc0000 90%)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #cc0000 30%, #ff4444 90%)',
                },
              }}
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>

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

export default ProfilePage;