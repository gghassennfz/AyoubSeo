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
  Divider
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface Issue {
  title: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
}

interface IssuesListProps {
  issues: Issue[];
  title: string;
}

export default function IssuesList({ issues, title }: IssuesListProps) {
  
  if (issues.length === 0) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3,
          borderRadius: 2,
          height: '100%'
        }}
      >
        <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No issues found. Great job!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        borderRadius: 2,
        height: '100%'
      }}
    >
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <List sx={{ p: 0 }}>
        {issues.map((issue, index) => (
          <Box key={index}>
            <ListItem 
              alignItems="flex-start" 
              sx={{ 
                px: 0,
                py: 1.5
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {issue.severity === 'error' ? (
                  <ErrorIcon color="error" />
                ) : issue.severity === 'warning' ? (
                  <WarningIcon color="warning" />
                ) : (
                  <InfoIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight="medium">
                    {issue.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {issue.description}
                  </Typography>
                }
              />
            </ListItem>
            {index < issues.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
}
