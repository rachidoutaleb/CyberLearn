import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function AddLibrary() {
    const [formData, setFormData] = useState({
        titre: '',
        auteur: '',
        edition: '',
        description: '',
        coverFile: null,
        categorie: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.titre || !formData.auteur || !formData.edition || !formData.description || !formData.coverFile || !formData.categorie) {
            setError("All fields are required.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('titre', formData.titre);
        formDataToSend.append('auteur', formData.auteur);
        formDataToSend.append('edition', formData.edition);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('coverFile', formData.coverFile);
        formDataToSend.append('categorie', formData.categorie);

        try {
            const response = await axios.post(`http://localhost:8091/library/addBook`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response:", response.data);
            setSuccess(true); // Set success flag
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            coverFile: file
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('');
        }
    };

    return (
        <div className="container">
            {success && <Navigate to="/admin/library" replace />}
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4 m-4">
                    <h2 className="text-center mb-5" style={{ color: '#4a70ea' }}>New Book</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Title</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.titre} onChange={(e) => setFormData(prevData => ({ ...prevData, titre: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Author</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.auteur} onChange={(e) => setFormData(prevData => ({ ...prevData, auteur: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Edition</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.edition} onChange={(e) => setFormData(prevData => ({ ...prevData, edition: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" value={formData.description} onChange={(e) => setFormData(prevData => ({ ...prevData, description: e.target.value }))} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Cover</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="file" onChange={handleFileChange} />
                                {previewUrl && <img src={previewUrl} alt="Cover Preview" style={{ width: '100px', height: '150px', marginTop: '10px' }} />}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-control" value={formData.categorie} onChange={(e) => setFormData(prevData => ({ ...prevData, categorie: e.target.value }))} >
                                    <option disabled value=''>Choose the Category</option>
                                    <option value='Cybersecurity'>Cybersecurity</option>
                                    <option value='Embedded Systems'>Embedded Systems</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <a className="btn btn-outline-primary" href="/admin/library" role="button">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
