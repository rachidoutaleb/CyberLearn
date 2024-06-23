package com.example.UserDashboard.service.imp;


import com.example.UserDashboard.model.FavoriteCourse;
import com.example.UserDashboard.model.UserProfile;
import com.example.UserDashboard.repository.FavoriteCourseRepository;
import com.example.UserDashboard.repository.UserProfileRepository;
import com.example.UserDashboard.service.FavoriteCourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class FavoriteCourseServiceImpl implements FavoriteCourseService {

    FavoriteCourseRepository favoriteCourseRepository;
    UserProfileRepository userProfileRepository;

    public FavoriteCourseServiceImpl(FavoriteCourseRepository favoriteCourseRepository, UserProfileRepository userProfileRepository) {
        this.favoriteCourseRepository = favoriteCourseRepository;
        this.userProfileRepository = userProfileRepository;
    }


    @Override
    public ResponseEntity<?> isCourseFavorite(int userId, int courseId) {
        UserProfile userProfile = userProfileRepository.findById(userId).orElse(null);
        if (userProfile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        FavoriteCourse favoriteCourse = favoriteCourseRepository.findById(courseId).orElse(null);
        if (favoriteCourse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }

        boolean isFavorite = userProfile.getFavoriteCourses().contains(favoriteCourse);
        return ResponseEntity.ok(isFavorite);
    }


    @Override
    public ResponseEntity<String> addFavoriteCourse(int userId, int courseId) {

        // Check if the user exists
        UserProfile userProfile = userProfileRepository.findById(userId).orElse(null);
        if (userProfile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Check if the course exists
        FavoriteCourse favoriteCourse = favoriteCourseRepository.findById(courseId).orElse(null);
        if (favoriteCourse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }

        // Check if the course is already in favorites
        if (userProfile.getFavoriteCourses().contains(favoriteCourse)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Course is already in favorites");
        }

        // Add the course to the user's favorite courses
        userProfile.getFavoriteCourses().add(favoriteCourse);
        userProfileRepository.save(userProfile);

        return ResponseEntity.status(HttpStatus.CREATED).body("Course added to favorites");
    }


    @Override
    public ResponseEntity<?> deleteFavoriteCourse(int userId, int courseId) {
        UserProfile userProfile = userProfileRepository.findById(userId).orElse(null);
        FavoriteCourse favoriteCourse = favoriteCourseRepository.findById(courseId).orElse(null);

        if (userProfile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (favoriteCourse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }

        if (!userProfile.getFavoriteCourses().contains(favoriteCourse)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course is not in favorites");
        }

        userProfile.getFavoriteCourses().remove(favoriteCourse);
        userProfileRepository.save(userProfile);

        return ResponseEntity.ok("Course removed from favorites");
    }


    @Override
    public ResponseEntity<List<FavoriteCourse>> getFavoriteCourses(int userId) {
        Optional<UserProfile> userOptional = userProfileRepository.findById(userId);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return HTTP 404 if user not found
        }

        UserProfile userProfile = userOptional.get();
        List<FavoriteCourse> favoriteCours = new ArrayList<>(userProfile.getFavoriteCourses()); // Convert to List

        return ResponseEntity.ok(favoriteCours); // Return HTTP 200 with the List
    }

}
