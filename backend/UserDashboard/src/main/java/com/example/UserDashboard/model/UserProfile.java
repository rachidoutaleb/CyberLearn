package com.example.UserDashboard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "users")
public class UserProfile {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false,name="username", length = 45)
    private String username;

    @Column(nullable = false, name="email", unique = true, length = 45)
    private String email;
    @Column(length = 15,name="password", nullable = false)
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 45)
    private Role role;

    private Boolean locked = false;
    private Boolean enabled = false;


    @Temporal(TemporalType.DATE)
    @Column(name="dob")
    private String dob;

    @Column(name="profession", length = 100)
    private String profession;

    @Column(name="institution",length = 100)
    private String institution;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_modified")
    private Date lastModified;


    @ManyToMany
    @JoinTable(
            name = "user_favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonIgnore
    private Set<FavoriteCourse> favoriteCourses = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public Set<FavoriteCourse> getFavoriteCourses() {
        return favoriteCourses;
    }

    public void setFavoriteCourses(Set<FavoriteCourse> favoriteCourses) {
        this.favoriteCourses = favoriteCourses;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public enum Role {
        USER, ADMIN
    }
}