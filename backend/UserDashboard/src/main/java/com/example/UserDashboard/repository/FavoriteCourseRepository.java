package com.example.UserDashboard.repository;

import com.example.UserDashboard.model.FavoriteCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteCourseRepository extends JpaRepository<FavoriteCourse, Integer> {

}