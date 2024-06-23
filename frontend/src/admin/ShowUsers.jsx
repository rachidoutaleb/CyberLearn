import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function ShowUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8089/admin/ShowUsers`);
            console.log("Response data:", response.data); 
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                setUsers([]);
                setError("Response data is not an array");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data. Please try again later.");
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);






    const deleteUser = async (id) => {
        try {
            await axios.get(`http://localhost:8089/admin/deleteUsers?id=${id}`);
            setResponseData("User deleted successfully");
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

`}
</style>

    {responseData === "User deleted successfully" && window.location.reload()} 
    <h1 className="title text-center display-3 mt-5 fw-bold">Manage User</h1>
    <hr className="mx-auto mb-5 w-25" />

    <div className="b d-flex align-items-center justify-content-between">
    <a className="btn bt" href="/admin/users/add">Add User</a>
  </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr >
                        <th style={{ backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white' }}>ID</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white' }}>Name</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white' , width: '300px' }}>Email</th>
                        <th style={{backgroundColor: 'white', color: '#4169e1', border: '1px solid #4169e1', borderRight: 'white' , width: '200px'  }}>Date of Birth</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1',borderRight: 'transparent' }}>Institution</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1',borderRight: 'transparent'  }}>professional</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1' }}>Role</th>
                        <th style={{ backgroundColor: 'white', color: '#4169e1',border: '1px solid #4169e1' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.institution}</td>
                            <td>{user.professional}</td>
                            <td>{user.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <a className="btn btn-primary btn-sm" href={`/admin/users/edit/${user.id}`}>Edit</a>
                                <a className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Are you sure?')) deleteUser(user.id); }}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
