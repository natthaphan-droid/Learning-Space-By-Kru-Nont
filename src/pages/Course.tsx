import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Send, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function Course() {
  const { id } = useParams();
  const [content, setContent] = useState<string>('กำลังโหลดเนื้อหา...');
  const [ansContent, setAnsContent] = useState<string>('');
  
  // Fake submission state for demonstration
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Mock topic data matching new schema
  const topics: Record<string, any> = {
    't1_1': { id: 't1_1', title: '1.1 ทำความรู้จักกับเซต', type: 'basic', content_url: '/content/m4/set/1.1' },
    't1_2': { id: 't1_2', title: '1.2 วิธีการเขียนเซต', type: 'basic', content_url: '/content/m4/set/1.2' },
    't1_3': { id: 't1_3', title: '1.3 ชนิดของเซต', type: 'basic', content_url: '/content/m4/set/1.3' },
    't1_4': { id: 't1_4', title: '1.4 การเปรียบเทียบเซต', type: 'basic', content_url: '/content/m4/set/1.4' },
    't1_5': { id: 't1_5', title: '1.5 สับเซต (Subset)', type: 'basic', content_url: '/content/m4/set/1.5' },
    't1_6': { id: 't1_6', title: '1.6 เพาเวอร์เซต (Power Set)', type: 'basic', content_url: '/content/m4/set/1.6' },
    't1_7': { id: 't1_7', title: '1.7 แผนภาพเวนน์-ออยเลอร์', type: 'basic', content_url: '/content/m4/set/1.7' },
    't1_8': { id: 't1_8', title: '1.8 ยูเนียน & อินเตอร์เซกชัน', type: 'basic', content_url: '/content/m4/set/1.8' },
    't1_9': { id: 't1_9', title: '1.9 คอมพลีเมนต์ & ผลต่าง', type: 'basic', content_url: '/content/m4/set/1.9' },
    't1_10': { id: 't1_10', title: '1.10 การหาจำนวนสมาชิก (2 วง)', type: 'basic', content_url: '/content/m4/set/1.10' },
    't1_11': { id: 't1_11', title: '1.11 การหาจำนวนสมาชิก (3 วง)', type: 'basic', content_url: '/content/m4/set/1.11' },
    't2_1': { id: 't2_1', title: '2.1 ประพจน์และตัวเชื่อม', type: 'additional', content_url: '/content/m4/logic/2.1' },
    't2_2': { id: 't2_2', title: '2.2 สัจนิรันดร์', type: 'additional', content_url: '/content/m4/logic/2.2' }
  };
  
  const course = id && topics[id] ? topics[id] : topics['t1_1'];

  useEffect(() => {
    // Load lesson content
    fetch(`${course.content_url}.md`)
      .then(res => res.text())
      .then(text => setContent(text))
      .catch(() => setContent('ขออภัย ไม่พบเนื้อหา'));
      
    // Pre-load answer content
    fetch(`${course.content_url}_ans.md`)
      .then(res => res.text())
      .then(text => setAnsContent(text))
      .catch(() => setAnsContent(''));
      
    setIsSubmitted(false);
    setShowAnswer(false);
  }, [id, course.content_url]);

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-pink-500 transition">
        <ArrowLeft size={16} className="mr-1" /> กลับไปหน้าแรก
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="bg-pink-100 p-3 rounded-full">
          <BookOpen className="text-pink-500" size={28} />
        </div>
        <div>
          <span className="text-pink-500 font-medium text-sm">คณิตศาสตร์ {course.type === 'basic' ? 'พื้นฐาน' : 'เพิ่มเติม'}</span>
          <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
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
      
      {/* Worksheet Section */}
      <div className="mt-8 bg-pink-50 rounded-2xl border border-pink-100 p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-2">ถึงเวลา "ลองทำดู!" ✍️</h3>
        <p className="text-gray-600 mb-6">ดาวน์โหลดใบงาน A4 ไปฝึกทำเพื่อเช็คความเข้าใจ แล้วคลิกส่งงานเพื่อดูเฉลยครับ</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={`/worksheets/${course.id}.pdf`}
            download
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-pink-400 text-pink-600 hover:bg-pink-50 rounded-xl font-bold transition shadow-sm w-full sm:w-auto justify-center"
          >
            <Download size={20} />
            เปิด/ดาวน์โหลดใบงาน (PDF)
          </a>
          
          {!isSubmitted ? (
            <button 
              onClick={() => setIsSubmitted(true)}
              className="flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition shadow-sm w-full sm:w-auto justify-center"
            >
              <Send size={20} />
              ส่งใบงานชิ้นนี้ (จำลองส่ง)
            </button>
          ) : (
            <button 
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition shadow-sm w-full sm:w-auto justify-center"
            >
              <CheckCircle size={20} />
              ส่งงานแล้ว! คลิกเพื่อดูเฉลย
            </button>
          )}
        </div>
      </div>

      {/* Answer Key (Only visible after submit and click) */}
      {showAnswer && ansContent && (
        <div className="mt-8 bg-green-50 rounded-2xl border border-green-200 p-8 shadow-sm prose prose-green max-w-none">
          <h2 className="text-green-800 flex items-center gap-2"><CheckCircle /> เฉลยใบงาน</h2>
          <ReactMarkdown 
            remarkPlugins={[remarkMath]} 
            rehypePlugins={[rehypeKatex]}
          >
            {ansContent}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
