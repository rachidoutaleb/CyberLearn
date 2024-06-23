package com.example.UserDashboard.controller;

import com.example.UserDashboard.model.FavoriteCourse;
import com.example.UserDashboard.service.FavoriteCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user/cours")
public class FavoriteCourseController {

    @Autowired
    FavoriteCourseService favoriteCourseService;

    @GetMapping("/is-favorite")
    public ResponseEntity<?> isCourseFavorite(
            @RequestParam("userId") int userId,
            @RequestParam("courseId") int courseId
    ) {
        return favoriteCourseService.isCourseFavorite(userId,courseId);
    }

    @PostMapping("/add-favorite")
    public ResponseEntity<String> addFavoriteCourse(@RequestParam("userId") int userId, @RequestParam("courseId") int courseId) {
        {
            return favoriteCourseService.addFavoriteCourse(userId,courseId);
        }
    }


    @PostMapping("/delete-favorite")
    public ResponseEntity<?> deleteFavoriteCourse(@RequestParam("userId") int userId, @RequestParam("courseId") int courseId) {
        return favoriteCourseService.deleteFavoriteCourse(userId,courseId);
    }


    @GetMapping("/get-favorite")
    public ResponseEntity<List<FavoriteCourse>> getFavoriteCourses(@RequestParam("userId") int userId) {
        return favoriteCourseService.getFavoriteCourses(userId);
    }
    }
