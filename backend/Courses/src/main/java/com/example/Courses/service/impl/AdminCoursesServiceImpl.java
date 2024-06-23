package com.example.Courses.service.impl;

import com.example.Courses.model.Course;
import com.example.Courses.repository.CoursesRepository;
import com.example.Courses.service.AdminCoursesService;
import com.example.Courses.service.NotificationService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Courses.event.CourseEvent;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Service
public class AdminCoursesServiceImpl implements AdminCoursesService {


    CoursesRepository coursesRepository;

    private final NotificationService notificationService;
    private final ApplicationEventPublisher eventPublisher;

    public AdminCoursesServiceImpl(CoursesRepository coursesRepository, NotificationService notificationService, ApplicationEventPublisher eventPublisher) {
        this.coursesRepository = coursesRepository;
        this.notificationService = notificationService;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public List<Course> showCoursList(String keyword){
        if (keyword !=null){
            return coursesRepository.findAll(keyword);
        }
        return coursesRepository.findAll();
    }


    @Override
    public ResponseEntity<String> createCourse(MultipartFile file,
                                               String name,
                                               String year,
                                               String semester,
                                               String module,
                                               String description) {

        try {
            String uploadFolder = "src/main/resources/static/courses/" + year + "/" + semester + "/" + module + "/";
            Path directory = Paths.get(uploadFolder);

            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            String originalFileName = file.getOriginalFilename();
            Path destinationPath = Paths.get(uploadFolder + originalFileName);

            Files.write(destinationPath, file.getBytes());

            String path = year + "/" + semester + "/" + module + "/" + originalFileName;

            Course files = new Course();
            files.setName(name);
            files.setYear(year);
            files.setSemester(semester);
            files.setModule(module);
            files.setDescription(description);
            files.setCreatedAt(new Date());
            files.setFileName(originalFileName);
            files.setFilePath(path);

            coursesRepository.save(files);

            eventPublisher.publishEvent(new CourseEvent(this, files, "CREATE"));

            return ResponseEntity.ok().body("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + e.getMessage());
        }
    }



    @Override
    public ResponseEntity<Course> showEditPage(int id) {
        Course fileEntity = coursesRepository.findById(id).orElse(null);
        return ResponseEntity.ok().body(fileEntity);
    }


    @Override
    public ResponseEntity<String> updateCourse(int id,
                                               MultipartFile file,
                                               String name,
                                               String year,
                                               String semester,
                                               String module,
                                               String description) {

        try {
            Course existingFile = coursesRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid file ID: " + id));


            if (file != null && !file.isEmpty()){
                MultipartFile f = file;
                String originalFileName = f.getOriginalFilename();

                try {

                    String uploadFolder = "src/main/resources/static/courses/" + File.separator + year + File.separator + semester + File.separator + module + File.separator;

                    // Create the directory if it doesn't exist
                    Path directory = Paths.get(uploadFolder);
                    if (!Files.exists(directory)) {
                        Files.createDirectories(directory);
                    }


                    // Set the path where the file will be saved
                    Path destinationPath = Paths.get(uploadFolder + originalFileName);
                    // Save the file to the specified location
                    Files.write(destinationPath, f.getBytes());

                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + e.getMessage());
                }

                // delete old file
                String uploadDir = "src/main/resources/static/courses/" + existingFile.getFilePath();
                Path oldImagePath = Paths.get(uploadDir);

                try {
                    Files.delete(oldImagePath);
                } catch (Exception ex) {
                    ex.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + ex.getMessage());
                }

                existingFile.setFileName(originalFileName);
                String path = year + File.separator + semester + File.separator +  module + File.separator +  originalFileName;
                existingFile.setFilePath(path);


            }


            if (!existingFile.getYear().equals(year) || !existingFile.getSemester().equals(semester) || !existingFile.getModule().equals(module)) {

                String originalFileName = existingFile.getFileName();

                try {

                    // move old file to new path
                    String uploadDir = "src/main/resources/" + existingFile.getFilePath();
                    String uploadFolder = "src/main/resources/static/courses/" + File.separator + year + File.separator + semester + File.separator + module + File.separator;

                    Path oldImagePath = Paths.get(uploadDir);
                    Path newImagePath = Paths.get(uploadFolder + originalFileName);

                    Files.move(oldImagePath, newImagePath, StandardCopyOption.REPLACE_EXISTING);

                    String path =year + File.separator + semester + File.separator + module + File.separator + existingFile.getFileName();
                    existingFile.setFilePath(path);

                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + e.getMessage());
                }

                String path = year + File.separator + semester + File.separator + module + File.separator + originalFileName;
                existingFile.setFilePath(path);
            }


            existingFile.setName(name);
            existingFile.setYear(year);
            existingFile.setSemester(semester);
            existingFile.setModule(module);
            existingFile.setDescription(description) ;

            coursesRepository.save(existingFile);


            eventPublisher.publishEvent(new CourseEvent(this, existingFile, "UPDATE"));


        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + ex.getMessage());
        }

        return ResponseEntity.ok().body("File edited successfully");

    }


    @Override
    public ResponseEntity<String> deleteCourse(int id) {

        try {

            Course files = coursesRepository.findById(id).orElse(null);

            // delete file
            Path imagePath = Paths.get("src/main/resources/static/courses/" + files.getFilePath());

            try {
                Files.delete(imagePath);
            } catch (Exception ex) {
                ex.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + ex.getMessage());            }

            //delete the product
            coursesRepository.delete(files);

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception: " + ex.getMessage());        }


        return ResponseEntity.ok().body("File deleted successfully");


    }



}
