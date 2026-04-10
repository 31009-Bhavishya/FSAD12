import React, { useState, useEffect } from 'react';
import { addStudent, updateStudent } from './StudentService';
import './AddStudent.css';

const EMPTY = { name: '', email: '', course: '' };

function AddStudent({ onStudentAdded, editingStudent, onCancelEdit }) {
  const [form, setForm]       = useState(EMPTY);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name:   editingStudent.name,
        email:  editingStudent.email,
        course: editingStudent.course,
      });
      setError('');
      setSuccess('');
    } else {
      setForm(EMPTY);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.course.trim()) {
      setError('All three fields are required.');
      return;
    }
    setLoading(true);
    try {
      if (editingStudent) {
        // PUT /students/{id}
        await updateStudent(editingStudent.id, form);
        setSuccess('Student updated successfully!');
      } else {
        // POST /students
        await addStudent(form);
        setSuccess('Student added successfully!');
      }
      setForm(EMPTY);
      onStudentAdded();          // triggers re-fetch in parent
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(EMPTY);
    setError('');
    setSuccess('');
    onCancelEdit();
  };

  const isEditing = !!editingStudent;

  return (
    <div className={`form-card ${isEditing ? 'is-editing' : ''}`}>
      {/* Card Header */}
      <div className="form-header">
        <div className="form-badge">{isEditing ? '✏️ Edit Mode' : '＋ New Student'}</div>
        <h2 className="form-title">
          {isEditing ? 'Update Student' : 'Add Student'}
        </h2>
        <p className="form-sub">
          {isEditing
            ? `Editing record ID #${editingStudent.id}`
            : 'Fill the form to register a new student'}
        </p>
      </div>

      {/* Alerts */}
      {error   && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name" name="name" type="text"
            placeholder="e.g. Arjun Sharma"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email" name="email" type="email"
            placeholder="e.g. arjun@klu.ac.in"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <input
            id="course" name="course" type="text"
            placeholder="e.g. B.Tech CSE"
            value={form.course}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving…' : isEditing ? 'Update Student' : 'Add Student'}
          </button>
          {isEditing && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
