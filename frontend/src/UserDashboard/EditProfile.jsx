import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';



const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setFormData] = useState({
        id:'',
        username: '',
        email: '',
        dob: '',
        profession: '',
        institution: '',
        oldPassword: '',
        newPassword: ''
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/edit?id=${id}`);
                const userData = response.data;
    
                setFormData({
                    id: id,
                    username: userData.username,
                    email: userData.email,
                    dob: userData.dob,
                    profession: userData.profession,
                    institution: userData.institution,
                    oldPassword: '',
                    newPassword: ''
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
    
        fetchUser();
    }, [id]);
    
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!user.username || !user.email || !user.dob || !user.profession || !user.institution) {
            setError("All fields are required.");
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append('id', user.id);
        formDataToSend.append('username', user.username);
        formDataToSend.append('email', user.email);
        formDataToSend.append('dob', user.dob);
        formDataToSend.append('profession', user.profession);
        formDataToSend.append('institution', user.institution);
        formDataToSend.append('oldpassword', user.oldPassword);
        formDataToSend.append('newpassword', user.newPassword);
    
        console.log("Form data to send:", [...formDataToSend.entries()]); // Check what's inside
    
        try {
            const response = await axios.post(`http://localhost:8081/users/edit?id=${id}`, formDataToSend);
            console.log(response.data);
            if (response.data === "User edited successfully") {
             setSuccessMessage("Profile updated successfully");
             navigate(`/user/dashboard/${id}`);
            } if (response.data === "Old password does not match") {
                setError("Old password does not match");
            } if (response.data === "Both old and new passwords should be provided") {
                setError("Both old and new passwords should be provided");
            } if (response.data === "Password must contain at least one uppercase letter, one number, and have a minimum length of 8 characters."){
                setError("Password must contain at least one uppercase letter, one number, and have a minimum length of 8 characters.")
            }
        } catch (error) {
            console.error("Error posting data:", error);
            setError("Error posting data. Please try again later.");
        }
    };
    
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto rounded border p-4 m-4">
                        <h2 className="text-center mb-5">Edit Profile</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
    <label className="col-sm-4 col-form-label">Username</label>
    <div className="col-sm-8">
        <input className="form-control" name="username" value={user.username} onChange={(e) => setFormData(prevData => ({ ...prevData, username: e.target.value }))} />
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Email</label>
    <div className="col-sm-8">
        <input className="form-control" name="email" value={user.email} onChange={(e) => setFormData(prevData => ({ ...prevData, email: e.target.value }))} />
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Date of Birth</label>
    <div className="col-sm-8">
        <input className="form-control" name="dob" value={user.dob} onChange={(e) => setFormData(prevData => ({ ...prevData, dob: e.target.value }))} />
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Profession</label>
    <div className="col-sm-8">
        <select className="form-control" name="profession" value={user.profession} onChange={(e) => setFormData(prevData => ({ ...prevData, profession: e.target.value }))}>
            <option value="">Select a profession</option>
            <option value="Engineer">Engineer</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Lawyer">other</option>
           
        </select>
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Institution</label>
    <div className="col-sm-8">
        <select className="form-control" name="institution" value={user.institution} onChange={(e) => setFormData(prevData => ({ ...prevData, institution: e.target.value }))} >
        <option value="">Select an Institution</option>
            <option value="University">University</option>
            <option value="Company">Company</option>
            <option value="School">School</option>
            <option value="Other">other</option>           
        </select>
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Old Password</label>
    <div className="col-sm-8">
    <input className="form-control" type="password" name="oldPassword" value={user.oldPassword} onChange={(e) => {
            setFormData(prevData => ({ ...prevData, oldPassword: e.target.value }));
        }} />

    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">New Password</label>
    <div className="col-sm-8">
        <input className="form-control" type="password" name="newPassword" value={user.newPassword} onChange={(e) => setFormData(prevData => ({ ...prevData, newPassword: e.target.value }))} />
    </div>
</div>

                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#e32232', border:'#e32232' }}>Update</button>
                        </form>
                    </div>
                </div>
            </div>




        );
    };
    
    export default EditProfile;
