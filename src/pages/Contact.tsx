import { MessageSquare, Mail, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="text-pink-500" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">ติดต่อสอบถาม (Contact)</h1>
        <p className="text-gray-500 mt-2">มีข้อสงสัยเรื่องบทเรียน หรือมีปัญหาการใช้งานระบบ ติดต่อครูนนท์ได้ตามช่องทางด้านล่างเลยครับ</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Line OA */}
        <a href="#" className="bg-white p-6 rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-md transition group flex flex-col items-center text-center">
          <div className="bg-green-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare className="text-green-500" size={32} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">LINE Official</h3>
          <p className="text-sm text-gray-500 mt-1">@krunont_math</p>
          <span className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium">เพิ่มเพื่อนเลย</span>
        </a>

        {/* Facebook */}
        <a href="#" className="bg-white p-6 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-md transition group flex flex-col items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Globe className="text-blue-500" size={32} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Facebook Page</h3>
          <p className="text-sm text-gray-500 mt-1">เรียนคณิตศาสตร์กับครูนนท์</p>
          <span className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">ส่งข้อความ (Inbox)</span>
        </a>
        
        {/* Email */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center sm:col-span-2">
           <Mail className="text-gray-400 mb-2" size={24} />
           <h3 className="font-bold text-gray-800">Email</h3>
           <p className="text-gray-600">krunont.math@example.com</p>
        </div>
      </div>
    </div>
  );
}
