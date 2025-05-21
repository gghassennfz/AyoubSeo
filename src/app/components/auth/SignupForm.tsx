"use client";

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Typography, 
  Alert, 
  Box, 
  Divider, 
  IconButton,
  Link as MuiLink
} from '@mui/material';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signUp, error, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    await signUp(email, password);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 600, mb: 3 }}>
        Create an account
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="your@email.com"
            />
          </Box>
          
          <Box>
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
              inputProps={{ minLength: 8 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Password must be at least 8 characters long
            </Typography>
          </Box>
          
          <Box>
            <TextField
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="••••••••"
              error={!!passwordError}
              helperText={passwordError}
            />
          </Box>
          
          <Box>
            <FormControlLabel
              control={<Checkbox color="primary" id="terms" name="terms" required />}
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <MuiLink href="#" underline="hover" color="primary">
                    Terms of Service
                  </MuiLink>{' '}
                  and{' '}
                  <MuiLink href="#" underline="hover" color="primary">
                    Privacy Policy
                  </MuiLink>
                </Typography>
              }
            />
          </Box>
          
          <Box sx={{ mt: 1 }}>
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
                {loading ? 'Creating account...' : 'Sign up'}
              </Button>
            </motion.div>
          </Box>
        </Box>
      </form>
      
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Or sign up with
          </Typography>
        </Divider>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 2 }}>
          <Box>
            <motion.div whileHover={{ y: -2 }}>
              <IconButton 
                onClick={() => useAuthStore.getState().signInWithGoogle()} 
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
                onClick={() => useAuthStore.getState().signInWithFacebook()} 
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
                onClick={() => useAuthStore.getState().signInWithGithub()} 
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
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <MuiLink href="/auth/login" underline="hover" color="primary">
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </motion.div>
  );
}
