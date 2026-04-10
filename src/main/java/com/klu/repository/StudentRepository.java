package com.klu.repository;

import com.klu.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository provides: save(), findAll(), findById(), deleteById(), existsById()
}
