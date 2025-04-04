
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm, SignupForm } from '@/components/AuthForms';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Demo login as guest feature
  const loginAsGuest = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-colancer-purple to-blue-600">
      <div className="container mx-auto px-4 flex-grow flex flex-col md:flex-row items-center justify-center py-12">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-white md:pr-12">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-4">Co-Lancer</h1>
            <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
              A platform that helps freelancers connect, collaborate, and grow their career opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-colancer-purple"
                onClick={loginAsGuest}
              >
                Try as Guest
              </Button>
              <Button className="bg-white text-colancer-purple hover:bg-gray-100">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-4">Why Choose Co-Lancer?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Find relevant freelance opportunities tailored to your skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Connect with clients and other freelancers globally</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Showcase your portfolio and get discovered</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>AI-powered assistance for optimizing your profile and proposals</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setActiveTab('signup')}
                      className="text-colancer-purple hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActiveTab('login')}
                      className="text-colancer-purple hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
