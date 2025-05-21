"use client";

// Material UI imports
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';

interface PerformanceMetricsProps {
  metrics: {
    firstContentfulPaint: number;
    speedIndex: number;
    largestContentfulPaint: number;
    timeToInteractive: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
  };
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const theme = useTheme();
  
  // Convert milliseconds to seconds and round to 2 decimal places
  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(2) + 's';
  };

  // Determine color based on metric value
  const getMetricColor = (metric: string, value: number) => {
    // Different metrics have different thresholds
    switch (metric) {
      case 'firstContentfulPaint':
        return value < 1800 ? theme.palette.success.main : value < 3000 ? theme.palette.warning.main : theme.palette.error.main;
      case 'speedIndex':
        return value < 3400 ? theme.palette.success.main : value < 5800 ? theme.palette.warning.main : theme.palette.error.main;
      case 'largestContentfulPaint':
        return value < 2500 ? theme.palette.success.main : value < 4000 ? theme.palette.warning.main : theme.palette.error.main;
      case 'timeToInteractive':
        return value < 3800 ? theme.palette.success.main : value < 7300 ? theme.palette.warning.main : theme.palette.error.main;
      case 'totalBlockingTime':
        return value < 200 ? theme.palette.success.main : value < 600 ? theme.palette.warning.main : theme.palette.error.main;
      case 'cumulativeLayoutShift':
        return value < 0.1 ? theme.palette.success.main : value < 0.25 ? theme.palette.warning.main : theme.palette.error.main;
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
        Performance Metrics
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                First Contentful Paint
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="medium" 
                sx={{ color: getMetricColor('firstContentfulPaint', metrics.firstContentfulPaint) }}
              >
                {formatTime(metrics.firstContentfulPaint)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Speed Index
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="medium" 
                sx={{ color: getMetricColor('speedIndex', metrics.speedIndex) }}
              >
                {formatTime(metrics.speedIndex)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Largest Contentful Paint
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="medium" 
                sx={{ color: getMetricColor('largestContentfulPaint', metrics.largestContentfulPaint) }}
              >
                {formatTime(metrics.largestContentfulPaint)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Time to Interactive
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="medium" 
                sx={{ color: getMetricColor('timeToInteractive', metrics.timeToInteractive) }}
              >
                {formatTime(metrics.timeToInteractive)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Blocking Time
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="medium" 
                sx={{ color: getMetricColor('totalBlockingTime', metrics.totalBlockingTime) }}
              >
                {formatTime(metrics.totalBlockingTime)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Cumulative Layout Shift
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="medium" 
                sx={{ color: getMetricColor('cumulativeLayoutShift', metrics.cumulativeLayoutShift) }}
              >
                {metrics.cumulativeLayoutShift.toFixed(3)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Paper>
  );
}
