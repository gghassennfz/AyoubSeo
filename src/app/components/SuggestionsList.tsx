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
  Divider,
  Chip,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';

interface Suggestion {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const theme = useTheme();
  
  if (suggestions.length === 0) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
          Improvement Suggestions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No suggestions available. Your website is doing great!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Improvement Suggestions
      </Typography>
      <List sx={{ p: 0 }}>
        {suggestions.map((suggestion, index) => (
          <Box key={index}>
            <ListItem 
              alignItems="flex-start" 
              sx={{ 
                px: 0,
                py: 1.5
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Avatar 
                  sx={{
                    bgcolor: suggestion.priority === 'high' 
                      ? alpha(theme.palette.error.main, 0.1)
                      : suggestion.priority === 'medium'
                        ? alpha(theme.palette.warning.main, 0.1)
                        : alpha(theme.palette.info.main, 0.1),
                    width: 32,
                    height: 32
                  }}
                >
                  {suggestion.priority === 'high' ? (
                    <TrendingUpIcon 
                      fontSize="small" 
                      sx={{ color: theme.palette.error.main }} 
                    />
                  ) : suggestion.priority === 'medium' ? (
                    <TrendingFlatIcon 
                      fontSize="small" 
                      sx={{ color: theme.palette.warning.main }} 
                    />
                  ) : (
                    <TrendingDownIcon 
                      fontSize="small" 
                      sx={{ color: theme.palette.info.main }} 
                    />
                  )}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {suggestion.title}
                    </Typography>
                    {suggestion.priority === 'high' && (
                      <Chip 
                        size="small" 
                        label="High Priority" 
                        sx={{ 
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          color: theme.palette.error.main,
                          height: 20,
                          fontSize: '0.7rem'
                        }} 
                      />
                    )}
                    {suggestion.priority === 'medium' && (
                      <Chip 
                        size="small" 
                        label="Medium Priority" 
                        sx={{ 
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          color: theme.palette.warning.main,
                          height: 20,
                          fontSize: '0.7rem'
                        }} 
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {suggestion.description}
                  </Typography>
                }
              />
            </ListItem>
            {index < suggestions.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
}
