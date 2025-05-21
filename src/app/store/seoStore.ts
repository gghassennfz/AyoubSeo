import { create } from 'zustand';

interface SeoResult {
  score: number;
  performance: {
    score: number;
    metrics: {
      firstContentfulPaint: number;
      speedIndex: number;
      largestContentfulPaint: number;
      timeToInteractive: number;
      totalBlockingTime: number;
      cumulativeLayoutShift: number;
    };
  };
  seo: {
    score: number;
    issues: Array<{
      title: string;
      description: string;
      severity: 'error' | 'warning' | 'info';
    }>;
  };
  accessibility: {
    score: number;
    issues: Array<{
      title: string;
      description: string;
      severity: 'error' | 'warning' | 'info';
    }>;
  };
  bestPractices: {
    score: number;
    issues: Array<{
      title: string;
      description: string;
      severity: 'error' | 'warning' | 'info';
    }>;
  };
  meta: {
    title: string;
    description: string;
    hasCanonical: boolean;
    hasFavicon: boolean;
    hasRobotsTxt: boolean;
    hasSitemap: boolean;
  };
  mobile: {
    score: number;
    isMobileFriendly: boolean;
    viewportSet: boolean;
    fontSizeAppropriate: boolean;
    tapTargetsAppropriate: boolean;
  };
  suggestions: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

interface SeoState {
  url: string;
  isAnalyzing: boolean;
  result: SeoResult | null;
  error: string | null;
  setUrl: (url: string) => void;
  startAnalysis: () => void;
  setResult: (result: SeoResult) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

const initialState = {
  url: '',
  isAnalyzing: false,
  result: null,
  error: null,
};

export const useSeoStore = create<SeoState>((set) => ({
  ...initialState,
  setUrl: (url) => set({ url }),
  startAnalysis: () => set({ isAnalyzing: true, error: null }),
  setResult: (result) => set({ result, isAnalyzing: false }),
  setError: (error) => set({ error, isAnalyzing: false }),
  resetState: () => set(initialState),
}));
