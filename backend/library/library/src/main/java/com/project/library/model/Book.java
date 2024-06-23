package com.project.library.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name = "titre")
    private String title;

    @Column(name = "auteur")
    private String author;

    @Column(name = "categorie")
    private String category;


    @Column(columnDefinition="TEXT",name = "dateEdition")
    private String date;

    @Column(columnDefinition = "TEXT",name = "description")
    private String description;

    @Column(name = "cover")
    private String cover;


    @Column(name = "createdAt")
    private LocalDate createdAt;


}
