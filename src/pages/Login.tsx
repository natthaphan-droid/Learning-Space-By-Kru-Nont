import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // In a real app, this would call /api/auth
    // Mocking the login for now based on schema
    if (studentId === '12345' && password === '12345') {
      onLogin({ id: 'u1', student_id: '12345', name: 'สมชาย เรียนดี', role: 'student' });
      navigate('/');
    } else if (studentId === 'admin' && password === 'admin123') {
      onLogin({ id: 'u2', student_id: 'admin', name: 'ครูสมปอง', role: 'admin' });
      navigate('/admin');
    } else {
      setError('รหัสประจำตัว หรือ รหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mallow-bg px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-pink-50 p-4 rounded-full mb-4">
            <BookOpen className="text-pink-400" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">MathMallow</h1>
          <p className="text-gray-500 mt-2">เข้าสู่ระบบเพื่อเรียนคณิตศาสตร์ออนไลน์</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสประจำตัวนักเรียน</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition"
              placeholder="เช่น 12345"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน (วัน/เดือน/ปีเกิด)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition"
              placeholder="รหัสผ่านที่ครูตั้งให้"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-medium py-2.5 rounded-lg transition shadow-sm"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
