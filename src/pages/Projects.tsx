
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Code, 
  Smartphone, 
  FileEdit, 
  BrainCircuit, 
  GraduationCap,
  ShoppingBag 
} from 'lucide-react';

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-colancer-purple to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Featured Projects</h1>
          <div className="flex justify-between items-center">
            <p className="text-xl max-w-2xl">
              Discover the latest projects across various categories or post your own job
            </p>
            <Button className="bg-white text-colancer-purple hover:bg-gray-100">
              + Add New Job
            </Button>
          </div>
        </div>
      </section>
      
      {/* Projects Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="text-yellow-500 text-3xl mr-2">📂</span> Freelance Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard 
              icon={<Globe size={24} />}
              title="Global Fleet"
              description="..."
              tags={[]}
            />
            
            <ProjectCard 
              icon={<Code size={24} />}
              title="Websites, IT & Software"
              description="PHP, HTML, WordPress, JavaScript..."
              tags={["PHP", "HTML", "WordPress", "JavaScript"]}
            />
            
            <ProjectCard 
              icon={<Smartphone size={24} />}
              title="Mobile Phones & Computing"
              description="Mobile App Development, Android, iOS, Kotlin..."
              tags={["Mobile App", "Android", "iOS", "Kotlin"]}
            />
            
            <ProjectCard 
              icon={<FileEdit size={24} />}
              title="Writing & Content"
              description="Content Writing, Copywriting, Research Writing..."
              tags={["Content Writing", "Copywriting", "Research"]}
            />
            
            <ProjectCard 
              icon={<BrainCircuit size={24} />}
              title="Artificial Intelligence"
              description="AI Development, ChatGPT, Hugging Face..."
              tags={["AI", "ChatGPT", "Machine Learning"]}
            />
            
            <ProjectCard 
              icon={<GraduationCap size={24} />}
              title="Education"
              description="Tutoring, Video Game Coaching, Math Teaching..."
              tags={["Tutoring", "Coaching", "Teaching"]}
            />
            
            <ProjectCard 
              icon={<ShoppingBag size={24} />}
              title="Sales & Marketing"
              description="Social Media Marketing, Facebook Ads, SEO..."
              tags={["Social Media", "Facebook Ads", "SEO"]}
            />
          </div>
        </div>
      </section>
      
      {/* Recent Projects */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Projects</h2>
            <div className="flex items-center gap-2">
              <select className="border p-2 rounded text-sm">
                <option>All Categories</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Writing</option>
                <option>Design</option>
              </select>
              <select className="border p-2 rounded text-sm">
                <option>Sort by: Latest</option>
                <option>Sort by: Budget (High to Low)</option>
                <option>Sort by: Budget (Low to High)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">E-commerce Website Development</h3>
                    <p className="text-sm text-gray-500">Posted 3 days ago by Client #{item}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full h-fit">
                    $1,500 - $3,000
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Looking for an experienced web developer to create a fully functional e-commerce website with product listings, shopping cart, and payment integration.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">React</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Node.js</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">MongoDB</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Payment Gateway</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-4">
                      <span className="font-semibold">10</span> proposals
                    </span>
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold">3-4</span> weeks
                    </span>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="icon" className="bg-colancer-purple text-white">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Projects;
