package com.example.Courses.service;


import com.example.Courses.model.Notification;

import java.util.List;

public interface NotificationService {
    void createNotification(String title, String message);
    List<Notification> getAllNotifications();
    void deleteNotification(int id);
    void markAllAsSeen(); // Add this method
}
