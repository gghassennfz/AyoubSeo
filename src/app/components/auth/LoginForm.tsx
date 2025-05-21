"use client";

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaGithub, FaLock, FaEnvelope } from 'react-icons/fa';
import { 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Grid, 
  Typography, 
  Alert, 
  InputAdornment, 
  Divider, 
  Box, 
  IconButton
} from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInWithGoogle, signInWithGithub, signInWithFacebook, error, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 600, mb: 3 }}>
        Welcome Back
      </Typography>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="your@email.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Password
              </Typography>
              <Typography 
                variant="body2" 
                component="a" 
                href="#" 
                sx={{ 
                  color: 'primary.main', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' } 
                }}
              >
                Forgot password?
              </Typography>
            </Box>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="••••••••"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Box>
            <FormControlLabel
              control={<Checkbox color="primary" id="remember-me" name="remember-me" />}
              label="Remember me for 30 days"
            />
          </Box>
          
          <Box>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                size="large"
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(to right, #3f51b5, #1976d2)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #303f9f, #1565c0)'
                  }
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 1, display: 'inline-block', animation: 'spin 1s linear infinite' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75" />
                      </svg>
                    </Box>
                    Signing in...
                  </Box>
                ) : 'Sign in'}
              </Button>
            </motion.div>
          </Box>
        </Box>
      </form>
      
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Or continue with
          </Typography>
        </Divider>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 2 }}>
          <Box>
            <motion.div whileHover={{ y: -2 }}>
              <IconButton 
                onClick={() => signInWithGoogle()} 
                disabled={loading}
                sx={{ 
                  width: '100%', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 1.5
                }}
              >
                <FaGoogle color="#DB4437" />
              </IconButton>
            </motion.div>
          </Box>
          
          <Box>
            <motion.div whileHover={{ y: -2 }}>
              <IconButton 
                onClick={() => signInWithFacebook()} 
                disabled={loading}
                sx={{ 
                  width: '100%', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 1.5
                }}
              >
                <FaFacebook color="#4267B2" />
              </IconButton>
            </motion.div>
          </Box>
          
          <Box>
            <motion.div whileHover={{ y: -2 }}>
              <IconButton 
                onClick={() => signInWithGithub()} 
                disabled={loading}
                sx={{ 
                  width: '100%', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 1.5
                }}
              >
                <FaGithub />
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
