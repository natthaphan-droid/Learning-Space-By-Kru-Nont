import { Trophy, FileCheck } from 'lucide-react';

export default function Grades() {
  const grades = [
    { id: 'a2', topic: '1.1 ความหมายของเซต', title: 'ใบงานที่ 1', score: 10, maxScore: 10, submitDate: '2026-09-01' },
    { id: 'a3', topic: '1.2 การดำเนินการระหว่างเซต', title: 'แบบทดสอบย่อย', score: 8, maxScore: 10, submitDate: '2026-09-05' }
  ];

  const totalScore = grades.reduce((acc, curr) => acc + curr.score, 0);
  const totalMax = grades.reduce((acc, curr) => acc + curr.maxScore, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">ผลการเรียน (Grades)</h1>
        </div>
        
        {/* Total Score Summary Card */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
          <div>
            <p className="text-yellow-700 font-medium text-sm">คะแนนรวมทั้งหมด</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-extrabold text-yellow-600">{totalScore}</span>
              <span className="text-yellow-700 font-medium text-lg">/ {totalMax}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium rounded-tl-2xl">ชิ้นงาน</th>
                <th className="p-4 font-medium hidden sm:table-cell">หัวข้อบทเรียน</th>
                <th className="p-4 font-medium">วันที่ส่ง</th>
                <th className="p-4 font-medium text-right rounded-tr-2xl">คะแนน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {grades.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FileCheck size={16} className="text-pink-400 hidden sm:block" />
                      <span className="font-medium text-gray-800">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500 hidden sm:table-cell">{item.topic}</td>
                  <td className="p-4 text-sm text-gray-500">{item.submitDate}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-baseline gap-1">
                      <span className="font-bold text-lg text-gray-800">{item.score}</span>
                      <span className="text-sm text-gray-400">/{item.maxScore}</span>
                    </span>
                  </td>
                </tr>
              ))}
              {grades.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">ยังไม่มีคะแนนในระบบ</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
