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

  // Mock topic data matching new schema
  const topics: Record<string, any> = {
    't1_1': { id: 't1_1', title: '1.1 ทำความรู้จักกับเซต', type: 'basic', content_url: '/content/m4/set/1.1.md' },
    't1_2': { id: 't1_2', title: '1.2 วิธีการเขียนเซต', type: 'basic', content_url: '/content/m4/set/1.2.md' },
    't1_3': { id: 't1_3', title: '1.3 ชนิดของเซต', type: 'basic', content_url: '/content/m4/set/1.3.md' },
    't1_4': { id: 't1_4', title: '1.4 การเปรียบเทียบเซต', type: 'basic', content_url: '/content/m4/set/1.4.md' },
    't1_5': { id: 't1_5', title: '1.5 สับเซต (Subset)', type: 'basic', content_url: '/content/m4/set/1.5.md' },
    't1_6': { id: 't1_6', title: '1.6 เพาเวอร์เซต (Power Set)', type: 'basic', content_url: '/content/m4/set/1.6.md' },
    't1_7': { id: 't1_7', title: '1.7 แผนภาพเวนน์-ออยเลอร์', type: 'basic', content_url: '/content/m4/set/1.7.md' },
    't1_8': { id: 't1_8', title: '1.8 ยูเนียน & อินเตอร์เซกชัน', type: 'basic', content_url: '/content/m4/set/1.8.md' },
    't1_9': { id: 't1_9', title: '1.9 คอมพลีเมนต์ & ผลต่าง', type: 'basic', content_url: '/content/m4/set/1.9.md' },
    't1_10': { id: 't1_10', title: '1.10 การหาจำนวนสมาชิก (2 วง)', type: 'basic', content_url: '/content/m4/set/1.10.md' },
    't1_11': { id: 't1_11', title: '1.11 การหาจำนวนสมาชิก (3 วง)', type: 'basic', content_url: '/content/m4/set/1.11.md' },
    't2_1': { id: 't2_1', title: '2.1 ประพจน์และตัวเชื่อม', type: 'additional', content_url: '/content/m4/logic/2.1.md' },
    't2_2': { id: 't2_2', title: '2.2 สัจนิรันดร์', type: 'additional', content_url: '/content/m4/logic/2.2.md' }
  };
  
  const course = id && topics[id] ? topics[id] : topics['t1_1'];

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
