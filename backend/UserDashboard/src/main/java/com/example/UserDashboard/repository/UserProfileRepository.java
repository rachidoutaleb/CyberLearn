package com.example.UserDashboard.repository;

import com.example.UserDashboard.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile,Integer> {


}
