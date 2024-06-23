package com.example.UserDashboard.service.imp;


import com.example.UserDashboard.model.UserProfile;
import com.example.UserDashboard.repository.UserProfileRepository;
import com.example.UserDashboard.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userRepository;

    @Autowired
    public UserProfileServiceImpl(UserProfileRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserProfile getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }


    public void updateUser(int id, UserProfile updatedUser) {
        UserProfile existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        // Update user information
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setDob(updatedUser.getDob());
        existingUser.setProfession(updatedUser.getProfession());
        existingUser.setInstitution(updatedUser.getInstitution());

        // Update password if provided
        String newPassword = updatedUser.getPassword();
        if (newPassword != null && !newPassword.isEmpty()) {
            existingUser.setPassword(newPassword);
        }

        // Save the updated user to the database
        userRepository.save(existingUser);
    }

    @Override
    public ResponseEntity<String> updateUserProfile(
            int id,
            String username,
            String email,
            String dob,
            String profession,
            String institution,
            String oldPassword,
            String newPassword) {

        try {
            UserProfile user = getUserById(id);


            // Password update logic
            if ((oldPassword == null || oldPassword.isEmpty()) && (newPassword == null || newPassword.isEmpty())) {
                // Update user details without changing password
                user.setUsername(username);
                user.setEmail(email);
                user.setDob(dob);
                user.setProfession(profession);
                user.setInstitution(institution);
            } else if (oldPassword != null && !oldPassword.isEmpty() && newPassword != null && !newPassword.isEmpty()) {
                // Check if the old password matches
                if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                    return ResponseEntity.ok().body("Old password does not match");
                }
                if (!isValidPassword(newPassword)) {
                    return ResponseEntity.ok().body("Password must contain at least one uppercase letter, one number, and have a minimum length of 8 characters.");
                }
                else{
                    newPassword = passwordEncoder.encode(newPassword);
                    user.setPassword(newPassword);
                    user.setUsername(username);
                    user.setEmail(email);
                    user.setDob(dob);
                    user.setProfession(profession);
                    user.setInstitution(institution);}
            } else {
                return ResponseEntity.ok().body("Both old and new passwords should be provided");
            }

            updateUser(id, user);
            return ResponseEntity.ok("User edited successfully");

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exception: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + ex.getMessage());
        }
    }


    @Autowired
    private PasswordEncoder passwordEncoder;
    private boolean isValidPassword(String password) {
        if (password == null || password.isEmpty()) {
            return false;
        }

        if (password.length() < 8) {
            return false;
        }

        boolean hasUpperCase = false;
        boolean hasNumber = false;
        for (char ch : password.toCharArray()) {
            if (Character.isUpperCase(ch)) {
                hasUpperCase = true;
            } else if (Character.isDigit(ch)) {
                hasNumber = true;
            }
            if (hasUpperCase && hasNumber) {
                break;
            }
        }

        return hasUpperCase && hasNumber;
    }

}