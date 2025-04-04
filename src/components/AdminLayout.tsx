
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, CircleDollarSign, 
  Settings, LogOut, Menu, X, ChevronDown, ChevronUp 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/admin' },
    { icon: Users, name: 'User Management', path: '/admin/users' },
    { icon: FileText, name: 'Project Management', path: '/admin/projects' },
    { icon: CircleDollarSign, name: 'Finances', path: '/admin/finances' },
    { icon: Settings, name: 'Settings', path: '/admin/settings' },
  ];
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    // This will be replaced with actual authentication logic
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col w-64 bg-white border-r shadow-sm transition-all duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "fixed inset-y-0 lg:translate-x-0 lg:static z-40"
        )}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-colancer-purple">Co-Lancer</h1>
            <span className="text-xs bg-colancer-purple text-white px-2 py-1 rounded ml-2">Admin</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-colancer-purple bg-opacity-10 text-colancer-purple"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User Section */}
        <div className="px-4 py-2 border-t bg-gray-50">
          <div className="relative">
            <button
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-colancer-purple flex items-center justify-center text-white">
                  A
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@colancer.com</p>
              </div>
              {userMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {userMenuOpen && (
              <div className="absolute bottom-full mb-2 w-full bg-white rounded-md shadow-lg border">
                <div className="py-1">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
