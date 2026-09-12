import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChevronRight, Folder } from 'lucide-react';

// Mock DB
const data = {
  grades: [
    { id: 'm4', title: 'มัธยมศึกษาปีที่ 4', desc: 'เนื้อหาคณิตศาสตร์ ม.4 พื้นฐานและเพิ่มเติม' }
  ],
  chapters: {
    'm4': [
      { id: 'ch1', title: 'บทที่ 1: เซต', type: 'basic', topicsCount: 11 },
      { id: 'ch2', title: 'บทที่ 2: ตรรกศาสตร์', type: 'additional', topicsCount: 2 }
    ]
  },
  topics: {
    'ch1': [
      { id: 't1_1', title: '1.1 ทำความรู้จักกับเซต' },
      { id: 't1_2', title: '1.2 วิธีการเขียนเซต' },
      { id: 't1_3', title: '1.3 ชนิดของเซต' },
      { id: 't1_4', title: '1.4 การเปรียบเทียบเซต' },
      { id: 't1_5', title: '1.5 สับเซต' },
      { id: 't1_6', title: '1.6 เพาเวอร์เซต' },
      { id: 't1_7', title: '1.7 แผนภาพเวนน์-ออยเลอร์' },
      { id: 't1_8', title: '1.8 ยูเนียน & อินเตอร์เซกชัน' },
      { id: 't1_9', title: '1.9 คอมพลีเมนต์ & ผลต่าง' },
      { id: 't1_10', title: '1.10 การหาจำนวนสมาชิก (2 วง)' },
      { id: 't1_11', title: '1.11 การหาจำนวนสมาชิก (3 วง)' },
    ]
  }
};

export default function Learn() {
  const { gradeId, chapterId } = useParams();

  // 1. Show Topics if chapter is selected
  if (chapterId) {
    const topics = data.topics[chapterId as keyof typeof data.topics] || [];
    return (
      <div className="space-y-6">
        <Link to={`/learn/${gradeId}`} className="text-gray-500 hover:text-pink-500 flex items-center gap-1 text-sm font-medium">
          <ChevronRight className="rotate-180" size={16} /> กลับไปเลือกบทเรียน
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Folder className="text-pink-400" /> เลือกหัวข้อย่อย
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map(t => (
            <Link key={t.id} to={`/topic/${t.id}`} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-pink-300 hover:shadow-md transition flex justify-between items-center group">
              <span className="font-medium text-gray-800 group-hover:text-pink-600 transition">{t.title}</span>
              <ChevronRight className="text-gray-300 group-hover:text-pink-400 transition" size={20} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // 2. Show Chapters if grade is selected
  if (gradeId) {
    const chapters = data.chapters[gradeId as keyof typeof data.chapters] || [];
    return (
      <div className="space-y-6">
        <Link to="/learn" className="text-gray-500 hover:text-pink-500 flex items-center gap-1 text-sm font-medium">
          <ChevronRight className="rotate-180" size={16} /> กลับไปเลือกระดับชั้น
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-pink-400" /> เลือกบทเรียน
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map(ch => (
            <Link key={ch.id} to={`/learn/${gradeId}/${ch.id}`} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-pink-300 hover:shadow-md transition">
               <div className={`w-fit px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  ch.type === 'basic' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {ch.type === 'basic' ? 'คณิตศาสตร์พื้นฐาน' : 'คณิตศาสตร์เพิ่มเติม'}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{ch.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{ch.topicsCount} หัวข้อย่อย</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // 3. Show Grades (Default)
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <GraduationCap className="text-pink-400" /> เลือกระดับชั้น
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.grades.map(g => (
          <Link key={g.id} to={`/learn/${g.id}`} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-pink-300 hover:shadow-md transition block text-center">
             <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <BookOpen className="text-pink-500" size={32} />
             </div>
             <h3 className="text-xl font-bold text-gray-800">{g.title}</h3>
             <p className="text-gray-500 text-sm mt-2">{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { GraduationCap } from 'lucide-react';
