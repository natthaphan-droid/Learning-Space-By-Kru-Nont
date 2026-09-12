import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, BookOpen, Settings, Menu, MessageSquare, Megaphone, FileText } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  user: { name: string; role: string };
  onLogout: () => void;
}

export default function Layout({ user, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <Megaphone size={20} />, label: 'หน้าแรก' },
    { path: '/learn', icon: <BookOpen size={20} />, label: 'เรียนออนไลน์' },
    { path: '/tasks', icon: <FileText size={20} />, label: 'ส่งงาน' },
    { path: '/contact', icon: <MessageSquare size={20} />, label: 'สอบถามข้อมูล' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mallow-bg">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="text-xl font-bold text-mallow-pink flex items-center gap-2">
            <BookOpen className="text-pink-400" size={24} />
            <span className="text-gray-800 hidden sm:inline">Learning Space</span>
            <span className="text-sm font-normal text-gray-500 hidden sm:inline">by KruNont</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user.role === 'admin' && (
            <Link to="/admin" className="text-gray-600 hover:text-pink-500 hidden sm:flex items-center gap-1 text-sm font-medium border-l border-gray-200 pl-4">
              <Settings size={16} /> Admin
            </Link>
          )}
          <div className="h-6 w-px bg-gray-200 hidden sm:block ml-2"></div>
          <span className="text-gray-600 font-medium text-sm">{user.name}</span>
          <button 
            onClick={onLogout}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 overflow-y-auto hidden md:block">
            <div className="p-4 space-y-2 mt-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-pink-50 text-pink-600 font-bold' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
