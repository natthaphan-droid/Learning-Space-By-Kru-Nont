import { Link } from 'react-router-dom';
import { BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
  // Mock data for UI demonstration
  const courses = [
    { id: 'c1', title: 'เซตและการดำเนินการ', type: 'basic' },
    { id: 'c2', title: 'ตรรกศาสตร์', type: 'additional' },
  ];

  const assignments = [
    { id: 'a1', course: 'เซตและการดำเนินการ', title: 'แบบฝึกหัดเรื่องเซต 1.1', status: 'missing', dueDate: '2026-10-01' },
    { id: 'a2', course: 'ตรรกศาสตร์', title: 'แบบฝึกหัดตรรกศาสตร์', status: 'pending', dueDate: '2026-10-05' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">สวัสดี, {user.name} 👋</h1>
        <p className="text-gray-500">นี่คือภาพรวมการเรียนและงานของคุณ</p>
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
            <h2 className="text-3xl font-bold text-yellow-700 mt-1">1 งาน</h2>
          </div>
          <CheckCircle2 className="text-yellow-300" size={48} />
        </div>
      </div>

      {/* Courses */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">บทเรียนของคุณ (Courses)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition hover:border-pink-200 block"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.type === 'basic' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {course.type === 'basic' ? 'คณิตศาสตร์พื้นฐาน' : 'คณิตศาสตร์เพิ่มเติม'}
                </div>
                <BookOpen className="text-gray-300 group-hover:text-pink-400 transition" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
              <p className="text-gray-500 text-sm mt-2">คลิกเพื่อเข้าสู่บทเรียนและส่งงาน</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Assignments List */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">สถานะงาน (Assignments)</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {assignments.map((assignment, index) => (
            <div key={assignment.id} className={`p-4 flex items-center justify-between ${index !== 0 ? 'border-t border-gray-50' : ''}`}>
              <div>
                <h4 className="font-medium text-gray-800">{assignment.title}</h4>
                <p className="text-sm text-gray-500">วิชา: {assignment.course} | กำหนดส่ง: {assignment.dueDate}</p>
              </div>
              <div className="flex items-center gap-4">
                {assignment.status === 'missing' && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">ยังไม่ส่ง</span>
                )}
                {assignment.status === 'pending' && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">รอตรวจ</span>
                )}
                <Link 
                  to={`/assignment/${assignment.id}`}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition"
                >
                  ดูรายละเอียด / ส่งงาน
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
