// Mock data for demonstration purposes
// Function to generate random scores and values
const generateRandomScore = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a new set of mock data each time this is imported
export const mockPageSpeedData = {
  score: generateRandomScore(50, 95),
  performance: {
    score: generateRandomScore(40, 95),
    metrics: {
      firstContentfulPaint: generateRandomScore(1200, 3000),
      speedIndex: generateRandomScore(1500, 4000),
      largestContentfulPaint: generateRandomScore(1800, 4500),
      timeToInteractive: generateRandomScore(2000, 5000),
      totalBlockingTime: generateRandomScore(100, 500),
      cumulativeLayoutShift: Number((Math.random() * 0.5).toFixed(2)),
    },
  },
  seo: {
    score: generateRandomScore(60, 98),
    issues: [
      {
        title: "Document doesn't have a meta description",
        description: "Meta descriptions may be included in search results to concisely summarize page content.",
        severity: "warning",
      },
      {
        title: "Links do not have descriptive text",
        description: "Link text (and alternative text for images, when used as links) that is descriptive helps search engines understand your content.",
        severity: "warning",
      },
      {
        title: "Image elements do not have [alt] attributes",
        description: "Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute.",
        severity: "error",
      },
    ],
  },
  accessibility: {
    score: generateRandomScore(55, 95),
    issues: [
      {
        title: "Background and foreground colors do not have a sufficient contrast ratio",
        description: "Low-contrast text is difficult or impossible for many users to read.",
        severity: "error",
      },
      {
        title: "Heading elements are not in a sequentially-descending order",
        description: "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies.",
        severity: "warning",
      },
    ],
  },
  bestPractices: {
    score: generateRandomScore(65, 98),
    issues: [
      {
        title: "Uses deprecated APIs",
        description: "Deprecated APIs will eventually be removed from the browser.",
        severity: "info",
      },
      {
        title: "Browser errors were logged to the console",
        description: "Errors logged to the console indicate unresolved problems that could affect your website's functionality.",
        severity: "warning",
      },
    ],
  },
  meta: {
    title: "Example Website - Home Page",
    description: "This is an example website for demonstration purposes.",
    hasCanonical: Math.random() > 0.3,
    hasFavicon: Math.random() > 0.2,
    hasRobotsTxt: Math.random() > 0.5,
    hasSitemap: Math.random() > 0.6,
  },
  mobile: {
    score: generateRandomScore(60, 95),
    isMobileFriendly: Math.random() > 0.2,
    viewportSet: Math.random() > 0.15,
    fontSizeAppropriate: Math.random() > 0.3,
    tapTargetsAppropriate: Math.random() > 0.4,
  },
  suggestions: [
    {
      title: "Properly size images",
      description: "Serve images that are appropriately-sized to save cellular data and improve load time.",
      priority: "high",
    },
    {
      title: "Eliminate render-blocking resources",
      description: "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.",
      priority: "high",
    },
    {
      title: "Reduce unused JavaScript",
      description: "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity.",
      priority: "medium",
    },
    {
      title: "Serve static assets with an efficient cache policy",
      description: "A long cache lifetime can speed up repeat visits to your page.",
      priority: "medium",
    },
    {
      title: "Use video formats for animated content",
      description: "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF.",
      priority: "low",
    },
  ],
};
