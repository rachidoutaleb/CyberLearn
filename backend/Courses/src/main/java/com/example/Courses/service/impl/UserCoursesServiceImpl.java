package com.example.Courses.service.impl;


import com.example.Courses.model.Course;
import com.example.Courses.repository.CoursesRepository;
import com.example.Courses.service.UserCoursesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCoursesServiceImpl  implements UserCoursesService {
    CoursesRepository coursesRepository;

    public UserCoursesServiceImpl(CoursesRepository coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    @Override
    public List<Course> showCoursList(String year, String semester, String module){
        return coursesRepository.findByYearAndSemesterAndModule(year, semester, module);
    }


}
