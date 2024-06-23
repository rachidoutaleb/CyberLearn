import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function AddUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        institution: '',
        professional: '',
        role: ''
    });

    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.dateOfBirth || !formData.institution || !formData.professional || !formData.role) {
            setError("All fields are required.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('dateOfBirth', formData.dateOfBirth);
        formDataToSend.append('institution', formData.institution);
        formDataToSend.append('professional', formData.professional);
        formDataToSend.append('role', formData.role);

        try {
            const response = await axios.post(`http://localhost:8089/admin/saveUser`, formDataToSend);
            console.log("Response:", response.data);
            setResponseData(response.data);
        } catch (error) {
            console.error("Error posting data:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            }
            setError("Error posting data. Please try again later.");
        }
    };

    return (
        <div className="container">
            {responseData === "User saved successfully" && <Navigate to="/admin/users" replace />}
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4 m-4">
                    <h2 className="text-center mb-5" style={{ color: '#4a70ea' }}>New User</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.name} onChange={(e) => setFormData(prevData => ({ ...prevData, name: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.email} onChange={(e) => setFormData(prevData => ({ ...prevData, email: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Password</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.password} onChange={(e) => setFormData(prevData => ({ ...prevData, password: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Date Of Birth</label>
                            <div className="col-sm-8">
                                <input type="date" className="form-control" value={formData.dateOfBirth} onChange={(e) => setFormData(prevData => ({ ...prevData, dateOfBirth: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Institution</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.institution} onChange={(e) => setFormData(prevData => ({ ...prevData, institution: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Professional</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.professional} onChange={(e) => setFormData(prevData => ({ ...prevData, professional: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Role</label>
                            <div className="col-sm-8">
                                <select className="form-select" value={formData.role} onChange={(e) => setFormData(prevData => ({ ...prevData, role: e.target.value }))}>
                                    <option disabled value=''>Choose the Role</option>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <a className="btn btn-outline-primary" href="/admin/users" role="button">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
