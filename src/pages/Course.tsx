import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Course() {
  // const { id } = useParams();
  
  // Mock course data
  const course = {
    id: 'c1',
    title: 'เซตและการดำเนินการ',
    type: 'basic',
    aksorn_url: 'https://onlearn.aksorn.com/aksorn-on-learn?permission=license'
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-pink-500 transition">
        <ArrowLeft size={16} className="mr-1" /> กลับไปหน้าแรก
      </Link>
      
      <div className="flex justify-between items-start">
        <div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3 inline-block">
            คณิตศาสตร์พื้นฐาน
          </span>
          <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        </div>
        <a 
          href={course.aksorn_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition font-medium"
        >
          เปิดในแท็บใหม่ <ExternalLink size={16} />
        </a>
      </div>

      {/* Aksorn Embed Iframe */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm h-[600px] flex flex-col">
        <div className="bg-gray-50 border-b border-gray-200 p-3 text-sm text-gray-500 flex justify-between">
          <span>เนื้อหาบทเรียนจาก Aksorn On-Learn</span>
          <span>(หากเนื้อหาไม่แสดง กรุณากด "เปิดในแท็บใหม่" มุมขวาบน)</span>
        </div>
        <iframe 
          src={course.aksorn_url} 
          className="w-full flex-1"
          title="Aksorn Course Content"
          sandbox="allow-scripts allow-same-origin allow-popups"
        ></iframe>
      </div>
      
      {/* Assignments for this course */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">งานในบทเรียนนี้</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex justify-between items-center">
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
