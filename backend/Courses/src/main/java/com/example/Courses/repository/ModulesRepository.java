package com.example.Courses.repository;

import com.example.Courses.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModulesRepository extends JpaRepository<Module, Integer> {

    List<Module> findByYearAndSemester(String year, String semester);

}