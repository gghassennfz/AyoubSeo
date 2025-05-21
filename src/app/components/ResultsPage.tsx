"use client";

import { useSeoStore } from '../store/seoStore';
import ScoreCard from './ScoreCard';
import IssuesList from './IssuesList';
import SuggestionsList from './SuggestionsList';
import MetaInfoCard from './MetaInfoCard';
import PerformanceMetrics from './PerformanceMetrics';
import MobileInfo from './MobileInfo';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Material UI imports
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import {
  Download as DownloadIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';

export default function ResultsPage() {
  const { result, url } = useSeoStore();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  if (!result) return null;
  
  const handleExportPDF = async () => {
    if (!resultsRef.current) return;
    
    const canvas = await html2canvas(resultsRef.current, {
      scale: 1,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    
    pdf.setFontSize(18);
    pdf.text(`SEO Analysis for ${url}`, 14, 15);
    pdf.setFontSize(10);
    pdf.text(`Generated on ${new Date().toLocaleString()}`, 14, 22);
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`seo-analysis-${new URL(url).hostname}.pdf`);
  };
  
  const handleCopyResults = () => {
    const text = `
      SEO Analysis for ${url}
      Generated on ${new Date().toLocaleString()}
      
      Overall Score: ${result.score}%
      
      Performance Score: ${result.performance.score}%
      SEO Score: ${result.seo.score}%
      Accessibility Score: ${result.accessibility.score}%
      Best Practices Score: ${result.bestPractices.score}%
      Mobile Friendliness: ${result.mobile.score}%
      
      Meta Information:
      Title: ${result.meta.title}
      Description: ${result.meta.description}
      
      Top Issues:
      ${result.seo.issues.map((issue: { title: string }) => `- ${issue.title}`).join('\n')}
      
      Top Suggestions:
      ${result.suggestions.map((suggestion: { title: string; priority: string }) => `- ${suggestion.title} (${suggestion.priority} priority)`).join('\n')}
    `;
    
    navigator.clipboard.writeText(text.trim());
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          SEO Analysis Results for {url}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<CopyIcon />}
            onClick={handleCopyResults}
            sx={{ borderRadius: 2 }}
          >
            Copy Results
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExportPDF}
            sx={{ borderRadius: 2 }}
          >
            Export PDF
          </Button>
        </Stack>
      </Box>
      
      <Box ref={resultsRef}>
        {/* Overall Score */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box sx={{ width: 240 }}>
            <ScoreCard 
              score={result.score} 
              title="Overall SEO Score" 
              description="Combined score of all metrics" 
            />
          </Box>
        </Box>
        
        {/* Category Scores */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <ScoreCard 
                score={result.performance.score} 
                title="Performance" 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ScoreCard 
                score={result.seo.score} 
                title="SEO" 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ScoreCard 
                score={result.accessibility.score} 
                title="Accessibility" 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ScoreCard 
                score={result.bestPractices.score} 
                title="Best Practices" 
              />
            </Grid>
          </Grid>
        </Box>
        
        {/* Performance Metrics */}
        <Box sx={{ mb: 4 }}>
          <PerformanceMetrics metrics={result.performance.metrics} />
        </Box>
        
        {/* Two Column Layout for Mobile and Meta Info */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MobileInfo mobile={result.mobile} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MetaInfoCard metaInfo={result.meta} />
            </Grid>
          </Grid>
        </Box>
        
        {/* Issues Lists */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <IssuesList issues={result.seo.issues} title="SEO Issues" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <IssuesList issues={result.accessibility.issues} title="Accessibility Issues" />
            </Grid>
          </Grid>
        </Box>
        
        {/* Suggestions */}
        <Box sx={{ mb: 4 }}>
          <SuggestionsList suggestions={result.suggestions} />
        </Box>
      </Box>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Results copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
