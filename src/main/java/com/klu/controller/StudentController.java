package com.klu.controller;

import com.klu.model.Student;
import com.klu.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")   // Allow React dev server
public class StudentController {

    @Autowired
    private StudentService studentService;

    // POST /students  →  Add a new student
    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student saved = studentService.addStudent(student);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);         // 201
    }

    // GET /students  →  Retrieve all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);            // 200
    }

    // PUT /students/{id}  →  Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {
        Student updated = studentService.updateStudent(id, student);
        return new ResponseEntity<>(updated, HttpStatus.OK);             // 200
    }

    // DELETE /students/{id}  →  Delete a student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK); // 200
    }
}
