package com.example.UserDashboard.service;

import com.example.UserDashboard.model.FavoriteCourse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FavoriteCourseService {
    ResponseEntity<?> isCourseFavorite(int userId, int courseId);

    ResponseEntity<String> addFavoriteCourse(int userId, int courseId);

    ResponseEntity<?> deleteFavoriteCourse(int userId, int courseId);

    ResponseEntity<List<FavoriteCourse>> getFavoriteCourses(int userId);
}
