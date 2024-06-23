import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';

export default function EditFiles() {
    
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        year: '',
        semester: '',
        module: '',
        description: '',
        createdAt: ''
    });

    const { id } = useParams();


    // Define the populateOptions function
    const populateOptions = (dropdown, options) => {
        dropdown.innerHTML = '<option disabled value="">Choose the Module</option>';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            dropdown.appendChild(optionElement);
        });
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/cours/edit?id=${id}`);
                const courseData = response.data;
    
                // Set formData state with fetched course data
                setFormData(prevData => ({
                    ...prevData,
                    id: courseData.id,
                    name: courseData.name,
                    year: courseData.year,
                    semester: courseData.semester,
                    module: courseData.module,
                    description: courseData.description,
                    createdAt: courseData.createdAt
                }));
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
    
        fetchCourse();
    }, [id]);

    console.log(formData);



    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Check if name and description fields are filled
        if (!formData.name || !formData.description) {
            setError("All fields are required.");
            return;
        }
    
        // Create FormData object and append form data
        const formDataToSend = new FormData();

        // Append file if it's not empty
        if (file) {
            formDataToSend.append('file', file);
         }
        formDataToSend.append('name', formData.name);
        formDataToSend.append('year', formData.year);
        formDataToSend.append('semester', formData.semester);
        formDataToSend.append('module', formData.module);
        formDataToSend.append('description', formData.description);
    
        try {
            // Send POST request with FormData
            const response = await axios.post(`http://localhost:8080/admin/cours/edit?id=${id}`, formDataToSend);
            console.log("Response:", response.data);
            setResponseData(response.data);
        } catch (error) {
            console.error("Error posting data:", error);
            setError("Error posting data. Please try again later.");
        }
    };


    
