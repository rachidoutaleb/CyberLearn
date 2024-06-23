package com.example.Courses.controller;


import com.example.Courses.model.Course;
import com.example.Courses.service.AdminCoursesService;
import com.example.Courses.service.UserCoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user/cours/")
public class UserController {


    @Autowired
    private UserCoursesService userCoursesService;

    @GetMapping("/list")
    public List<Course> showCoursList(@RequestParam String year , @RequestParam String semester, @RequestParam String module){
        return userCoursesService.showCoursList(year,semester,module);
    }

}
