package com.example.Courses.service;

import com.example.Courses.model.Module;

import java.util.List;

public interface ModulesService {

    List<Module> showModuleList(String year, String semester);
}
