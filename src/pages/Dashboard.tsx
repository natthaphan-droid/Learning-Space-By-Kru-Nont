
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
  // Mock data representing chapters instead of raw courses
  const chapters = [
    { id: 'ch1', title: 'บทที่ 1: เซต', type: 'basic', topicCount: 2 },
    { id: 'ch2', title: 'บทที่ 2: ตรรกศาสตร์', type: 'additional', topicCount: 2 },
  ];

  return (
    <div className="space-y-8">
      <header className="bg-gradient-to-r from-pink-50 to-white p-8 rounded-3xl border border-pink-100 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">ยินดีต้อนรับเข้าสู่ห้องเรียน, {user.name} 👋</h1>
          <p className="text-gray-500 mt-2 text-lg">เลือกบทเรียนที่ต้องการศึกษาจากด้านล่าง หรือจากแถบสารบัญด้านซ้ายมือได้เลยครับ!</p>
        </div>
        <GraduationCap className="text-pink-200 hidden md:block" size={80} />
      </header>

      {/* Chapters */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-pink-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">บทเรียนของคุณ (มัธยมศึกษาปีที่ 4)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map(chapter => (
            <div key={chapter.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  chapter.type === 'basic' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {chapter.type === 'basic' ? 'คณิตศาสตร์พื้นฐาน' : 'คณิตศาสตร์เพิ่มเติม'}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{chapter.title}</h3>
              <p className="text-gray-500 text-sm mt-2 mb-6">เนื้อหาทั้งหมด {chapter.topicCount} หัวข้อย่อย</p>
              <div className="text-sm font-medium text-pink-500 flex items-center bg-pink-50 w-fit px-4 py-2 rounded-lg">
                เลือกหัวข้อย่อยจากเมนูด้านซ้าย <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
