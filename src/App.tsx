import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Assignment from './pages/Assignment';
import Tasks from './pages/Tasks';
import Grades from './pages/Grades';
import Learn from './pages/Learn';
import Contact from './pages/Contact';
import Worksheet from './pages/Worksheet';
import Admin from './pages/Admin';
import Layout from './components/Layout';

function App() {
  const [user, setUser] = useState<{ id: string; name: string; role: string; student_id: string } | null>({
    id: 'u1', name: 'สมชาย เรียนดี', role: 'student', student_id: '12345'
  }); // Note: Hardcoded for preview without logging in again

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        
        <Route path="/worksheet/:id" element={<Worksheet />} />
        
        {/* Protected Student Routes */}
        <Route path="/" element={user ? <Layout user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard user={user!} />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:gradeId" element={<Learn />} />
          <Route path="learn/:gradeId/:chapterId" element={<Learn />} />
          <Route path="topic/:id" element={<Course />} />
          <Route path="assignment/:id" element={<Assignment user={user!} />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="grades" element={<Grades />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={user?.role === 'admin' ? <Layout user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}>
          <Route index element={<Admin user={user!} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
