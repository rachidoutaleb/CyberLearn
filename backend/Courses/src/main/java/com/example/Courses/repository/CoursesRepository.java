package com.example.Courses.repository;

import com.example.Courses.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CoursesRepository extends JpaRepository<Course, Integer> {

    @Query("SELECT c FROM  Course c WHERE c.year LIKE %?1%")
    List<Course> findAll(String keyword);
    List<Course> findByYearAndSemesterAndModule(String year, String semester, String module);


}
