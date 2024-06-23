import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function ModulesList() {
  const { year, semester } = useParams();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Year:", year);
    console.log("Semester:", semester);
    loadFiles();
  }, [year, semester]);

  const loadFiles = async () => {
    try {
      const url = `http://localhost:8080/user/cours/modules?year=${year}&semester=${semester}`;
      console.log("Requesting URL:", url);
      const response = await axios.get(url);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      if (Array.isArray(response.data)) {
        setFiles(response.data);
      } else {
        setFiles([]);
        setError("Unexpected data format. Please contact support.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const fileChunks = chunkArray(files, 3);

  return (
    <div className="container-fluid">
      <style>
        {`
          .row-margin { 
            margin-bottom: 20px; /* Margin between rows */ 
          }
          .card {
            height: 330px;
            position: relative;
            z-index: 1;
            overflow: hidden;
            transition: 0.5s;
            margin-left: 60px;
            width: 330px;
          }
          .card:hover {
            color: white;
          }
          .title {
            color: #4a70ea;
          }
          .card::before {
            content: "";
            position: absolute;
            left: 0%;
            bottom: 100%;
            background: #4a70ea;
            width: 100%;
            height: 100%;
            transition: 0.5s;
            z-index: -1;
          }
          .card:hover::before {
            bottom: 0;
          }
          .card-body h5 {
            color: #4a70ea;
            padding : 20px;
          }
          .card:hover .card-body h5 {
            color: white;
          }
          .bt {
            background-color: #4a70ea;
            color: white;
            transition: 0.5s;
          }
          .card:hover .bt {
            background-color: white;
            color: #4a70ea;
          }
          .bt:hover {
            background-color: white;
            color: #4a70ea;
          }
          p {
            text-align: center;
          }
          .card:hover .p {
            color:white !important;
          }
        `}
      </style>

      <h1 className="text-center mt-5 display-3 fw-bold">
        Our <span className="title"> Modules </span>
      </h1>
      <hr className="mx-auto mb-5 w-25" />

      {error && <div className="alert alert-danger">{error}</div>}

      {fileChunks.map((chunk, chunkIndex) => (
        <div className={'row row-margin'} key={chunkIndex}>
          {chunk.map((file) => (
            <div className="col-12 col-sm-6 col-md-4" key={file.id}>
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>{file.name}</h5>
                  <hr className="mx-auto w-75" />
                  <p>{file.description}</p>
                  <div className="d-flex justify-content-center">
                    <a
                      className="bt btn mx-2"
                      href={`/user/cours/modules/list/${file.year}/${file.semester}/${file.name}`}
                      role="button"
                    >
                      Show
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
