import SignupForm from '../../components/auth/SignupForm';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export const metadata = {
  title: 'Sign Up - Ayoub SEO Analyzer',
  description: 'Create a new Ayoub SEO Analyzer account',
};

export default function SignupPage() {
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
            Create a new account to get started with SEO analysis
          </Typography>
        </Box>
        
        <SignupForm />
      </Paper>
    </Container>
  );
}
