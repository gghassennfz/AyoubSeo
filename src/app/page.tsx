"use client";

import { useState, useEffect } from 'react';
import { useSeoStore } from './store/seoStore';
import { useAuthStore } from './store/authStore';
import UrlInput from './components/UrlInput';
import ResultsPage from './components/ResultsPage';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Material UI imports
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Timeline as TimelineIcon,
  PhoneAndroid as PhoneAndroidIcon,
  ArrowForward as ArrowForwardIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

export default function Home() {
  const { result, error, isAnalyzing } = useSeoStore();
  const { user, checkSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  
  useEffect(() => {
    setMounted(true);
    checkSession();
  }, [checkSession]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white'
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.75rem' } 
              }}
            >
              Analyze Your Website SEO Performance
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant="h5"
              sx={{ 
                mb: 5, 
                maxWidth: '800px', 
                mx: 'auto',
                color: alpha('#fff', 0.9),
                fontWeight: 400
              }}
            >
              Get comprehensive insights into your website's SEO performance, including technical issues, content quality, and mobile-friendliness.
            </Typography>
          </motion.div>
          
          {/* URL Input Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <UrlInput />
          </motion.div>
          
          {/* User-specific CTA */}
          {mounted && !user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ marginTop: theme.spacing(5) }}
            >
              <Typography variant="body1" sx={{ mb: 2, color: alpha('#fff', 0.9) }}>
                Create an account to save your analysis history
              </Typography>
              <Button
                component={Link}
                href="/auth/signup"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  borderRadius: 8,
                  px: 4,
                  py: 1.5,
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha('#fff', 0.9)
                  }
                }}
              >
                Sign up for free
              </Button>
            </motion.div>
          )}
        </Container>
      </Box>
      
      {/* Results Section */}
      {result && (
        <Box sx={{ py: 6 }}>
          <Container maxWidth="lg">
            <ResultsPage />
          </Container>
        </Box>
      )}
      
      {/* Features Section */}
      {!result && !isAnalyzing && (
        <Box sx={{ 
          py: 8, 
          bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default'
        }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                align="center" 
                gutterBottom 
                sx={{ 
                  mb: 6,
                  fontWeight: 600
                }}
              >
                Powerful SEO Analysis Features
              </Typography>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <motion.div variants={itemVariants}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        height: '100%',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        },
                        borderRadius: 4
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          width: 70, 
                          height: 70, 
                          mb: 3,
                          mx: 'auto'
                        }}
                      >
                        <SearchIcon fontSize="large" />
                      </Avatar>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                        SEO Analysis
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Comprehensive SEO audit with actionable recommendations to improve your search rankings.
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <motion.div variants={itemVariants}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        height: '100%',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        },
                        borderRadius: 4
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          width: 70, 
                          height: 70, 
                          mb: 3,
                          mx: 'auto'
                        }}
                      >
                        <TimelineIcon fontSize="large" />
                      </Avatar>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                        Performance Metrics
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Detailed performance metrics to help you optimize your website's loading speed.
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <motion.div variants={itemVariants}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        height: '100%',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        },
                        borderRadius: 4
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          width: 70, 
                          height: 70, 
                          mb: 3,
                          mx: 'auto'
                        }}
                      >
                        <PhoneAndroidIcon fontSize="large" />
                      </Avatar>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                        Mobile-Friendly Check
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Ensure your website is fully optimized for mobile devices and responsive design.
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      )}
      
      {/* Testimonials/Stats Section */}
      {!result && !isAnalyzing && (
        <Box sx={{ 
          py: 8, 
          bgcolor: theme.palette.mode === 'light' ? 'background.default' : alpha(theme.palette.background.paper, 0.1)
        }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                align="center" 
                gutterBottom 
                sx={{ 
                  mb: 6,
                  fontWeight: 600
                }}
              >
                Why Choose Our SEO Analyzer
              </Typography>
            </motion.div>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      component="p" 
                      color="primary" 
                      gutterBottom 
                      fontWeight={700}
                    >
                      100+
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      SEO Metrics Analyzed
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      component="p" 
                      color="primary" 
                      gutterBottom 
                      fontWeight={700}
                    >
                      5,000+
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Websites Analyzed
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      component="p" 
                      color="primary" 
                      gutterBottom 
                      fontWeight={700}
                    >
                      98%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Accuracy Rate
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      component="p" 
                      color="primary" 
                      gutterBottom 
                      fontWeight={700}
                    >
                      24/7
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Support Available
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
}
