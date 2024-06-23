package com.example.UserDashboard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cours")
public class FavoriteCourse {

    @Id
    @GeneratedValue(strategy= GenerationType. IDENTITY)
    private int id;
    private String name;
    private String year;
    private String semester;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String module;
    private Date createdAt;
    private String FileName;
    private String FilePath;
    @ManyToMany(mappedBy = "favoriteCourses")
    @JsonIgnore
    private Set<UserProfile> usersWhoFavorited = new HashSet<>();

    public FavoriteCourse(int id, String name, String year, String semester, String description, String module, Date createdAt, String fileName, String filePath, Set<UserProfile> usersWhoFavorited) {
    }

    public FavoriteCourse() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getFileName() {
        return FileName;
    }

    public void setFileName(String fileName) {
        FileName = fileName;
    }

    public String getFilePath() {
        return FilePath;
    }

    public void setFilePath(String filePath) {
        FilePath = filePath;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }


    public Set<UserProfile> getUsersWhoFavorited() {
        return usersWhoFavorited;
    }

    public void setUsersWhoFavorited(Set<UserProfile> usersWhoFavorited) {
        this.usersWhoFavorited = usersWhoFavorited;
    }
}
