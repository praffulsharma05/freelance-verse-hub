
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProfileTabs from '@/components/ProfileTabs';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { Pencil, Linkedin, Phone, Mail, Share } from 'lucide-react';

const Profile = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      {/* Cover Photo */}
      <div className="relative w-full">
        <div 
          className="h-64 md:h-80 bg-gradient-to-r from-colancer-purple to-blue-600 relative"
          style={coverImage ? { backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <div className="absolute bottom-4 right-4">
            <label htmlFor="cover-upload" className="cursor-pointer">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <Pencil size={18} className="text-white" />
              </div>
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </div>
        </div>
        
        {/* Profile Info Section */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 relative -mt-16 md:-mt-24">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0">
              <div 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                style={profileImage ? { backgroundImage: `url(${profileImage})`, backgroundSize: 'cover' } : {}}
              >
                {!profileImage && <span className="text-gray-500">Upload Photo</span>}
              </div>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 cursor-pointer">
                <div className="bg-white p-2 rounded-full shadow-md">
                  <Pencil size={16} className="text-colancer-purple" />
                </div>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-grow pt-4 md:pt-16">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">John Doe</h1>
              <p className="text-gray-600 mb-3">Full Stack Developer | React | Node.js | MongoDB</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">React</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Node.js</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">TypeScript</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">MongoDB</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Linkedin size={20} />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Phone size={20} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Mail size={20} />
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md flex items-center text-sm">
                  <Share size={16} className="mr-1" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <ProfileTabs />
      </div>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Profile;
