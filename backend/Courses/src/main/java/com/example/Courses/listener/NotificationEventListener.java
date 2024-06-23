package com.example.Courses.listener;


import com.example.Courses.event.CourseEvent;
import com.example.Courses.model.Course;
import com.example.Courses.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventListener {

    @Autowired
    private NotificationService notificationService;


    @EventListener
    public void handleCourseEvent(CourseEvent event) {
        Course course = event.getCourse();
        String action = event.getAction();
        switch (action) {
            case "CREATE":
                notificationService.createNotification("New Course Added", "Course " + course.getName() + " has been added.");
                break;
            case "UPDATE":
                notificationService.createNotification("Course Updated", "Course " + course.getName() + " has been updated.");
                break;
            case "DELETE":
                notificationService.createNotification("Course Deleted", "Course " + course.getName() + " has been deleted.");
                break;
            default:
                throw new IllegalArgumentException("Unknown action: " + action);
        }
    }
}
