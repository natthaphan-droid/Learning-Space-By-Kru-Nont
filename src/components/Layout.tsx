import { Outlet, Link } from 'react-router-dom';
import { LogOut, BookOpen, LayoutDashboard, Settings } from 'lucide-react';

interface LayoutProps {
  user: { name: string; role: string };
  onLogout: () => void;
}

export default function Layout({ user, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-mallow-pink flex items-center gap-2">
            <BookOpen className="text-pink-400" />
            <span className="text-gray-800">MathMallow</span>
          </Link>
          
          <div className="hidden md:flex space-x-4 ml-6">
            <Link to="/" className="text-gray-600 hover:text-pink-500 flex items-center gap-1">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-pink-500 flex items-center gap-1">
                <Settings size={18} />
                Admin
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">{user.name}</span>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 bg-red-50 px-3 py-2 rounded-lg transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
