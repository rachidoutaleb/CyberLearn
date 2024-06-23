package com.example.Courses.service;

import com.example.Courses.model.Course;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminCoursesService {
    List<Course> showCoursList(String keyword);

    ResponseEntity<String> createCourse(MultipartFile file,
                                        String name,
                                        String year,
                                        String semester,
                                        String module,
                                        String description);

    ResponseEntity<Course> showEditPage(int id);


    ResponseEntity<String> updateCourse(int id,
                                        MultipartFile file,
                                        String name,
                                        String year,
                                        String semester,
                                        String module,
                                        String description);

    ResponseEntity<String> deleteCourse(int id);
}
