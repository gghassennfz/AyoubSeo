"use client";

import { useState } from 'react';
import { useSeoStore } from '../store/seoStore';

// Material UI imports
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  Paper,
  useTheme
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function UrlInput() {
  const { url, setUrl, startAnalysis, isAnalyzing } = useSeoStore();
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    if (!url.startsWith('https://')) {
      setError('URL must start with https://');
      return;
    }
    
    setError('');
    startAnalysis();
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze website');
      }
      
      const data = await response.json();
      useSeoStore.getState().setResult(data);
    } catch (error) {
      useSeoStore.getState().setError((error as Error).message);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        width: '100%'
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: 'flex-start'
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={isAnalyzing}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: 'background.paper',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? 'error.main' : 'rgba(0, 0, 0, 0.1)'
                }
              }
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isAnalyzing}
          size="large"
          sx={{
            height: 56,
            px: 4,
            borderRadius: 2,
            whiteSpace: 'nowrap',
            minWidth: { xs: '100%', md: '160px' }
          }}
          startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </Button>
      </Box>
    </Paper>
  );
}
