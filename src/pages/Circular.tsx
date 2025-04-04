
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';

const Circular = () => {
  const [view, setView] = useState('table');
  const [theme, setTheme] = useState('light');
  
  const circulars = [
    { id: 1, date: '2024-12-01', title: 'Circular 1', description: 'Important update about upcoming events.' },
    { id: 2, date: '2024-11-15', title: 'Circular 2', description: 'Announcement regarding new policies.' },
    { id: 3, date: '2024-11-10', title: 'Circular 3', description: 'Details about the ongoing competitions.' },
    { id: 4, date: '2024-10-28', title: 'Circular 4', description: 'Information about new freelance opportunities.' },
    { id: 5, date: '2024-10-15', title: 'Circular 5', description: 'Important notice for all freelancers.' },
  ];
  
  const toggleView = () => {
    setView(view === 'table' ? 'grid' : 'table');
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <Navbar isAuthenticated={true} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Latest Circulars</h1>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Search Circulars" 
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-colancer-purple ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            />
            <Search className="absolute right-3 top-3 text-gray-500" size={18} />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="dropdown relative">
              <Button 
                variant="outline" 
                className={`flex items-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
              >
                SELECT CATEGORY <ChevronDown className="ml-2" size={16} />
              </Button>
            </div>
            
            <div className="dropdown relative">
              <Button 
                variant="outline"
                className={`flex items-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
              >
                SORT BY DATE: DESC <ChevronDown className="ml-2" size={16} />
              </Button>
            </div>
            
            <div className="flex ml-auto">
              <Button 
                variant="outline" 
                onClick={toggleView}
                className={`mr-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
              >
                TOGGLE VIEW
              </Button>
              <Button 
                variant="outline"
                onClick={toggleTheme}
                className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
              >
                TOGGLE THEME
              </Button>
            </div>
          </div>
        </div>
        
        {/* Circulars Table */}
        <div className={`overflow-x-auto ${theme === 'dark' ? 'bg-gray-800 shadow-xl' : 'bg-white shadow'} rounded-lg`}>
          <table className="min-w-full">
            <thead>
              <tr className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {circulars.map((circular) => (
                <tr 
                  key={circular.id} 
                  className={`hover:bg-gray-50 hover:bg-opacity-10 ${
                    theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  }`}
                >
                  <td className="py-4 px-6">{circular.date}</td>
                  <td className="py-4 px-6">{circular.title}</td>
                  <td className="py-4 px-6">{circular.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-6">
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
              &gt;
            </Button>
          </div>
        </div>
      </div>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Circular;
