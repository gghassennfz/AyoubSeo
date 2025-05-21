"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

// Material UI imports
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  Divider,
  IconButton,
  useTheme,
  Stack
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Favorite as HeartIcon,
  Search as SearchIcon
} from '@mui/icons-material';

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6,
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {/* Logo and description */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <motion.div
                whileHover={{ rotate: 15 }}
                style={{ display: 'inline-flex' }}
              >
                <IconButton 
                  size="small" 
                  color="primary" 
                  sx={{ mr: 1, bgcolor: 'primary.main', color: 'white' }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </motion.div>
              <Typography 
                variant="h6" 
                component="span" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                SEO Analyzer
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 400 }}>
              Comprehensive SEO analysis tool to help improve your website's search engine visibility and performance.
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <motion.div whileHover={{ y: -3 }}>
                <IconButton 
                  component="a" 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  size="small"
                  color="inherit"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ y: -3 }}>
                <IconButton 
                  component="a" 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  size="small"
                  color="inherit"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ y: -3 }}>
                <IconButton 
                  component="a" 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  size="small"
                  color="inherit"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Stack>
          </Box>
          
          {/* Resources */}
          <Box sx={{ flex: { xs: '1 1 45%', md: '1 1 20%' } }}>
            <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase' }}>
              Resources
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <MuiLink 
                  component={Link} 
                  href="/faq" 
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  FAQ
                </MuiLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <MuiLink 
                  component={Link} 
                  href="/blog" 
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  Blog
                </MuiLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <MuiLink 
                  component={Link} 
                  href="/guides" 
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  SEO Guides
                </MuiLink>
              </Box>
            </Box>
          </Box>
          
          {/* Company */}
          <Box sx={{ flex: { xs: '1 1 45%', md: '1 1 20%' } }}>
            <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase' }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <MuiLink 
                  component={Link} 
                  href="/about" 
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  About Us
                </MuiLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <MuiLink 
                  component={Link} 
                  href="/privacy" 
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  Privacy Policy
                </MuiLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <MuiLink 
                  component={Link} 
                  href="/terms" 
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  Terms of Service
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
            © {currentYear} Ayoub SEO Analyzer. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Made by Ayoub Aloui
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
