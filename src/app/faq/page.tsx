import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">What is SEO Analyzer?</h2>
              <p className="text-gray-700">
                SEO Analyzer is a comprehensive tool that helps you evaluate your website's performance, 
                SEO, accessibility, and best practices. It provides detailed insights and actionable 
                recommendations to improve your website's search engine rankings and user experience.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">How accurate are the results?</h2>
              <p className="text-gray-700">
                Our tool uses Google PageSpeed Insights API, which is the industry standard for website 
                performance analysis. The results are highly accurate and reflect the same metrics that 
                Google uses to evaluate websites for search rankings. However, SEO is complex and involves 
                many factors, so the tool should be used as a guide rather than an absolute measure.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">Is my data secure?</h2>
              <p className="text-gray-700">
                Yes, we take data security seriously. We only analyze publicly accessible websites and 
                do not store your website's data longer than necessary to provide the analysis. We don't 
                collect any personal information from the websites we analyze.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">How often should I analyze my website?</h2>
              <p className="text-gray-700">
                We recommend analyzing your website after making significant changes to its content, 
                structure, or design. For regular monitoring, a monthly analysis is usually sufficient 
                to track performance trends and identify new issues that may arise.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">Can I analyze any website?</h2>
              <p className="text-gray-700">
                You can analyze any publicly accessible website that uses HTTPS. However, some websites 
                may have restrictions that prevent complete analysis. Also, websites that require 
                authentication (login) will only be analyzed based on their public-facing pages.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">What should I do with the results?</h2>
              <p className="text-gray-700">
                The analysis provides specific recommendations prioritized by their potential impact. 
                Start by addressing high-priority issues first, such as critical performance problems 
                or major SEO issues. You can export the results as a PDF to share with your development 
                team or keep for your records.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">Is this tool free to use?</h2>
              <p className="text-gray-700">
                Yes, SEO Analyzer is completely free to use. We believe in making powerful SEO tools 
                accessible to everyone. However, we do have usage limits in place to prevent abuse of 
                the service.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
