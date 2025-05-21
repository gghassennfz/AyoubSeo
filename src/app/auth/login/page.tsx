import LoginForm from '../../components/auth/LoginForm';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';

export const metadata = {
  title: 'Login - Ayoub SEO Analyzer',
  description: 'Login to your Ayoub SEO Analyzer account',
};

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              p: 1.5, 
              borderRadius: '50%', 
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaSearch size={24} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Ayoub SEO Analyzer
            </Typography>
          </Link>
          
          <Divider sx={{ width: 80, height: 4, bgcolor: 'primary.main', mb: 2 }} />
          
          <Typography variant="body1" color="text.secondary" align="center">
            Log in to access your SEO analysis dashboard
          </Typography>
        </Box>
        
        <LoginForm />
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account yet?{' '}
            <Link href="/auth/signup" style={{ color: 'primary.main', fontWeight: 500, textDecoration: 'none' }}>
              Sign up for free
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
