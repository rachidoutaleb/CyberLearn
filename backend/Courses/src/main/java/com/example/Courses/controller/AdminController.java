package com.example.Courses.controller;


import com.example.Courses.model.Course;
import com.example.Courses.service.AdminCoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin/cours")
public class AdminController {

    @Autowired
    private AdminCoursesService adminCoursesService;

    @GetMapping({"", "/"})
    public List<Course> showCoursList(@RequestParam("keyword") String keyword) {
        return adminCoursesService.showCoursList(keyword);
    }


    @PostMapping("/upload")
    public ResponseEntity<String> createCourse(@RequestParam("file") MultipartFile file,
                                               @RequestParam("name") String name,
                                               @RequestParam("year") String year,
                                               @RequestParam("semester") String semester,
                                               @RequestParam("module") String module,
                                               @RequestParam("description") String description) {

        return adminCoursesService.createCourse(file, name, year, semester, module, description);
    }


    @GetMapping("/edit")
    public ResponseEntity<Course> showEditPage(@RequestParam int id) {
        return adminCoursesService.showEditPage(id);
    }


    @PostMapping("/edit")
    public ResponseEntity<String> updateCourse(@RequestParam int id,
                                               @RequestParam(value = "file", required = false) MultipartFile file,
                                               @RequestParam("name") String name,
                                               @RequestParam("year") String year,
                                               @RequestParam("semester") String semester,
                                               @RequestParam("module") String module,
                                               @RequestParam("description") String description) {

        return adminCoursesService.updateCourse(id, file, name, year, semester, module, description);
    }




    @GetMapping("/delete")
    public ResponseEntity<String> deleteCourse(@RequestParam int id) {
        return adminCoursesService.deleteCourse(id);
    }

}