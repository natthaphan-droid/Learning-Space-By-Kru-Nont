import { useState } from 'react';
import { Users, BookOpen, CheckSquare, Plus } from 'lucide-react';

export default function Admin({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'grading'>('grading');

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">ระบบจัดการสำหรับครู</h1>
        <p className="text-gray-500">ยินดีต้อนรับ, {user.name} จัดการนักเรียน บทเรียน และตรวจงานได้ที่นี่</p>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('grading')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'grading' ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <CheckSquare size={18} /> ตรวจงาน (1)
        </button>
        <button 
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'courses' ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BookOpen size={18} /> จัดการบทเรียน
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'students' ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Users size={18} /> จัดการนักเรียน
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
        {activeTab === 'grading' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">งานที่รอตรวจล่าสุด</h2>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-medium">นักเรียน</th>
                    <th className="p-4 font-medium">งาน</th>
                    <th className="p-4 font-medium">ส่งเมื่อ</th>
                    <th className="p-4 font-medium text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">สมชาย เรียนดี</div>
                      <div className="text-gray-500 text-xs">รหัส: 12345</div>
                    </td>
                    <td className="p-4">แบบฝึกหัดตรรกศาสตร์</td>
                    <td className="p-4 text-gray-500">วันนี้, 10:30 น.</td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1.5 bg-pink-100 text-pink-700 hover:bg-pink-200 rounded-lg font-medium transition text-xs">
                        ดูและให้คะแนน
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">รายการบทเรียน</h2>
              <button className="flex items-center gap-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition">
                <Plus size={16} /> เพิ่มบทเรียน
              </button>
            </div>
            <p className="text-gray-500 text-sm">ส่วนนี้สำหรับเชื่อมลิงก์ของ Aksorn On-Learn และสร้างหัวข้องาน</p>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">รายชื่อนักเรียน</h2>
              <button className="flex items-center gap-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition">
                <Plus size={16} /> เพิ่มนักเรียนใหม่
              </button>
            </div>
            <p className="text-gray-500 text-sm">สามารถรีเซ็ตรหัสผ่านหรือดูประวัติการส่งงานรายบุคคลได้</p>
          </div>
        )}
      </div>
    </div>
  );
}
