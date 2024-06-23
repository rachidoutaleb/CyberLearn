package com.cyber.webtest1.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")
public class UserController {
    @Autowired
    private UserService userService;

    private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    @GetMapping({"", "/"})
    public String showUserList(Model model) {
        List<User> listUsers = userService.listAll();
        model.addAttribute("listUsers", listUsers);
        return "user_list";
    }

    @GetMapping("/new")
    public String showNewForm(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("pageTitle", "Add New User");
        return "user_form";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable("id") Long id, Model model, RedirectAttributes ra) {
        try {
            User user = userService.get(id);
            model.addAttribute("user", user);
            model.addAttribute("pageTitle", "Edit User (ID: " + id + ")");
            return "user_form";
        } catch (UserNotFoundException e) {
            ra.addFlashAttribute("message", e.getMessage());
            return "redirect:/users";
        }
    }

    @GetMapping("/ShowEdit")
    public ResponseEntity<User> showEditPage(@RequestParam long id) {
        try {
            User user = userService.get(id);
            return ResponseEntity.ok().body(user);
        } catch (UserNotFoundException e) {
            LOGGER.log(Level.SEVERE, "User not found: {0}", e.getMessage());
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/saveUser")
    public ResponseEntity<String> saveUser(@RequestParam(value = "id", required = false) Long id,
                                           @RequestParam("name") String name,
                                           @RequestParam("email") String email,
                                           @RequestParam("password") String password,
                                           @RequestParam("dateOfBirth") Date dateOfBirth,
                                           @RequestParam("institution") String institution,
                                           @RequestParam("professional") String professional,
                                           @RequestParam("role") User.Role role) {
        try {
            User user = new User();
            user.setId(id);
            user.setName(name);
            user.setEmail(email);
            user.setPassword(password);
            user.setDateOfBirth(dateOfBirth);
            user.setInstitution(institution);
            user.setProfessional(professional);
            user.setRole(role);
            userService.save(user);
            return ResponseEntity.ok().body("User saved successfully");
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error saving user: {0}", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PostMapping("/save")
    public String saveUser(User user, RedirectAttributes ra) {
        userService.save(user);
        ra.addFlashAttribute("message", "The user has been saved successfully.");
        return "redirect:/users";
    }

    @GetMapping("/deleteUsers")
    public String deleteUser(@RequestParam Long id, RedirectAttributes ra) {
        try {
            userService.delete(id);
            ra.addFlashAttribute("message", "The user has been deleted successfully.");
        } catch (UserNotFoundException e) {
            ra.addFlashAttribute("message", e.getMessage());
        }
        return "redirect:/users";
    }

    @GetMapping("/ShowUsers")
    @ResponseBody
    public List<User> listUsers() {
        return userService.listAll();
    }
}
