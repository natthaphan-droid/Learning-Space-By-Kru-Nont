import { Link } from 'react-router-dom';
import { BookOpen, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
  // Mock data representing chapters instead of raw courses
  const chapters = [
    { id: 'ch1', title: 'บทที่ 1: เซต', type: 'basic', topicCount: 2 },
    { id: 'ch2', title: 'บทที่ 2: ตรรกศาสตร์', type: 'additional', topicCount: 2 },
  ];

  const assignments = [
    { id: 'a1', topic: '1.2 การดำเนินการระหว่างเซต', title: 'แบบฝึกหัดเรื่องเซต 1.2', status: 'missing', dueDate: '2026-10-01' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">สวัสดี, {user.name} 👋</h1>
        <p className="text-gray-500">ยินดีต้อนรับสู่ห้องเรียนออนไลน์</p>
      </header>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-red-500 font-medium">งานค้างส่ง (Missing)</p>
            <h2 className="text-3xl font-bold text-red-600 mt-1">1 งาน</h2>
          </div>
          <AlertCircle className="text-red-300" size={48} />
        </div>
        <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-yellow-600 font-medium">รอครูตรวจ (Pending)</p>
            <h2 className="text-3xl font-bold text-yellow-700 mt-1">0 งาน</h2>
          </div>
          <CheckCircle2 className="text-yellow-300" size={48} />
        </div>
      </div>

      {/* Chapters */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">บทเรียนของคุณ (มัธยมศึกษาปีที่ 4)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map(chapter => (
            <div key={chapter.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  chapter.type === 'basic' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {chapter.type === 'basic' ? 'คณิตศาสตร์พื้นฐาน' : 'คณิตศาสตร์เพิ่มเติม'}
                </div>
                <BookOpen className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{chapter.title}</h3>
              <p className="text-gray-500 text-sm mt-2 mb-4">มีทั้งหมด {chapter.topicCount} หัวข้อย่อย</p>
              <div className="text-sm font-medium text-pink-500 flex items-center">
                เลือกหัวข้อย่อยจากเมนูด้านซ้ายเพื่อเริ่มเรียน <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assignments List */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">สถานะงาน (Assignments)</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {assignments.map((assignment, index) => (
            <div key={assignment.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${index !== 0 ? 'border-t border-gray-50' : ''}`}>
              <div>
                <h4 className="font-medium text-gray-800">{assignment.title}</h4>
                <p className="text-sm text-gray-500">หัวข้อ: {assignment.topic} | กำหนดส่ง: {assignment.dueDate}</p>
              </div>
              <div className="flex items-center gap-4">
                {assignment.status === 'missing' && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium whitespace-nowrap">ยังไม่ส่ง</span>
                )}
                <Link 
                  to={`/assignment/${assignment.id}`}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition whitespace-nowrap"
                >
                  ดูรายละเอียด / ส่งงาน
                </Link>
              </div>
            </div>
          ))}
          {assignments.length === 0 && (
            <div className="p-8 text-center text-gray-500">ไม่มีงานในระบบ</div>
          )}
        </div>
      </section>
    </div>
  );
}
