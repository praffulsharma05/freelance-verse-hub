
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share } from 'lucide-react';

const Competition = () => {
  const [timeLeft, setTimeLeft] = useState('Competition Ended');
  
  // This could be implemented with a real countdown in a real app
  useEffect(() => {
    // Just for demonstration purposes
    const interval = setInterval(() => {
      // Not implementing actual countdown for the demo
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-colancer-purple to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Upcoming Competitions</h1>
          <p className="text-xl mb-8 max-w-4xl">
            Get ready for the most exciting competition of the year! Participate and win amazing prizes while showcasing your skills. Don't miss out on the fun and challenges ahead.
          </p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-light mb-4">Time Left: <span className="text-yellow-300">{timeLeft}</span></h2>
            <Button className="bg-white text-colancer-purple hover:bg-gray-100">
              JOIN NOW
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Eligibility</h3>
                <p>Anyone above 18 years of age can participate.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Prizes</h3>
                <p>Exciting prizes for the winners!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Deadline</h3>
                <p>Submit your entries before the final date.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10">
            <p className="text-lg">102 Participants have joined so far!</p>
            
            <div className="mt-6 flex items-center">
              <span className="mr-3">Share this competition:</span>
              <Button variant="ghost" className="text-white">
                <Share size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Previous Competitions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Previous Competitions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden card-hover">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <span className="bg-colancer-purple px-2 py-1 rounded text-xs">Completed</span>
                      <h3 className="text-xl font-semibold mt-2">Web Design Challenge {item}</h3>
                      <p className="text-sm opacity-90">December 2023</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-gray-600 mb-4">
                    A competition focused on creating innovative and responsive website designs for various industries.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">
                        <span className="font-semibold">256</span> Participants
                      </span>
                    </div>
                    <Button variant="outline" size="sm">View Results</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button>View All Competitions</Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How do I participate in competitions?</h3>
              <p className="text-gray-600">
                To participate in a competition, navigate to the competition page, click on "JOIN NOW" button, and follow the instructions to submit your entry.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How are winners selected?</h3>
              <p className="text-gray-600">
                Winners are selected by a panel of judges based on creativity, technical execution, and adherence to the competition guidelines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">When and how will I receive my prize?</h3>
              <p className="text-gray-600">
                Prizes are distributed within 14 days of the competition results announcement. Winners will be contacted via email with instructions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Competition;
