import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import ShowFlies from './admin/ShowFlies';
import UploadFlies from './admin/UploadFile';
import EditFlies from './admin/EditFiles';

import ShowUsers from './admin/ShowUsers';
import AddUser from './admin/AddUser';
import EditUser from './admin/EditUser';

import CoursService from './user/CoursService';
import ModulesList from './user/ModulesList';
import CoursList from './user/CoursList';
import EditProfile from './UserDashboard/EditProfile';
import UserProfile from './UserDashboard/UserProfile';
import Navbar from './layout/components/Navbar';
import Sidebar from './layout/components/Sidebar';
import Main from './layout/components/Main';
import Footer from './layout/components/Footer';
import Notification from './notification/Notifications'
import './App.css';
import Todo from './TodoList/todo';

import Library from './library/Libraryuser';

import Auth from './Auth/auth'


import Articles from './community/Articles'
import Article from './community/Article';
import CreateArticle from './community/CreateArticle'


import ShowLibrary from './library/ShowLibrary';
import AddLibrary from './library/AddLibrary';
import EditLibrary from './library/EditLibrary';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const fetchNotifications = () => {
      axios.get('http://localhost:8080/users/notifications')
        .then(response => {
          const newNotifications = response.data.filter(notification => !notification.seen).length;
          setNewNotificationsCount(prevCount => prevCount + newNotifications);
        })
        .catch(error => {
          console.error(error);
        });

    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Fetch notifications every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Router>
        <Sidebar isOpen={isOpen} />
        <section id="content">
          <Navbar handleSidebarToggle={toggleSidebar} newNotificationsCount={newNotificationsCount} />
        </section>

        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route exact path="/login" element={<Auth />} />

          <Route exact path="/admin/cours" element={<ShowFlies />} />
          <Route exact path="/admin/cours/upload" element={<UploadFlies />} />
          <Route exact path="/admin/cours/edit/:id" element={<EditFlies />} />

          <Route exact path="/admin/library" element={<ShowLibrary />} />
          <Route exact path="/admin/library/add" element={<AddLibrary />} />
          <Route exact path="/admin/library/edit/:id" element={<EditLibrary />} />




          <Route exact path="/admin/users" element={<ShowUsers />} />
          <Route exact path="/admin/users/add" element={<AddUser />} />
          <Route exact path="/admin/users/edit/:id" element={<EditUser />} />
          

          <Route exact path="/user/cours" element={<CoursService />} />
          <Route exact path="/user/cours/modules/:year/:semester" element={<ModulesList />} />
          <Route exact path="/user/cours/modules/list/:year/:semester/:module" element={<CoursList />} />

          <Route path="/user/dashboard/:id" element={<UserProfile />} />
          <Route path="/user/dashboard/:id/edit" element={<EditProfile />} />

          <Route path="/user/notifications" element={<Notification setNewNotificationsCount={setNewNotificationsCount} />} />
          <Route path="/user/todo" element={< Todo/>}/>
          <Route path="/user/library" element={<Library />}/>

          <Route path="/user/community/articles" element={<Articles/>}/>
          <Route path="/user/community/articles/:slug" element={<Article />}/>
          <Route path="/user/community/create-article" element={<CreateArticle />} />





        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
