package com.example.Courses.controller;


import com.example.Courses.model.Module;
import com.example.Courses.service.ModulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user/cours/")
public class ModulesController {


    @Autowired
    private ModulesService modulesService;

    @GetMapping("/modules")
    public List<Module> showModuleList(@RequestParam String year , @RequestParam String semester){
        return modulesService.showModuleList(year, semester);
    }

}
