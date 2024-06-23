package com.example.UserDashboard.controller;


import com.example.UserDashboard.model.UserProfile;
import com.example.UserDashboard.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserProfileController {


    @Autowired
    private UserProfileService userService;

    @GetMapping("/")
    public ResponseEntity<UserProfile> getUserById(@RequestParam int id) {
        UserProfile user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/edit")
    public ResponseEntity<UserProfile> editUserById(@RequestParam int id) {
        UserProfile user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    }


    @PostMapping("/edit")
    public ResponseEntity<String> updateUser(
            @RequestParam int id,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("dob") String dob,
            @RequestParam("profession") String profession,
            @RequestParam("institution") String institution,
            @RequestParam(name = "oldpassword", required = false) String oldPassword,
            @RequestParam(name = "newpassword", required = false) String newPassword) {

        return userService.updateUserProfile(id,username,email,dob,profession,institution,oldPassword,newPassword);
    }






    }
