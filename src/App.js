import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import { getAllStudents } from './components/StudentService';

function App() {
  const [students, setStudents]           = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');

  
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (err) {
      setError('Could not connect to backend. Make sure Spring Boot is running on port 8080.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleEdit   = (student) => setEditingStudent(student);
  const handleCancel = ()        => setEditingStudent(null);
  const handleSaved  = ()        => { setEditingStudent(null); fetchStudents(); };

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <div>
              <h1>Student MS</h1>
              <p className="header-sub">KLU · Full-Stack CRUD</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-chip">
              <span className="stat-num">{students.length}</span>
              <span className="stat-label">Students</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="app-main">
        <div className="layout">
          {/* Left – Form */}
          <aside className="sidebar">
            <AddStudent
              onStudentAdded={handleSaved}
              editingStudent={editingStudent}
              onCancelEdit={handleCancel}
            />
          </aside>

          {/* Right – Table */}
          <section className="content">
            {error && <div className="global-error">{error}</div>}
            <StudentList
              students={students}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={fetchStudents}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