useEffect(() => {
    // Populate options for dropdowns only if formData.year is set
    if (formData.year) {
        const secondOptions = {
            CI1: [{value: "S1", text: "Semester 1"}, {value: "S2", text: "Semester 2"}],
            CI2: [{value: "S3", text: "Semester 3"}, {value: "S4", text: "Semester 4"}],
            CI3: [{value: "S5", text: "Semester 5"}]
        };

        const thirdOptions = {
            S1: [{value: "ÉLECTRONIQUE NUMÉRIQUE", text: "ÉLECTRONIQUE NUMÉRIQUE"}, {value: "TRAITEMENT DE SIGNAL", text: "TRAITEMENT DE SIGNAL"}, {value: "TYPES D'ATTAQUES & ETHICAL HACKING", text: "TYPES D'ATTAQUES & ETHICAL HACKING"}, {value: "ECONOMIE DE L'ENTREPRISE", text: "ECONOMIE DE L'ENTREPRISE"}, {value: "ANALYSE DE DONNÉES", text: "ANALYSE DE DONNÉES"}, {value: "PROGRAMMATION ORIENTÉE OBJET& C++", text: "PROGRAMMATION ORIENTÉE OBJET& C++"}, {value: "INTRODUCTION AUX RÉSEAUX", text: "INTRODUCTION AUX RÉSEAUX"}],
            S2: [{value: "SYSTÈMES D’EXPLOITATION & LINUX AVANCÉ", text: "SYSTÈMES D’EXPLOITATION & LINUX AVANCÉ"}, {value: "INGÉNIERIE WEB & SYSTÈMES D’INFORMATION", text: "INGÉNIERIE WEB & SYSTÈMES D’INFORMATION"}, {value: "SYSTÈMES DE TRANSMISSIONS NUMÉRIQUE", text: "SYSTÈMES DE TRANSMISSIONS NUMÉRIQUE"}, {value: "MICROCONTROLLEURS", text: "MICROCONTROLLEURS"}, {value: "TECHNIQUES DE GESTION DE L’ENTREPRISE", text: "TECHNIQUES DE GESTION DE L’ENTREPRISE"}, {value: "INGÉNIERIE DE LA SÉCURITÉ ET PKI", text: "INGÉNIERIE DE LA SÉCURITÉ ET PKI"}, {value: "PYTHON ET PROJET DE RÉALISATION ALGORITHMIQUE", text: "PYTHON ET PROJET DE RÉALISATION ALGORITHMIQUE"}],        
            S3: [{value: "PROTOCOLES DE SÉCURITÉ & SÉCURITÉ DES RÉSEAUX ET DES COMMUNICATIONS", text: "PROTOCOLES DE SÉCURITÉ & SÉCURITÉ DES RÉSEAUX ET DES COMMUNICATIONS"}, {value: "ANTENNES ET SYSTÈMES RADIOFRÉQUENCES", text: "ANTENNES ET SYSTÈMES RADIOFRÉQUENCES"}, {value: "CONCEPTION MATÉRIELLE DES SYSTÈMES DE TÉLÉCOMMUNICATION/DSP", text: "CONCEPTION MATÉRIELLE DES SYSTÈMES DE TÉLÉCOMMUNICATION/DSP"}, {value: "INTELLIGENCE ARTIFICIELLE, BIG DATA", text: "INTELLIGENCE ARTIFICIELLE, BIG DATA"}, {value: "ECONOMIE DE L'ENTREPRISE", text: "ECONOMIE DE L'ENTREPRISE"}, {value: "ALGORITHMIQUE RÉSEAU ET IPV6", text: "ALGORITHMIQUE RÉSEAU ET IPV6"}, {value: "DURCISSEMENT SYSTÈME &SÉCURITÉ DES DONNÉES ET DU DÉVELOPPEMENT", text: "DURCISSEMENT SYSTÈME &SÉCURITÉ DES DONNÉES ET DU DÉVELOPPEMENT"}],
            S4: [{value: "JAVA EDITION ENTREPRISE", text: "JAVA EDITION ENTREPRISE"}, {value: "SYSTÈMES RADIO MOBILE", text: "SYSTÈMES RADIO MOBILE"}, {value: "SÉCURITÉ DES APPLICATIONS MULTIMÉDIA ET EMBARQUÉE", text: "SÉCURITÉ DES APPLICATIONS MULTIMÉDIA ET EMBARQUÉE"},{value: "FORENSICS ET GESTION DES CRISES CYBERNÉTIQUES", text: "FORENSICS ET GESTION DES CRISES CYBERNÉTIQUES"}, {value: "VIRTUALISATION CLOUD COMPUTING, SDN ET SÉCURITÉ", text: "VIRTUALISATION CLOUD COMPUTING, SDN ET SÉCURITÉ"}, {value: "GESTION ET MANAGEMENT DE PROJETS", text: "GESTION ET MANAGEMENT DE PROJETS"}],
            S5: [{value: "WSN, IOT ET APPLICATIONS (TÉLÉMÉDECINE, TÉLÉSURVEILLANCE, TRANSPORT, SMART CITIES...)", text: "WSN, IOT ET APPLICATIONS (TÉLÉMÉDECINE, TÉLÉSURVEILLANCE, TRANSPORT, SMART CITIES...)"}, {value: "RÉSEAUX SANS FIL ET COMMUNICATIONS AÉROSPATIALES", text: "RÉSEAUX SANS FIL ET COMMUNICATIONS AÉROSPATIALES"}, {value: "ARCHITECTURES DE SÉCURITÉ ET PCA / PRA", text: "ARCHITECTURES DE SÉCURITÉ ET PCA / PRA"}, {value: "ARCHITECTURES ET DÉVELOPPEMENTS À BASE DE SERVICES ET CHAINE DEVSECOPS", text: "ARCHITECTURES ET DÉVELOPPEMENTS À BASE DE SERVICES ET CHAINE DEVSECOPS"}, {value: "TEMPS RÉEL ET SYSTÈMES D'EXPLOITATION TEMPS RÉEL (RTOS)", text: "TEMPS RÉEL ET SYSTÈMES D'EXPLOITATION TEMPS RÉEL (RTOS)"}, {value: "GOUVERNANCE, NORMES, MANAGEMENT & AUDIT DE SÉCURITÉ", text: "GOUVERNANCE, NORMES, MANAGEMENT & AUDIT DE SÉCURITÉ"}, {value: "MANAGEMENT ET ENTREPRENARIAT 2", text: "MANAGEMENT ET ENTREPRENARIAT 2"}]
        };

        const firstDropdown = document.getElementById('firstDropdown');
        const secondDropdown = document.getElementById('secondDropdown');
        const thirdDropdown = document.getElementById('thirdDropdown');

        // Populate first dropdown with options and select the year from formData
        firstDropdown.value = formData.year;

        // Populate second dropdown with options based on the selected year
        populateOptions(secondDropdown, secondOptions[formData.year]);

        // Populate third dropdown with options based on the selected semester
        populateOptions(thirdDropdown, thirdOptions[formData.semester]);
    }
}, [formData.year, formData.semester]); 
    
    return (
        <div className="container">
            {responseData === "File edited successfully" && <Navigate to="/admin/cours" replace />}
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4 m-4">
                    <h2 className="text-center mb-5" style={{ color: '#4a70ea' }}>Edit Course</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                       

                    <div className="row mb-3">
    <label className="col-sm-4 col-form-label">ID</label>
    <div className="col-sm-8">
        <input readOnly className="form-control-plaintext" value={formData.id} />
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Name</label>
    <div className="col-sm-8">
        <input className="form-control" name="name" value={formData.name} onChange={(e) => setFormData(prevData => ({ ...prevData, name: e.target.value }))} />
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Year</label>
    <div className="col-sm-8">
        <select id="firstDropdown" className="form-select" name="year" value={formData.year} onChange={(e) => setFormData(prevData => ({ ...prevData, year: e.target.value }))}>
            <option value="CI1">CI1</option>
            <option value="CI2">CI2</option>
            <option value="CI3">CI3</option>
        </select>
    </div>
</div>

<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Semester</label>
    <div className="col-sm-8">
        <select id="secondDropdown" className="form-select" name="semester" value={formData.semester} onChange={(e) => setFormData(prevData => ({ ...prevData, semester: e.target.value }))}>
        </select>
    </div>
</div>


<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Module</label>
    <div className="col-sm-8">
        <select id="thirdDropdown" className="form-select" name="module" value={formData.module} onChange={(e) => setFormData(prevData => ({ ...prevData, module: e.target.value }))}>
        </select>
    </div>
</div>


<div className="row mb-3">
    <label className="col-sm-4 col-form-label">Description</label>
    <div className="col-sm-8">
        <textarea className="form-control" name="description" value={formData.description} onChange={(e) => setFormData(prevData => ({ ...prevData, description: e.target.value }))}></textarea>
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">File</label>
    <div className="col-sm-8">
    <input className="form-control" name="file"  type="file"  onChange={(e) => setFile(e.target.files[0])} />
    </div>
</div>
<div className="row mb-3">
    <label className="col-sm-4 col-form-label">createdAt</label>
    <div className="col-sm-8">
        <input readOnly className="form-control-plaintext" name="createdAt" value={formData.createdAt} />
    </div>
</div>
<div className="row">
    <div className="offset-sm-4 col-sm-4 d-grid">
        <button type="submit" className="btn btn-primary">Submit</button>
    </div>
    <div className="col-sm-4 d-grid">
    <a className="btn btn-outline-primary" href="/admin/cours" role="button">Cancel</a>
    </div>
</div>


                    </form>
                </div>
            </div>
        </div>
    );
}

