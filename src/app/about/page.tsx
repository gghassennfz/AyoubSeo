import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">About SEO Analyzer</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              SEO Analyzer is dedicated to helping website owners and developers improve their online presence 
              through comprehensive SEO analysis. We believe that everyone should have access to powerful tools 
              that can help them understand and optimize their websites for better search engine rankings.
            </p>
            <p className="text-gray-700">
              Our tool provides detailed insights into various aspects of your website's performance, 
              including loading speed, SEO best practices, accessibility, and mobile-friendliness. 
              By identifying areas for improvement, we help you make data-driven decisions to enhance 
              your website's visibility and user experience.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-700 mb-4">
              SEO Analyzer uses Google PageSpeed Insights API to perform a comprehensive analysis of your website. 
              When you enter a URL, our system sends a request to Google's servers, which then crawl your website 
              and evaluate various performance and SEO metrics.
            </p>
            <p className="text-gray-700 mb-4">
              The data is processed and transformed into an easy-to-understand format, highlighting key areas 
              of strength and opportunities for improvement. Our analysis covers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Performance metrics (loading speed, interactivity, visual stability)</li>
              <li>SEO best practices (meta tags, content structure, links)</li>
              <li>Accessibility for users with disabilities</li>
              <li>Mobile-friendliness and responsiveness</li>
              <li>Web development best practices and security</li>
            </ul>
            <p className="text-gray-700">
              Based on the analysis, we provide actionable recommendations prioritized by their potential impact 
              on your website's performance and search engine rankings.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
            <p className="text-gray-700 mb-4">
              SEO Analyzer is built using modern web technologies to ensure reliability, speed, and accuracy:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>React and Next.js for a fast, responsive user interface</li>
              <li>Node.js for server-side processing</li>
              <li>Google PageSpeed Insights API for website analysis</li>
              <li>TailwindCSS for beautiful, responsive design</li>
              <li>Zustand for efficient state management</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
