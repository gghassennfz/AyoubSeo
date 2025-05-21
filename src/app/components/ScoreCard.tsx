"use client";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Material UI imports
import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

interface ScoreCardProps {
  score: number;
  title: string;
  description?: string;
}

export default function ScoreCard({ score, title, description }: ScoreCardProps) {
  const theme = useTheme();
  
  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 90) return theme.palette.success.main; // Green
    if (score >= 50) return theme.palette.warning.main; // Orange
    return theme.palette.error.main; // Red
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        height: '100%',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ width: 100, height: 100, mb: 2 }}>
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textSize: '22px',
            pathColor: getColor(score),
            textColor: getColor(score),
            trailColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
          })}
        />
      </Box>
      {description && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ mt: 1 }}
        >
          {description}
        </Typography>
      )}
    </Paper>
  );
}
