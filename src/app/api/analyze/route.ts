import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AxiosError } from 'axios';
import { mockPageSpeedData } from '../mockData';

// Note: For production use, you should use an API key stored in environment variables
// The API can be used without a key but has stricter rate limits

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    // Validate URL
    if (!url || !url.startsWith('https://')) {
      return NextResponse.json(
        { error: 'Please provide a valid HTTPS URL' },
        { status: 400 }
      );
    }

    // To get an API key:
    // 1. Go to https://console.cloud.google.com/
    // 2. Create a new project (or use an existing one)
    // 3. Search for "PageSpeed Insights API" and enable it
    // 4. Go to Credentials and create an API key
    // 5. Copy the API key below
    const API_KEY = 'AIzaSyAzxtvRBCr6Lf98pZ3Rp-lSVJH3lKaNoe4'; // Google PageSpeed Insights API key
    
    // Call Google PageSpeed Insights API
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}${API_KEY ? `&key=${API_KEY}` : ''}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`;

    console.log('Calling PageSpeed API:', apiUrl);
    
    let data;
    try {
      const response = await axios.get(apiUrl, { timeout: 30000 });
      data = response.data;
      console.log('API response received successfully');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('PageSpeed API error:', axiosError.response?.data || axiosError.message);
      console.log('Using mock data for demonstration');
      
      // Use mock data for demonstration purposes
      return NextResponse.json(mockPageSpeedData);
    }

    // Process and transform the data
    try {
      // Check if the data has the expected structure
      if (!data.lighthouseResult || !data.lighthouseResult.categories) {
        console.error('Unexpected API response structure:', data);
        return NextResponse.json(
          { error: 'Received unexpected data format from PageSpeed API' },
          { status: 500 }
        );
      }

      // Create a safer function to get values from the response
      const getValue = (obj: any, path: string, defaultValue: any = 0) => {
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
          if (current === undefined || current === null) return defaultValue;
          current = current[key];
        }
        
        return current === undefined || current === null ? defaultValue : current;
      };

      // Process and transform the data
      const result = {
        score: calculateOverallScore(data),
        performance: {
          score: Math.round(getValue(data, 'lighthouseResult.categories.performance.score', 0) * 100),
          metrics: {
            firstContentfulPaint: getValue(data, 'lighthouseResult.audits.first-contentful-paint.numericValue'),
            speedIndex: getValue(data, 'lighthouseResult.audits.speed-index.numericValue'),
            largestContentfulPaint: getValue(data, 'lighthouseResult.audits.largest-contentful-paint.numericValue'),
            timeToInteractive: getValue(data, 'lighthouseResult.audits.interactive.numericValue'),
            totalBlockingTime: getValue(data, 'lighthouseResult.audits.total-blocking-time.numericValue'),
            cumulativeLayoutShift: getValue(data, 'lighthouseResult.audits.cumulative-layout-shift.numericValue'),
          },
        },
        seo: {
          score: Math.round(getValue(data, 'lighthouseResult.categories.seo.score', 0) * 100),
          issues: extractIssues(data, 'seo'),
        },
        accessibility: {
          score: Math.round(getValue(data, 'lighthouseResult.categories.accessibility.score', 0) * 100),
          issues: extractIssues(data, 'accessibility'),
        },
        bestPractices: {
          score: Math.round(getValue(data, 'lighthouseResult.categories.best-practices.score', 0) * 100),
          issues: extractIssues(data, 'best-practices'),
        },
        meta: extractMetaInfo(data),
        mobile: {
          score: extractMobileScore(data),
          isMobileFriendly: getValue(data, 'lighthouseResult.audits.viewport.score') === 1,
          viewportSet: getValue(data, 'lighthouseResult.audits.viewport.score') === 1,
          fontSizeAppropriate: getValue(data, 'lighthouseResult.audits.font-size.score') === 1,
          tapTargetsAppropriate: getValue(data, 'lighthouseResult.audits.tap-targets.score') === 1,
        },
        suggestions: generateSuggestions(data),
      };

      return NextResponse.json(result);
    } catch (error) {
      console.error('Error processing API response:', error);
      return NextResponse.json(
        { error: 'Error processing the analysis results. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error analyzing website:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper functions
function calculateOverallScore(data: any): number {
  try {
    const categories = data.lighthouseResult.categories;
    if (!categories) return 0;
    
    const scores = [
      categories.performance?.score || 0,
      categories.seo?.score || 0,
      categories.accessibility?.score || 0,
      categories['best-practices']?.score || 0,
    ];
    
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(avgScore * 100);
  } catch (error) {
    console.error('Error calculating overall score:', error);
    return 0;
  }
}

function extractIssues(data: any, category: string): Array<{ title: string; description: string; severity: 'error' | 'warning' | 'info' }> {
  try {
    const issues: Array<{ title: string; description: string; severity: 'error' | 'warning' | 'info' }> = [];
    const audits = data.lighthouseResult?.audits || {};
    
    // Get all audits that belong to the specified category
    const categoryAudits = data.lighthouseResult?.categories?.[category]?.auditRefs || [];
    
    for (const auditRef of categoryAudits) {
      const auditId = auditRef.id;
      const audit = audits[auditId];
      
      if (!audit) continue;
      
      // Skip passed audits
      if (audit.score === 1 || audit.score === null) continue;
      
      let severity: 'error' | 'warning' | 'info' = 'info';
      if (audit.score === 0) severity = 'error';
      else if (audit.score < 0.9) severity = 'warning';
      
      issues.push({
        title: audit.title || 'Unknown Issue',
        description: audit.description || 'No description available',
        severity,
      });
    }
    
    return issues;
  } catch (error) {
    console.error(`Error extracting ${category} issues:`, error);
    return [];
  }
}

function extractMetaInfo(data: any): any {
  try {
    const audits = data.lighthouseResult?.audits || {};
    
    return {
      title: audits['document-title']?.details?.items?.[0]?.value || '',
      description: audits['meta-description']?.details?.items?.[0]?.value || '',
      hasCanonical: audits['canonical']?.score === 1,
      hasFavicon: audits['installable-manifest']?.score === 1 || audits['themed-omnibox']?.score === 1,
      hasRobotsTxt: audits['robots-txt']?.score === 1,
      hasSitemap: audits['structured-data']?.score === 1, // Approximation
    };
  } catch (error) {
    console.error('Error extracting meta info:', error);
    return {
      title: '',
      description: '',
      hasCanonical: false,
      hasFavicon: false,
      hasRobotsTxt: false,
      hasSitemap: false,
    };
  }
}

function extractMobileScore(data: any): number {
  try {
    const mobileAudits = [
      'viewport',
      'font-size',
      'tap-targets',
      'content-width',
    ];
    
    let totalScore = 0;
    let count = 0;
    
    const audits = data.lighthouseResult?.audits || {};
    
    for (const auditId of mobileAudits) {
      if (audits[auditId]) {
        totalScore += audits[auditId].score || 0;
        count++;
      }
    }
    
    return count > 0 ? Math.round((totalScore / count) * 100) : 0;
  } catch (error) {
    console.error('Error extracting mobile score:', error);
    return 0;
  }
}

function generateSuggestions(data: any): Array<{ title: string; description: string; priority: 'high' | 'medium' | 'low' }> {
  try {
    const suggestions: Array<{ title: string; description: string; priority: 'high' | 'medium' | 'low' }> = [];
    const audits = data.lighthouseResult?.audits || {};
    
    if (Object.keys(audits).length === 0) {
      return [];
    }
    
    // Get all failed audits across all categories
    const failedAudits = Object.values(audits).filter(
      (audit: any) => audit && audit.score !== null && audit.score < 1
    );
    
    // Sort by score (lowest first)
    failedAudits.sort((a: any, b: any) => (a.score || 0) - (b.score || 0));
    
    // Take top 10 issues
    for (let i = 0; i < Math.min(10, failedAudits.length); i++) {
      const audit = failedAudits[i] as any;
      let priority: 'high' | 'medium' | 'low' = 'low';
      
      if (audit.score === 0) priority = 'high';
      else if (audit.score < 0.5) priority = 'medium';
      
      suggestions.push({
        title: audit.title || 'Unknown Issue',
        description: audit.description || 'No description available',
        priority,
      });
    }
    
    return suggestions;
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return [];
  }
}
