package com.example.Courses.service.impl;


import com.example.Courses.model.Module;
import com.example.Courses.repository.ModulesRepository;
import com.example.Courses.service.ModulesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModulesServiceImpl implements ModulesService {

    ModulesRepository modulesRepository;

    public ModulesServiceImpl(ModulesRepository modulesRepository) {
        this.modulesRepository = modulesRepository;
    }

    @Override
    public List<Module> showModuleList(String year , String semester){
        return modulesRepository.findByYearAndSemester(year, semester);
    }

}

