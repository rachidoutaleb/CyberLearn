import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CoursList() {
  const { year, semester, module } = useParams();
  const userId = "1";

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({});


  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/cours/list?year=${year}&semester=${semester}&module=${module}`
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
  }, [year, semester, module]);

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
    <div className="container-fluid">
      <h1 className="title text-center mt-5 fw-bold">{module}</h1>
      <hr className="mx-auto mb-5 w-75" />

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .title {
            color: #4a70ea;
          }

          .card {
            padding-left: 60px;
            padding-top: 30px;
            border: transparent;
            
          }


          .bt {
            background-color: white;
            color: #4a70ea;
            width:50%;
            border-color:#4a70ea;

          }

          .bt:hover {
            background-color: #4a70ea;
            color: white;
          }

          .line {
            border-bottom: 1px solid black;
            padding-top: 10px;
            width: 80%; 
            margin: 0 auto; 
          }

          .custom-card {
            margin-left: 90px;
            width : 800px;
          }
          

        `}
      </style>

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : files.length > 0 ? (
        <div className="row g-0">
          {files.map((file) => (
            <div key={file.id} className="row mb-1">
               <div className="card col-sm-9 custom-card">
                <h3>{file.name}</h3>
                <hr className="w-25" />
                <p>{file.description}</p>
              </div>
              <div className="card col-sm-3 justify-content-center">
                <div className="d-flex align-items-center">
                  <a
                    className="btn bt mx-2"
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
  );
}
