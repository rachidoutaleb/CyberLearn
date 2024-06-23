import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function ShowFlies() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/cours?keyword=${keyword}`);
            console.log("Response data:", response.data); 
            if (Array.isArray(response.data)) {
                setFiles(response.data);
            } else {
                setFiles([]);
                setError("Response data is not an array");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data. Please try again later.");
        }
    };

    useEffect(() => {
        loadFiles();
    }, [keyword]);


    const deleteFile = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/cours/delete?id=${id}`);
            console.log("Response:", response.data); 
            setResponseData(response.data);
        } catch (error) {
            console.error("Error deleting file:", error);
            setError("Error deleting file. Please try again later.");
        }
    };


    return (
        <div style={{marginLeft:'70px',marginRight:'10px'}}>


<style>
        {`

        * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .title {
    color: #4169e1;
}

.fr {

    width: 350px;
    border: solid 1.5px #e32232;
}

.b{

    margin : 50px 70px  50px 20px;
}


.bt{
    background-color: #e32232;
    color: white;

}

.bt:hover {


    background-color: white;
    color: #e32232;
    border-color:#e32232;
  }

  .t{
    background-color:#e32232;
  }

  .container{
    margin-left: 70px;
  }

`}
</style>

        {responseData === "File deleted successfully" && window.location.reload()} 
    <h1 className="title text-center display-3 mt-5 fw-bold">Courses</h1>
    <hr className="mx-auto mb-5 w-25" />

    <div className="b d-flex align-items-center justify-content-between">
    <a className="btn bt" href="/admin/cours/upload">Import Courses</a>
    <form>
      <select
        className="form-select"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      >
        <option value="">All</option>
        <option value="CI1">First Year Engineering Cycle</option>
        <option value="CI2">Second Year Engineering Cycle</option>
        <option value="CI3">Third Year Engineering Cycle</option>
      </select>
    </form>
  </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr >
                        <th style={{ backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white' }}>ID</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white' , width: '300px' }}>Name</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white'  }}>Year</th>
                        <th style={{backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white'  }}>Semester</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1',borderRight: 'transparent' , width: '350px' }}>Module</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1',borderRight: 'transparent'  }}>Link</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1' }}>Created At</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr key={file.id}>
                            <td>{file.id}</td>
                            <td>{file.name}</td>
                            <td>{file.year}</td>
                            <td>{file.semester}</td>
                            <td>{file.module}</td>
                            <td>
                            <a href={`http://localhost:8080/courses/${file.filePath}`}>Link</a>
                            </td>
                            <td>{file.createdAt.substring(0, 10)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <a className="btn btn-primary btn-sm" href={`/admin/cours/edit/${file.id}`}>Edit</a>
                                <a className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Are you sure?')) deleteFile(file.id); }}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
