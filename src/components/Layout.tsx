import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, BookOpen, LayoutDashboard, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  user: { name: string; role: string };
  onLogout: () => void;
}

// Mock Curriculum Data for Sidebar
const curriculum = [
  {
    grade: 'มัธยมศึกษาปีที่ 4',
    chapters: [
      {
        id: 'ch1',
        title: 'บทที่ 1: เซต',
        topics: [
          { id: 't1_1', title: '1.1 ความหมายและสัญลักษณ์' },
          { id: 't1_2', title: '1.2 การดำเนินการระหว่างเซต' },
        ]
      },
      {
        id: 'ch2',
        title: 'บทที่ 2: ตรรกศาสตร์',
        topics: [
          { id: 't2_1', title: '2.1 ประพจน์และตัวเชื่อม' },
          { id: 't2_2', title: '2.2 สัจนิรันดร์' },
        ]
      }
    ]
  }
];

export default function Layout({ user, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

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
            <span className="text-gray-800 hidden sm:inline">MathMallow</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-pink-500 hidden sm:flex items-center gap-1 text-sm font-medium">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin" className="text-gray-600 hover:text-pink-500 hidden sm:flex items-center gap-1 text-sm font-medium">
              <Settings size={16} /> Admin
            </Link>
          )}
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
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
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 overflow-y-auto hidden md:block">
            <div className="p-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">สารบัญบทเรียน (สสวท.)</h2>
              {curriculum.map((grade, gIdx) => (
                <div key={gIdx} className="mb-6">
                  <h3 className="font-bold text-pink-500 mb-2">{grade.grade}</h3>
                  <div className="space-y-4 pl-2">
                    {grade.chapters.map(chapter => (
                      <div key={chapter.id}>
                        <h4 className="font-medium text-gray-800 text-sm mb-1">{chapter.title}</h4>
                        <ul className="space-y-1 pl-2 border-l-2 border-gray-100">
                          {chapter.topics.map(topic => {
                            const isActive = location.pathname === `/topic/${topic.id}`;
                            return (
                              <li key={topic.id}>
                                <Link 
                                  to={`/topic/${topic.id}`}
                                  className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                    isActive 
                                      ? 'bg-pink-50 text-pink-600 font-medium' 
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                  }`}
                                >
                                  {topic.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
