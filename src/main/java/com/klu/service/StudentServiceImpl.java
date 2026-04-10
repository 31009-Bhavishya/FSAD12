package com.klu.service;

import com.klu.model.Student;
import com.klu.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // ── Add new student ──
    @Override
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // ── Retrieve all students ──
    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ── Update existing student ──
    @Override
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setCourse(updatedStudent.getCourse());

        return studentRepository.save(existing);
    }

    // ── Delete student by ID ──
    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
}
