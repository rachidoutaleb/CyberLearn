import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';

export default function EditLibrary() {
    const [formData, setFormData] = useState({
        id: '',
        titre: '',
        auteur: '',
        edition: '',
        description: '',
        categorie: ''
    });
    const [coverFile, setCoverFile] = useState(null);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchLibraryItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8091/library/ShowEdit?id=${id}`);
                const libraryItem = response.data;

                setFormData({
                    id: libraryItem.id,
                    titre: libraryItem.titre,
                    auteur: libraryItem.auteur,
                    edition: libraryItem.edition,
                    description: libraryItem.description,
                    categorie: libraryItem.categorie
                });
            } catch (error) {
                console.error('Error fetching library item:', error);
                setError('Error fetching library item. Please try again later.');
            }
        };

        fetchLibraryItem();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.titre || !formData.auteur || !formData.edition || !formData.description || !formData.categorie) {
            setError('All fields are required.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('id', formData.id);
        formDataToSend.append('titre', formData.titre);
        formDataToSend.append('auteur', formData.auteur);
        formDataToSend.append('edition', formData.edition);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('categorie', formData.categorie);

        if (coverFile) {
            formDataToSend.append('coverFile', coverFile);
        }

        try {
            const response = await axios.post(`http://localhost:8091/library/saveLibraryItem`, formDataToSend);
            console.log('Response:', response.data);
            setResponseData(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            }
            setError('Error posting data. Please try again later.');
        }
    };

    return (
        <div className="container">
            {responseData === 'Library item saved successfully' && <Navigate to="/admin/library" replace />}
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4 m-4">
                    <h2 className="text-center mb-5" style={{ color: '#4a70ea' }}>Edit Library Item</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Title</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Author</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.auteur} onChange={(e) => setFormData({ ...formData, auteur: e.target.value })} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Edition Date</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={formData.edition} onChange={(e) => setFormData({ ...formData, edition: e.target.value })} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Cover</label>
                            <div className="col-sm-8">
                                <input type="file" className="form-control" onChange={(e) => setCoverFile(e.target.files[0])} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-control" value={formData.categorie} onChange={(e) => setFormData({ ...formData, categorie: e.target.value })} >
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
