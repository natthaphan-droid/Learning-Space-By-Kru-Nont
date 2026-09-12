import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Assignment from './pages/Assignment';
import Admin from './pages/Admin';
import Layout from './components/Layout';

function App() {
  const [user, setUser] = useState<{ id: string; name: string; role: string; student_id: string } | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        
        {/* Protected Student Routes */}
        <Route path="/" element={user ? <Layout user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard user={user!} />} />
          <Route path="topic/:id" element={<Course />} />
          <Route path="assignment/:id" element={<Assignment user={user!} />} />
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
