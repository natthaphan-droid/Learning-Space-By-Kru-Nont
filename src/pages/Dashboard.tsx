import { Megaphone, Bell } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <header className="bg-gradient-to-r from-pink-400 to-pink-500 p-10 rounded-3xl text-white flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-4xl font-bold">ยินดีต้อนรับ, {user.name}!</h1>
          <p className="mt-2 text-pink-100 text-lg">เข้าสู่ Learning Space by KruNont แหล่งเรียนรู้คณิตศาสตร์ออนไลน์</p>
        </div>
      </header>

      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Megaphone className="text-pink-500" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">ประกาศข่าวสาร (Announcements)</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-4">
            <Bell className="text-blue-500 shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-blue-900">เริ่มเรียนเทอม 2!</h3>
              <p className="text-blue-700 text-sm mt-1">ยินดีต้อนรับนักเรียนทุกคนเข้าสู่ภาคเรียนใหม่ ขอให้นักเรียนตรวจสอบตารางเรียนและส่งงานให้ตรงเวลานะครับ</p>
              <span className="text-xs text-blue-400 mt-2 block">อัปเดตเมื่อ: 1 พ.ย. 2026</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex gap-4">
            <Bell className="text-gray-400 shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-gray-700">อัปเดตระบบเว็บใหม่</h3>
              <p className="text-gray-600 text-sm mt-1">ตอนนี้สามารถดาวน์โหลดใบงาน A4 และส่งงานผ่านหน้าบทเรียนได้โดยตรงแล้วครับ</p>
              <span className="text-xs text-gray-400 mt-2 block">อัปเดตเมื่อ: 12 ก.ย. 2026</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
