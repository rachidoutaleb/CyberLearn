import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const UserProfile = ({ match }) => {
    const [user, setUser] = useState({});
 
const {id} = useParams();

    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/?id=${id}`);
                const userData = response.data;
                
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        

        fetchUser();
    }, [id]);




      
  const userId = id;

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({});


  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/user/cours/get-favorite?userId=${userId}`
        );
        if (Array.isArray(response.data)) {
          setFiles(response.data);

          response.data.forEach(async (file) => {
            try {
              const responseFavorite = await axios.get(
                `http://localhost:8081/user/cours/is-favorite?userId=${userId}&courseId=${file.id}`
              );

              setFavoriteStatus((prev) => ({
                ...prev,
                [file.id]: responseFavorite.data, // Assuming backend returns true/false
              }));
            } catch (err) {
              console.error('Error checking favorite status:', err);
            }
          });
        } else {
          setFiles([]);
          setError('Response data is not an array');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data. Please try again later.');
      }
    };

    loadFiles();
  }, []);

  const renderFavoriteIcon = (fileId) => {
    const isFavorite = favoriteStatus[fileId]; // Expecting boolean true/false

    if (isFavorite === true) { // Check if true
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#4a70ea"
          className="bi bi-bookmark-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#4a70ea"
          className="bi bi-bookmark-heart"
          viewBox="0 0 16 16"
        >
          <path d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
        </svg>
      );
    }

  };


  const toggleFavorite = async (fileId) => {
    const isFavorite = favoriteStatus[fileId];
  
    try {
      let response;
  
      if (isFavorite) {
        // If it's already a favorite, we want to remove it
        response = await axios.post(
          `http://localhost:8081/user/cours/delete-favorite?userId=${userId}&courseId=${fileId}`
        );
      } else {
        // If it's not a favorite, we want to add it
        response = await axios.post(
          `http://localhost:8081/user/cours/add-favorite?userId=${userId}&courseId=${fileId}`
        );
      }
  
      if (response.status === 200 || response.status === 201) {
        // Successfully toggled favorite status, update the local state
        setFavoriteStatus((prev) => ({
          ...prev,
          [fileId]: !isFavorite, // Toggle the current state
        }));
      }
    } catch (err) {
      console.error('Error toggling favorite status:', err);
      // You could add error handling logic here, such as showing a notification to the user
    }
  };





    return (

<div>
        <div class="body-section">

<style>
        {`
    body {
        background-color: white;
      }
      
      .body-section {
        display: flex;
        margin: 30px 10px;
      }
      
      .sidebar {
        width: 25%;
        height: 500px;
        border-radius: 20px;
        background-color: #4a70ea;
      }
  
      .main-body {
        width: 75%;
        height: 500px;
        border-radius: 20px;
        background-color: #4a70ea;
        margin: 0 10px 0 10px;
        margin-left:70px;
      }
  
      .sd {
        background-color: white;
        border-radius: 20px;
        margin: 20px;
        height: 93%;
      }
  
      .d1 {
        border-radius: 20px;
        text-align: center;
        color: #4a70ea;
        height: 25%;
        padding-top: 5px;
      }

      .d1 hr{
        color:black;
      }
  
      .bt-container {
    display: flex;
    justify-content: center;
  }
  
  .bt {
    background-color: #4a70ea;
    color: white;
    border: #4a70ea 2px solid;
    border-radius: 5px;
    width: 100px;
    margin-top: 40px;
    font-size: 15px;
  }
  
  
      .bt:hover {
        background-color: white;
        color: #4a70ea;
        border-color: #4a70ea;
      }
  
  
      .inf{
          margin: 40px 0 0 15px;
          padding-right: 10px;
      }
  
      .inf strong {
          display: inline-block;
          width: 120px;
          margin-bottom: 5px;
      }
  
      .inf p {
          border-bottom: 1px solid;
      }   


      .title {
        color: #4a70ea;
        margin-top: 60px;
      }

      .card {
        padding-left: 60px;
        padding-top: 30px;
        border: transparent;
        width : 200px;
      }

      .line {
        border-bottom: 1px solid black;
        padding-top: 10px;
        width: 80%; 
        margin: 0 auto; 
      }

      .bt2 {
        background-color: #4a70ea;
        color: white;
        width:50%;

      }

      .bt2:hover {
        background-color: white;
        color: #4a70ea;
        border-color:#4a70ea;
      }


      .sd2 {
        background-color: white;
        border-radius: 20px;
        margin: 20px;
        height: 93%;
        overflow-y: auto; 
      }

      .custom-card {
        width : 500px;
      }


      h3 {
        text-align: center;
        color : black;
      }
      
  
        `}
      </style>



    <div class="main-body">
      <div class="sd2">
        
      <div className="container-fluid">
      <h1 className="title text-center mt-5 fw-bold">Favorite Courses</h1>
      <hr className="mx-auto mb-5 w-75" />

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : files.length > 0 ? (
        <div className="row g-0">
          {files.map((file) => (
            <div key={file.id} className="row mb-1">
              <div className="card col-sm-9 custom-card">
                <h4>{file.name}</h4>
                <hr className="w-25" />
                <p>{file.description}</p>
              </div>
              <div className="card col-sm-3 justify-content-center">
                <div className="d-flex align-items-center">
                  <a
                    className="btn bt2 mx-2"
                    href={`http://localhost:8080/courses/${file.filePath}`}
                    role="button"
                  >
                    Show
                  </a>

                  <div className="mx-2">
                    <a className="mx-2" role="button" onClick={() => toggleFavorite(file.id)}  >
                      {renderFavoriteIcon(file.id)}
                    </a>
                  </div>

                </div>
              </div>
              <div className="line"></div>
            </div>
          ))}
        </div>
      ) : (
        <p>No files found for the given criteria.</p>
      )}
    </div>


        
      </div>
    </div>
  














    <div class="sidebar">
      <div class="sd">
        <div class="d1"> 
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
          </div>
          <h3>{user.username}</h3>
          <hr className="mx-auto mb-5 w-75" />
        </div>

        <div class="inf">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Profession:</strong> {user.profession}</p>
            <p><strong>Institution:</strong> {user.institution}</p>
          </div>
          

          <div class="bt-container">
            <a class="btn bt" href={`/user/dashboard/${id}/edit`} >Edit</a>
          </div>
          
      </div>
    </div>        
  </div>


  </div>

    );
};
export default UserProfile;

