import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon, FileCheck2 } from 'lucide-react';

export default function Assignment({ user }: { user: any }) {
  // const { id } = useParams();
  const [_, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isWatermarking, setIsWatermarking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock assignment data
  const assignment = {
    id: 'a1',
    title: 'แบบฝึกหัดเรื่องเซต 1.1',
    description: 'ทำแบบฝึกหัดหน้า 15-16 ข้อ 1-5 ถ่ายรูปส่งเข้าระบบ กรุณาเขียนชื่อในกระดาษด้วย',
    dueDate: '2026-10-01T23:59:59Z'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      applyWatermark(selectedFile);
    }
  };

  const applyWatermark = (file: File) => {
    setIsWatermarking(true);
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Setup watermark style
      const fontSize = Math.max(img.width * 0.05, 24); // Responsive font size
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 0, 100, 0.4)'; // Pinkish transparent
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw watermark repeatedly or prominently
      // We will place it diagonally across the image
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      
      const watermarkText = `STUDENT ID: ${user.student_id} | ${user.name}`;
      ctx.fillText(watermarkText, 0, 0);
      
      // Add a timestamp
      ctx.font = `${fontSize * 0.5}px sans-serif`;
      ctx.fillText(`Submitted: ${new Date().toLocaleString()}`, 0, fontSize);
      ctx.restore();

      // Set preview to the watermarked image
      setPreview(canvas.toDataURL('image/jpeg', 0.8));
      setIsWatermarking(false);
      URL.revokeObjectURL(objectUrl);
    };
    
    img.src = objectUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;
    
    // In a real app, upload the `preview` data URL (or convert to Blob) to R2 via API
    // fetch('/api/submit', { method: 'POST', body: ... })
    
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-pink-500 transition">
        <ArrowLeft size={16} className="mr-1" /> กลับไปหน้าแรก
      </Link>
      
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{assignment.title}</h1>
        <p className="text-gray-600 mb-6">{assignment.description}</p>
        
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm mb-6 border border-yellow-200">
          <strong>คำแนะนำ:</strong> รูปภาพจะถูกประทับลายน้ำรหัสประจำตัวของคุณโดยอัตโนมัติก่อนส่ง
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-green-50 rounded-xl border border-green-200">
            <FileCheck2 size={64} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">ส่งงานสำเร็จ!</h3>
            <p className="text-green-600 mb-6">คุณได้ส่งงานนี้เรียบร้อยแล้ว ครูจะทำการตรวจในภายหลัง</p>
            <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              กลับสู่หน้าหลัก
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">อัปโหลดรูปภาพใบงาน</label>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-pink-50 hover:border-pink-300 transition group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 group-hover:text-pink-500 mb-3" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง</p>
                    <p className="text-xs text-gray-500">JPG, PNG, WEBP (สูงสุด 10MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden"></canvas>

            {preview && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon size={16} /> ตัวอย่างรูปที่จะส่ง (ประทับลายน้ำแล้ว)
                </h4>
                <div className="border border-gray-200 rounded-xl overflow-hidden relative bg-black flex justify-center">
                  <img src={preview} alt="Watermarked Preview" className="max-h-[400px] object-contain" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!preview || isWatermarking}
              className={`w-full py-3 rounded-lg font-bold text-white transition shadow-sm ${
                !preview || isWatermarking 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-pink-500 hover:bg-pink-600'
              }`}
            >
              {isWatermarking ? 'กำลังประทับลายน้ำ...' : 'ยืนยันการส่งงาน'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
