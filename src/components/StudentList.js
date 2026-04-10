import React, { useState } from 'react';
import { deleteStudent } from './StudentService';
import './StudentList.css';

function StudentList({ students, loading, onEdit, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError]           = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setDeletingId(id);
    setError('');
    try {
      
      await deleteStudent(id);
      onRefresh();
    } catch (err) {
      setError('Failed to delete student. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="list-card">
      {}
      <div className="list-header">
        <div>
          <h2 className="list-title">Student Records</h2>
          <p className="list-sub">All registered students — live data from MySQL via Spring Boot</p>
        </div>
        <button className="btn-refresh" onClick={onRefresh} title="Refresh">
          ↻ Refresh
        </button>
      </div>

      {error && <div className="list-error">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="list-loading">
          <div className="spinner" />
          <p>Fetching students from backend…</p>
        </div>
      ) : students.length === 0 ? (
        /* Empty State */
        <div className="list-empty">
          <div className="empty-icon">🎓</div>
          <h3>No Students Yet</h3>
          <p>Add a student using the form on the left to get started.</p>
        </div>
      ) : (
        /* Table */
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className={deletingId === student.id ? 'row-deleting' : ''}>
                  <td>
                    <span className="id-badge">#{student.id}</span>
                  </td>
                  <td>
                    <div className="student-name">
                      <div className="avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      {student.name}
                    </div>
                  </td>
                  <td>
                    <span className="email-text">{student.email}</span>
                  </td>
                  <td>
                    <span className="course-chip">{student.course}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      {/* Update Button → pre-fills form */}
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(student)}
                        title="Edit student"
                      >
                        ✏️ Edit
                      </button>
                      {/* Delete Button → calls DELETE /students/{id} */}
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(student.id)}
                        disabled={deletingId === student.id}
                        title="Delete student"
                      >
                        {deletingId === student.id ? '…' : '🗑 Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer count */}
      {!loading && students.length > 0 && (
        <div className="list-footer">
          Showing <strong>{students.length}</strong> student{students.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default StudentList;
