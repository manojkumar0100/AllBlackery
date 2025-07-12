/**
 * Enhanced SignIn Page with Google OAuth, Premium UI/UX, and Advanced Features
 * Features: Email/password login, Google OAuth, forgot password, animations
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Card,
  CardContent,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Avatar,
  Chip,
  Grid,
  Checkbox,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  // Handle regular login
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual authentication
      console.log('Login attempt:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      setSuccess('Login successful! Redirecting...');
      
      // Simulate redirect delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    
    try {
      // Mock Google OAuth - replace with actual Google OAuth implementation
      console.log('Google OAuth login attempt');
      
      // TODO: Implement actual Google OAuth
      // const response = await google.accounts.oauth2.initTokenClient({
      //   client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      //   scope: 'email profile',
      //   callback: handleGoogleCallback,
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful Google login
      setSuccess('Google login successful! Redirecting...');
      
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Features and benefits
  const features = [
    {
      icon: SecurityIcon,
      title: 'Secure & Safe',
      description: 'Your data is protected with enterprise-grade security',
      color: '#00ff88'
    },
    {
      icon: CheckIcon,
      title: 'Easy Access',
      description: 'Quick login with multiple authentication options',
      color: '#00aaff'
    },
    {
      icon: PersonIcon,
      title: 'Personal Experience',
      description: 'Tailored recommendations and saved preferences',
      color: '#ffaa00'
    }
  ];

  const socialLogins = [
    {
      name: 'Google',
      icon: GoogleIcon,
      color: '#4285f4',
      onClick: handleGoogleLogin,
      loading: isGoogleLoading
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      color: '#1877f2',
      onClick: () => console.log('Facebook login'),
      loading: false
    },
    {
      name: 'Apple',
      icon: AppleIcon,
      color: '#000000',
      onClick: () => console.log('Apple login'),
      loading: false
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite alternate',
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Features (Desktop only) */}
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ pr: 4 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      fontWeight: 800,
                      mb: 3,
                      background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Welcome Back to AllBlackery
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      mb: 4,
                      fontWeight: 300,
                      lineHeight: 1.6
                    }}
                  >
                    Sign in to access your personalized fashion experience
                  </Typography>

                  <Stack spacing={3}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            p: 3,
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 3,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                              border: '1px solid rgba(255,255,255,0.2)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: '50%',
                              backgroundColor: `${feature.color}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `2px solid ${feature.color}`,
                            }}
                          >
                            <feature.icon sx={{ color: feature.color, fontSize: 24 }} />
                          </Box>
                          
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                mb: 0.5,
                                fontSize: '1.1rem'
                              }}
                            >
                              {feature.title}
                            </Typography>
                            
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(255,255,255,0.7)',
                                lineHeight: 1.5
                              }}
                            >
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          )}

          {/* Right side - Login Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card
                sx={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Loading Progress */}
                {isLoading && (
                  <LinearProgress
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ffffff',
                      },
                    }}
                  />
                )}

                <CardContent sx={{ p: 6 }}>
                  {/* Back Button */}
                  <IconButton
                    onClick={() => navigate('/')}
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>

                  {/* Header */}
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                        color: 'black',
                      }}
                    >
                      <LoginIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 1,
                        fontSize: '1.8rem'
                      }}
                    >
                      Sign In
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '1rem'
                      }}
                    >
                      Welcome back! Please sign in to your account
                    </Typography>
                  </Box>

                  {/* Alert Messages */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            backgroundColor: 'rgba(255,68,68,0.1)',
                            border: '1px solid rgba(255,68,68,0.3)',
                            color: '#ff4444',
                            '& .MuiAlert-icon': {
                              color: '#ff4444',
                            },
                          }}
                        >
                          {error}
                        </Alert>
                      </motion.div>
                    )}
                    
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert
                          severity="success"
                          sx={{
                            mb: 3,
                            backgroundColor: 'rgba(0,255,136,0.1)',
                            border: '1px solid rgba(0,255,136,0.3)',
                            color: '#00ff88',
                            '& .MuiAlert-icon': {
                              color: '#00ff88',
                            },
                          }}
                        >
                          {success}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Login Form */}
                  <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
                    <Stack spacing={3}>
                      <TextField
                        {...register('email')}
                        type="email"
                        label="Email Address"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isLoading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgba(255,255,255,0.7)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255,255,255,0.7)',
                              opacity: 1,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ff4444',
                          },
                        }}
                      />

                      <TextField
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        disabled={isLoading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: 'rgba(255,255,255,0.7)' }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgba(255,255,255,0.7)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255,255,255,0.7)',
                              opacity: 1,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#ff4444',
                          },
                        }}
                      />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                              color: 'rgba(255,255,255,0.7)',
                              '&.Mui-checked': {
                                color: 'white',
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Remember me
                          </Typography>
                        </Box>
                        
                        <Link
                          onClick={() => navigate('/forgot-password')}
                          sx={{
                            color: 'rgba(255,255,255,0.8)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            '&:hover': {
                              color: 'white',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Forgot Password?
                        </Link>
                      </Box>

                      <Button
                        type="submit"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        sx={{
                          py: 2,
                          background: 'linear-gradient(45deg, #ffffff 30%, #cccccc 90%)',
                          color: 'black',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          borderRadius: 2,
                          textTransform: 'none',
                          boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #cccccc 30%, #ffffff 90%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 35px rgba(255,255,255,0.4)',
                          },
                          '&:disabled': {
                            background: 'rgba(255,255,255,0.3)',
                            color: 'rgba(0,0,0,0.5)',
                            transform: 'none',
                            boxShadow: 'none',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </Stack>
                  </Box>

                  {/* Social Login */}
                  <Box sx={{ mb: 4 }}>
                    <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.2)' }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', px: 2 }}>
                        Or sign in with
                      </Typography>
                    </Divider>

                    <Stack direction="row" spacing={2} justifyContent="center">
                      {socialLogins.map((social, index) => (
                        <Button
                          key={index}
                          onClick={social.onClick}
                          disabled={social.loading || isLoading}
                          sx={{
                            minWidth: 50,
                            height: 50,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: social.color,
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              border: '1px solid rgba(255,255,255,0.3)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {social.loading ? (
                            <CircularProgress size={24} sx={{ color: social.color }} />
                          ) : (
                            <social.icon sx={{ fontSize: 24 }} />
                          )}
                        </Button>
                      ))}
                    </Stack>
                  </Box>

                  {/* Sign Up Link */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Don't have an account?{' '}
                      <Link
                        onClick={() => navigate('/sign-up')}
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          fontWeight: 600,
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignInPage;