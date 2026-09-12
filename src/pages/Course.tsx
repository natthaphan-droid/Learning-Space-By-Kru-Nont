import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function Course() {
  const { id } = useParams();
  const [content, setContent] = useState<string>('กำลังโหลดเนื้อหา...');

  // Mock course data matching schema
  const courses: Record<string, any> = {
    'c1': { id: 'c1', title: 'เซตและการดำเนินการ', type: 'basic', content_url: '/content/courses/c1.md' },
    'c2': { id: 'c2', title: 'ตรรกศาสตร์', type: 'additional', content_url: '/content/courses/c2.md' }
  };
  
  const course = id && courses[id] ? courses[id] : courses['c1'];

  useEffect(() => {
    fetch(course.content_url)
      .then(res => res.text())
      .then(text => setContent(text))
      .catch(() => setContent('ไม่สามารถโหลดเนื้อหาได้ กรุณาลองใหม่อีกครั้ง'));
  }, [course.content_url]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-pink-500 transition">
        <ArrowLeft size={16} className="mr-1" /> กลับไปหน้าแรก
      </Link>
      
      <div className="flex justify-between items-start border-b border-gray-100 pb-6">
        <div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3 inline-block">
            คณิตศาสตร์พื้นฐาน
          </span>
          <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        </div>
        <div className="bg-pink-50 p-3 rounded-full text-pink-400">
          <BookOpen size={24} />
        </div>
      </div>

      {/* Markdown Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm prose prose-pink max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
        <ReactMarkdown 
          remarkPlugins={[remarkMath]} 
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      {/* Assignments for this course */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">งานในบทเรียนนี้</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex justify-between items-center hover:border-pink-200 transition">
          <div>
            <h4 className="font-medium text-gray-800">แบบฝึกหัดเรื่องเซต 1.1</h4>
            <p className="text-sm text-gray-500 mt-1">กำหนดส่ง: 2026-10-01</p>
          </div>
          <Link 
            to="/assignment/a1"
            className="px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg text-sm font-medium transition"
          >
            ส่งงาน
          </Link>
        </div>
      </div>
    </div>
  );
}
