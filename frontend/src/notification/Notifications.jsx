import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './../App.css';

const Notification = ({ setNewNotificationsCount }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/notifications');

    websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      // Update new notifications count or trigger a refresh
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      websocket.close();
    };
  }, [setNewNotificationsCount]);

  useEffect(() => {
    axios.get('http://localhost:8080/users/notifications')
      .then(response => {
        const sortedNotifications = response.data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setNotifications(sortedNotifications);
        setNewNotificationsCount(0); // Reset new notifications count when user views them

        // Mark all notifications as seen
        axios.post('http://localhost:8080/users/notifications/markAsSeen');
      })
      .catch(error => {
        console.error(error);
      });
  }, [setNewNotificationsCount]);

  const timeAgo = (time) => {
    return moment(time).fromNow();
  };

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={notification.id} className="notification">
          <div className="notification-header">
            <h4>{notification.title}</h4>
            <span className="notification-time">{timeAgo(notification.time)}</span>
          </div>
          <p>{notification.message}</p>
          {index < notifications.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default Notification;
