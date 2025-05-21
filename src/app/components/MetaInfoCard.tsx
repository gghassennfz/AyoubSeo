"use client";

// Material UI imports
import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
  Divider,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

interface MetaInfo {
  title: string;
  description: string;
  hasCanonical: boolean;
  hasFavicon: boolean;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
}

interface MetaInfoCardProps {
  metaInfo: MetaInfo;
}

export default function MetaInfoCard({ metaInfo }: MetaInfoCardProps) {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        borderRadius: 2,
        height: '100%'
      }}
    >
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
        Meta Information
      </Typography>
      
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {metaInfo.title || 'No title found'}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            Description
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {metaInfo.description || 'No description found'}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              {metaInfo.hasCanonical ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <CancelIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2">
                Canonical URL
              </Typography>
            </Stack>
          </Box>
          
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              {metaInfo.hasFavicon ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <CancelIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2">
                Favicon
              </Typography>
            </Stack>
          </Box>
          
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              {metaInfo.hasRobotsTxt ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <CancelIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2">
                Robots.txt
              </Typography>
            </Stack>
          </Box>
          
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              {metaInfo.hasSitemap ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <CancelIcon fontSize="small" color="error" />
              )}
              <Typography variant="body2">
                Sitemap
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
