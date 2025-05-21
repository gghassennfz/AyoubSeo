"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { useThemeMode } from '../theme/theme';

// Material UI imports
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  Divider,
  Tooltip,
  Stack
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Person as PersonIcon, 
  Login as LoginIcon, 
  PersonAdd as PersonAddIcon, 
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

export default function Header() {
  const { user, signOut, checkSession } = useAuthStore();
  const { mode, toggleTheme } = useThemeMode();
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };
  
  useEffect(() => {
    setMounted(true);
    checkSession();
  }, [checkSession]);
  
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'flex' }}
            >
              <IconButton 
                component={Link} 
                href="/" 
                sx={{ 
                  mr: 1,
                  background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #303f9f 30%, #c51162 90%)',
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </motion.div>
            <Typography 
              variant="h6" 
              component={Link} 
              href="/"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Ayoub SEO Analyzer
            </Typography>
          </Box>
          
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            <Button component={Link} href="/" color="inherit" sx={{ fontWeight: 500 }}>
              Home
            </Button>
            <Button component={Link} href="/faq" color="inherit" sx={{ fontWeight: 500 }}>
              FAQ
            </Button>
            
            {/* Theme Toggle */}
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
            
            {/* User Menu */}
            {mounted && user ? (
              <>
                <Button 
                  onClick={handleMenu}
                  startIcon={
                    <Avatar 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        bgcolor: 'primary.main',
                        fontSize: '0.875rem'
                      }}
                    >
                      {user.email?.[0].toUpperCase()}
                    </Avatar>
                  }
                  endIcon={null}
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  {!isMobile && user.email?.split('@')[0]}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 3,
                    sx: { mt: 1, width: 220, borderRadius: 2 }
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">Signed in as</Typography>
                    <Typography variant="body2" fontWeight="medium" noWrap>{user.email}</Typography>
                  </Box>
                  <Divider />
                  <MenuItem component={Link} href="/auth/profile" onClick={handleClose}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Your Profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => { signOut(); handleClose(); }} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : mounted ? (
              <Stack direction="row" spacing={1}>
                <Button 
                  component={Link} 
                  href="/auth/login"
                  startIcon={<LoginIcon />}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Login
                </Button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    component={Link} 
                    href="/auth/signup"
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Sign up
                  </Button>
                </motion.div>
              </Stack>
            ) : null}
          </Box>
          
          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton onClick={toggleTheme} color="inherit" size="small">
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
            
            {mounted && user ? (
              <>
                <IconButton 
                  size="small"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar 
                    sx={{ 
                      width: 28, 
                      height: 28, 
                      bgcolor: 'primary.main',
                      fontSize: '0.875rem'
                    }}
                  >
                    {user.email?.[0].toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: { width: 200, borderRadius: 2 }
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">Signed in as</Typography>
                    <Typography variant="body2" fontWeight="medium" noWrap>{user.email}</Typography>
                  </Box>
                  <Divider />
                  <MenuItem component={Link} href="/" onClick={handleClose}>
                    <ListItemIcon>
                      <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} href="/faq" onClick={handleClose}>
                    <ListItemIcon>
                      <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>FAQ</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} href="/auth/profile" onClick={handleClose}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Your Profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => { signOut(); handleClose(); }} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : mounted ? (
              <>
                <IconButton
                  size="small"
                  onClick={handleMobileMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={mobileMenuAnchorEl}
                  open={Boolean(mobileMenuAnchorEl)}
                  onClose={handleMobileMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: { width: 200, borderRadius: 2 }
                  }}
                >
                  <MenuItem component={Link} href="/" onClick={handleMobileMenuClose}>
                    <ListItemIcon>
                      <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} href="/faq" onClick={handleMobileMenuClose}>
                    <ListItemIcon>
                      <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>FAQ</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} href="/auth/login" onClick={handleMobileMenuClose}>
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} href="/auth/signup" onClick={handleMobileMenuClose}>
                    <ListItemIcon>
                      <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign up</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
