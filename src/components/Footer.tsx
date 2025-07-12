/**
 * Advanced Footer Component with Stunning Animations
 * Premium footer with newsletter, social links, and smooth effects
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Pinterest,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Send,
  Favorite,
  Security,
  LocalShipping,
  SupportAgent,
  CreditCard,
  Verified,
  Diamond,
  Star,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Advanced animations
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

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Footer links
  const footerLinks = {
    'Shop': [
      { label: 'All Products', path: '/products' },
      { label: 'New Arrivals', path: '/products?new=true' },
      { label: 'Best Sellers', path: '/products?bestsellers=true' },
      { label: 'Sale', path: '/products?sale=true' },
      { label: 'Gift Cards', path: '/gift-cards' },
    ],
    'Categories': [
      { label: 'Jackets', path: '/products?category=jackets' },
      { label: 'Dresses', path: '/products?category=dresses' },
      { label: 'Bags', path: '/products?category=bags' },
      { label: 'Shoes', path: '/products?category=shoes' },
      { label: 'Accessories', path: '/products?category=accessories' },
    ],
    'Customer Service': [
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Size Guide', path: '/size-guide' },
      { label: 'Returns', path: '/returns' },
      { label: 'Shipping Info', path: '/shipping' },
    ],
    'About': [
      { label: 'Our Story', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Sustainability', path: '/sustainability' },
      { label: 'Terms & Conditions', path: '/terms' },
    ],
  };

  // Social media links
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#', color: '#1877f2' },
    { icon: Instagram, label: 'Instagram', url: '#', color: '#e4405f' },
    { icon: Twitter, label: 'Twitter', url: '#', color: '#1da1f2' },
    { icon: YouTube, label: 'YouTube', url: '#', color: '#ff0000' },
    { icon: Pinterest, label: 'Pinterest', url: '#', color: '#bd081c' },
    { icon: LinkedIn, label: 'LinkedIn', url: '#', color: '#0077b5' },
  ];

  // Trust badges
  const trustBadges = [
    { icon: Security, label: 'Secure Shopping', color: '#4ECDC4' },
    { icon: LocalShipping, label: 'Free Shipping', color: '#00ff88' },
    { icon: SupportAgent, label: '24/7 Support', color: '#45B7D1' },
    { icon: CreditCard, label: 'Secure Payment', color: '#ffd700' },
    { icon: Verified, label: 'Verified Store', color: '#96CEB4' },
    { icon: Star, label: 'Top Rated', color: '#FF6B6B' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: '#ffffff',
        pt: 8,
        pb: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        },
      }}
    >
      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Fade in timeout={800}>
          <Box
            sx={{
              textAlign: 'center',
              p: 6,
              borderRadius: 4,
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff, #cccccc)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Stay in the Loop
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Subscribe to our newsletter for exclusive deals, early access to sales, and style inspiration.
            </Typography>

            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: 500,
                mx: 'auto',
                mb: 3,
                flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <TextField
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
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
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  background: subscribed
                    ? 'linear-gradient(45deg, #00ff88, #00cc6a)'
                    : 'linear-gradient(45deg, #000000, #333333)',
                  color: subscribed ? '#000000' : '#ffffff',
                  fontWeight: 'bold',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: subscribed ? `${pulseAnimation} 1s ease-out` : 'none',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.9rem',
              }}
            >
              Join 50,000+ fashion enthusiasts who trust AllBlackery
            </Typography>
          </Box>
        </Fade>
      </Container>

      {/* Main Footer Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Fade in timeout={1000}>
              <Box>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
                      animation: `${glowAnimation} 3s ease-in-out infinite`,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                      }}
                    >
                      AB
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #ffffff, #cccccc)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    AllBlackery
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  Elevating your style with premium black fashion. 
                  Discover timeless elegance and modern sophistication 
                  in every piece we curate.
                </Typography>

                {/* Contact Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: '#4ECDC4' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      123 Fashion Street, Style City, SC 12345
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ color: '#00ff88' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ color: '#ffd700' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      hello@allblackery.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {Object.entries(footerLinks).map(([category, links], index) => (
                <Grid item xs={6} sm={3} key={category}>
                  <Fade in timeout={1200 + index * 200}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          mb: 2,
                          color: '#ffffff',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: 0,
                            width: 30,
                            height: 2,
                            background: 'linear-gradient(45deg, #00ff88, #4ECDC4)',
                            borderRadius: 1,
                          },
                        }}
                      >
                        {category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {links.map((link) => (
                          <Link
                            key={link.label}
                            onClick={() => navigate(link.path)}
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              textDecoration: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                color: '#ffffff',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Trust Badges */}
        <Fade in timeout={1600}>
          <Box sx={{ mt: 6, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Why Choose AllBlackery?
            </Typography>
            <Grid container spacing={2}>
              {trustBadges.map((badge, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <Zoom in timeout={1000 + index * 100}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        animation: `${floatAnimation} ${3 + index * 0.5}s ease-in-out infinite`,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <badge.icon sx={{ color: badge.color, fontSize: 32, mb: 1 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '0.8rem',
                        }}
                      >
                        {badge.label}
                      </Typography>
                    </Box>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Divider */}
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Copyright */}
          <Fade in timeout={1800}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                © 2025 AllBlackery. Made with
              </Typography>
              <Favorite
                sx={{
                  color: '#ff4444',
                  fontSize: 16,
                  animation: `${pulseAnimation} 2s ease-in-out infinite`,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                for fashion lovers
              </Typography>
            </Box>
          </Fade>

          {/* Social Links */}
          <Fade in timeout={2000}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={social.label}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: social.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${social.color}30`,
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;