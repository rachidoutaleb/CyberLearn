package com.example.Courses.event;

import com.example.Courses.model.Course;
import org.springframework.context.ApplicationEvent;

public class CourseEvent extends ApplicationEvent {
    private final Course course;
    private final String action; // CREATE, UPDATE, DELETE

    public CourseEvent(Object source, Course course, String action) {
        super(source);
        this.course = course;
        this.action = action;
    }

    public Course getCourse() {
        return course;
    }

    public String getAction() {
        return action;
    }
}
