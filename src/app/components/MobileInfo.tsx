"use client";

// Material UI imports
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Stack,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  PhoneAndroid as PhoneAndroidIcon
} from '@mui/icons-material';

interface MobileInfoProps {
  mobile: {
    score: number;
    isMobileFriendly: boolean;
    viewportSet: boolean;
    fontSizeAppropriate: boolean;
    tapTargetsAppropriate: boolean;
  };
}

export default function MobileInfo({ mobile }: MobileInfoProps) {
  const theme = useTheme();
  
  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 90) return theme.palette.success.main;
    if (score >= 50) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        borderRadius: 2,
        height: '100%'
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <PhoneAndroidIcon color="primary" />
        <Typography variant="h6" fontWeight="medium">
          Mobile Friendliness
        </Typography>
      </Stack>
      
      <Box sx={{ mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={mobile.score} 
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              bgcolor: getColor(mobile.score)
            }
          }}
        />
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'block', 
            textAlign: 'right', 
            mt: 0.5 
          }}
        >
          {mobile.score}%
        </Typography>
      </Box>
      
      <List sx={{ p: 0 }}>
        <ListItem sx={{ px: 0, py: 0.75 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {mobile.isMobileFriendly ? (
              <CheckCircleIcon fontSize="small" color="success" />
            ) : (
              <CancelIcon fontSize="small" color="error" />
            )}
          </ListItemIcon>
          <ListItemText primary="Mobile Friendly" />
        </ListItem>
        
        <ListItem sx={{ px: 0, py: 0.75 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {mobile.viewportSet ? (
              <CheckCircleIcon fontSize="small" color="success" />
            ) : (
              <CancelIcon fontSize="small" color="error" />
            )}
          </ListItemIcon>
          <ListItemText primary="Viewport Properly Set" />
        </ListItem>
        
        <ListItem sx={{ px: 0, py: 0.75 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {mobile.fontSizeAppropriate ? (
              <CheckCircleIcon fontSize="small" color="success" />
            ) : (
              <CancelIcon fontSize="small" color="error" />
            )}
          </ListItemIcon>
          <ListItemText primary="Font Size Appropriate" />
        </ListItem>
        
        <ListItem sx={{ px: 0, py: 0.75 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {mobile.tapTargetsAppropriate ? (
              <CheckCircleIcon fontSize="small" color="success" />
            ) : (
              <CancelIcon fontSize="small" color="error" />
            )}
          </ListItemIcon>
          <ListItemText primary="Tap Targets Appropriate" />
        </ListItem>
      </List>
    </Paper>
  );
}
