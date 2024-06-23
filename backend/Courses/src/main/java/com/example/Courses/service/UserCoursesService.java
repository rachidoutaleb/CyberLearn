package com.example.Courses.service;

import com.example.Courses.model.Course;

import java.util.List;

public interface UserCoursesService {
    List<Course> showCoursList(String year, String semester, String module);
}
