
import Navbar from '@/components/Navbar';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-colancer-purple to-blue-600 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="text-sm font-medium uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">ENTERPRISE SUITE</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-2">Co-Lancer...</h1>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              <span className="text-blue-200">How</span> Co-Lancer Work?
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              A integrated website that helps collages to start gaining work experience within the collage.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-colancer-purple hover:bg-gray-100"
              asChild
            >
              <Link to="/projects">Learn more</Link>
            </Button>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="public/lovable-uploads/f031b8ca-a39a-4d27-be3f-cba5423295b3.png" 
              alt="Freelancer working" 
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Co-Lancer?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers powerful tools and features to help freelancers succeed and grow their career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Work</h3>
              <p className="text-gray-600">
                Access thousands of projects across various categories and industries. Filter by skill, budget, and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Paid Securely</h3>
              <p className="text-gray-600">
                Our secure payment system ensures you get paid on time, every time, with protection for both parties.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Career</h3>
              <p className="text-gray-600">
                Build your portfolio, earn reviews, and access skill development resources to advance your freelancing career.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <Button asChild variant="outline">
              <Link to="/projects">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg mb-1">Website Redesign Project</h3>
                      <p className="text-sm text-gray-500">Posted 2 days ago</p>
                    </div>
                    <span className="text-green-600 font-semibold">$500-1000</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Looking for a skilled web designer to redesign our company website. Experience with React and responsive design required.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">UI/UX</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Web Design</span>
                  </div>
                  <Button size="sm" className="w-full">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-colancer-purple py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to start freelancing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals finding work and clients on Co-Lancer.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-colancer-purple hover:bg-gray-100">
              Find Work
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Post a Project
            </Button>
          </div>
        </div>
      </section>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Home;
