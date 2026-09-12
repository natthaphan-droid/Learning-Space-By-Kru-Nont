import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<'todo' | 'done'>('todo');

  const assignments = [
    { id: 'a1', topic: '1.2 การดำเนินการระหว่างเซต', title: 'แบบฝึกหัดเรื่องเซต 1.2', status: 'missing', dueDate: '2026-10-01' },
    // Mock done assignment
    { id: 'a2', topic: '1.1 ความหมายของเซต', title: 'ใบงานที่ 1', status: 'graded', score: 10, maxScore: 10, dueDate: '2026-09-01' }
  ];

  const todos = assignments.filter(a => a.status === 'missing' || a.status === 'pending');
  const done = assignments.filter(a => a.status === 'graded');

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center gap-3">
        <ClipboardList className="text-pink-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">ส่งงาน (Assignments)</h1>
      </header>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('todo')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'todo' ? 'text-pink-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          งานที่ต้องทำ ({todos.length})
          {activeTab === 'todo' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('done')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'done' ? 'text-pink-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          งานที่ส่งแล้ว ({done.length})
          {activeTab === 'done' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-t-full" />
          )}
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {activeTab === 'todo' ? (
          todos.length > 0 ? (
            todos.map((task, idx) => (
              <div key={task.id} className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${idx !== 0 ? 'border-t border-gray-50' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-red-50 p-3 rounded-full text-red-500 shrink-0">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">บทเรียน: {task.topic}</p>
                    <div className="flex items-center gap-1 text-sm text-red-500 mt-2 font-medium">
                      <Clock size={14} /> กำหนดส่ง: {task.dueDate}
                    </div>
                  </div>
                </div>
                <Link 
                  to={`/assignment/${task.id}`}
                  className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm font-bold transition shadow-sm whitespace-nowrap text-center"
                >
                  ส่งงาน
                </Link>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-400">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-green-200" />
              <p>ยอดเยี่ยมมาก! ไม่มีงานค้างส่งแล้ว</p>
            </div>
          )
        ) : (
          done.length > 0 ? (
            done.map((task, idx) => (
              <div key={task.id} className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${idx !== 0 ? 'border-t border-gray-50' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-full text-green-500 shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">บทเรียน: {task.topic}</p>
                    <p className="text-sm text-green-600 mt-2 font-medium">ตรวจแล้ว: ได้คะแนน {task.score}/{task.maxScore}</p>
                  </div>
                </div>
                <Link 
                  to={`/assignment/${task.id}`}
                  className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-sm font-bold transition whitespace-nowrap text-center"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            ))
          ) : (
             <div className="p-12 text-center text-gray-400">
              <p>ยังไม่มีงานที่ส่งแล้ว</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
