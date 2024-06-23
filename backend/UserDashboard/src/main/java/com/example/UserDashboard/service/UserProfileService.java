package com.example.UserDashboard.service;

import com.example.UserDashboard.model.UserProfile;
import org.springframework.http.ResponseEntity;

public interface UserProfileService {
    UserProfile getUserById(int id);

    ResponseEntity<String> updateUserProfile(
            int id,
            String username,
            String email,
            String dob,
            String profession,
            String institution,
            String oldPassword,
            String newPassword);
}
