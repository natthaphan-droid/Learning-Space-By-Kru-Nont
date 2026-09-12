import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Printer, ArrowLeft } from 'lucide-react';

export default function Worksheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('กำลังโหลดใบงาน...');

  // Use the same mock topic mapping to find the correct file
  const topics: Record<string, string> = {
    't1_1': '/content/m4/set/1.1',
    't1_2': '/content/m4/set/1.2',
    't1_3': '/content/m4/set/1.3',
    't1_4': '/content/m4/set/1.4',
  };

  useEffect(() => {
    const basePath = id && topics[id] ? topics[id] : topics['t1_1'];
    fetch(`${basePath}_worksheet.md`)
      .then(res => {
        if (!res.ok) throw new Error('Worksheet not found');
        return res.text();
      })
      .then(text => setContent(text))
      .catch(() => setContent('ขออภัย ไม่พบใบงานสำหรับหัวข้อนี้'));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white">
      {/* Controls (Hidden when printing) */}
      <div className="max-w-[21cm] mx-auto mb-4 flex justify-between items-center print:hidden px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 font-medium transition"
        >
          <ArrowLeft size={20} /> กลับไปหน้าบทเรียน
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-bold transition shadow-sm"
        >
          <Printer size={20} /> สั่งพิมพ์ใบงาน (A4)
        </button>
      </div>

      {/* A4 Paper Container */}
      <div className="bg-white mx-auto shadow-lg print:shadow-none" style={{ width: '21cm', minHeight: '29.7cm', padding: '2cm' }}>
        <div className="prose prose-pink max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h1:text-center prose-h1:mb-8">
          <ReactMarkdown 
            remarkPlugins={[remarkMath]} 
            rehypePlugins={[rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
