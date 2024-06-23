import React, { useState, useEffect } from 'react';import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function UploadFile() {

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [module, setModule] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null); 


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!file || !name || !year || !semester || !module || !description) {
            setError("All fields are required.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('year', year);
        formData.append('semester', semester);
        formData.append('module', module);
        formData.append('description', description);

    
        try {
            const response = await axios.post("http://localhost:8080/admin/cours/upload", formData);
            console.log("Response:", response.data); 
            setResponseData(response.data); 
        } catch (error) {
            console.error("Error posting data:", error);
            setError("Error posting data. Please try again later.");
        }
    };



    const [firstSelection, setFirstSelection] = useState(''); 
    const [secondSelection, setSecondSelection] = useState('');
    const [thirdSelection, setThirdSelection] = useState('');
    const [secondOptions, setSecondOptions] = useState([]);
    const [thirdOptions, setThirdOptions] = useState([]); 



    const secondOptionsMap = {
        CI1: [{value: "S1", text: "Semester 1"}, {value: "S2", text: "Semester 2"}],
        CI2: [{value: "S3", text: "Semester 3"}, {value: "S4", text: "Semester 4"}],
        CI3: [{value: "S5", text: "Semester 5"}]
    };



    const thirdOptionsMap = {
        S1: [{value: "DIGITAL ELECTRONICS", text: "DIGITAL ELECTRONICS"}, {value: "SIGNAL PROCESSING", text: "SIGNAL PROCESSING"}, {value: "TYPES OF ATTACKS & ETHICAL HACKING", text: "TYPES OF ATTACKS & ETHICAL HACKING"}, {value: "BUSINESS ECONOMICS", text: "BUSINESS ECONOMICS"}, {value: "DATA ANALYSIS", text: "DATA ANALYSIS"}, {value: "OBJECT-ORIENTED PROGRAMMING & C++", text: "OBJECT-ORIENTED PROGRAMMING & C++"}, {value: "INTRODUCTION TO NETWORKS", text: "INTRODUCTION TO NETWORKS"}],
        S2: [{value: "ADVANCED OPERATING SYSTEMS & LINUX", text: "ADVANCED OPERATING SYSTEMS & LINUX"}, {value: "WEB ENGINEERING & INFORMATION SYSTEMS", text: "WEB ENGINEERING & INFORMATION SYSTEMS"}, {value: "DIGITAL TRANSMISSION SYSTEMS", text: "DIGITAL TRANSMISSION SYSTEMS"}, {value: "MICROCONTROLLERS", text: "MICROCONTROLLERS"}, {value: "ENTERPRISE MANAGEMENT TECHNIQUES", text: "ENTERPRISE MANAGEMENT TECHNIQUES"}, {value: "SECURITY ENGINEERING AND PKI", text: "SECURITY ENGINEERING AND PKI"}, {value: "PYTHON AND ALGORITHMIC PROJECT IMPLEMENTATION", text: "PYTHON AND ALGORITHMIC PROJECT IMPLEMENTATION"}],        
        S3: [{value: "SECURITY PROTOCOLS & NETWORK AND COMMUNICATIONS SECURITY", text: "SECURITY PROTOCOLS & NETWORK AND COMMUNICATIONS SECURITY"}, {value: "ANTENNAS AND RADIOFREQUENCY SYSTEMS", text: "ANTENNAS AND RADIOFREQUENCY SYSTEMS"}, {value: "HARDWARE DESIGN OF TELECOMMUNICATION SYSTEMS/DSP", text: "HARDWARE DESIGN OF TELECOMMUNICATION SYSTEMS/DSP"}, {value: "ARTIFICIAL INTELLIGENCE, BIG DATA", text: "ARTIFICIAL INTELLIGENCE, BIG DATA"}, {value: "BUSINESS ECONOMICS", text: "BUSINESS ECONOMICS"}, {value: "NETWORK ALGORITHMS AND IPV6", text: "NETWORK ALGORITHMS AND IPV6"}, {value: "SYSTEM HARDENING & DATA AND DEVELOPMENT SECURITY", text: "SYSTEM HARDENING & DATA AND DEVELOPMENT SECURITY"}],
        S4: [{value: "JAVA ENTERPRISE EDITION", text: "JAVA ENTERPRISE EDITION"}, {value: "MOBILE RADIO SYSTEMS", text: "MOBILE RADIO SYSTEMS"}, {value: "SECURITY OF MULTIMEDIA AND EMBEDDED APPLICATIONS", text: "SECURITY OF MULTIMEDIA AND EMBEDDED APPLICATIONS"},{value: "FORENSICS AND CYBER CRISIS MANAGEMENT", text: "FORENSICS AND CYBER CRISIS MANAGEMENT"}, {value: "CLOUD COMPUTING VIRTUALIZATION, SDN AND SECURITY", text: "CLOUD COMPUTING VIRTUALIZATION, SDN AND SECURITY"}, {value: "PROJECT MANAGEMENT AND MANAGEMENT", text: "PROJECT MANAGEMENT AND MANAGEMENT"}],
        S5: [{value: "WSN, IOT AND APPLICATIONS", text: "WSN, IOT AND APPLICATIONS"}, {value: "WIRELESS NETWORKS AND AEROSPACE COMMUNICATIONS", text: "WIRELESS NETWORKS AND AEROSPACE COMMUNICATIONS"}, {value: "SECURITY ARCHITECTURES AND BCP / DRP", text: "SECURITY ARCHITECTURES AND BCP / DRP"}, {value: "SERVICE-BASED ARCHITECTURES AND DEVSECOPS CHAIN DEVELOPMENT", text: "SERVICE-BASED ARCHITECTURES AND DEVSECOPS CHAIN DEVELOPMENT"}, {value: "REAL-TIME AND REAL-TIME OPERATING SYSTEMS (RTOS)", text: "REAL-TIME AND REAL-TIME OPERATING SYSTEMS (RTOS)"}, {value: "GOVERNANCE, STANDARDS, MANAGEMENT & SECURITY AUDIT", text: "GOVERNANCE, STANDARDS, MANAGEMENT & SECURITY AUDIT"}, {value: "MANAGEMENT AND ENTREPRENEURSHIP 2", text: "MANAGEMENT AND ENTREPRENEURSHIP 2"}]
    };
    



    useEffect(() => {
        if (firstSelection) {
            setSecondOptions([{ value: '', text: 'Choose a Semester' }].concat(secondOptionsMap[firstSelection]));
        } else {
            setSecondOptions([]);
        }

        setSecondSelection('');
        setThirdSelection('');
    }, [firstSelection]);

    useEffect(() => {
        if (secondSelection) {
            setThirdOptions([{ value: '', text: 'Choose a Module' }].concat(thirdOptionsMap[secondSelection]));
        } else {
            setThirdOptions([]);
        }
        setThirdSelection('');
    }, [secondSelection]);



    return (
        <div className="container">
            {responseData === "File uploaded successfully" && <Navigate to="/admin/cours" replace />} 
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4 m-4">
                <h2 className="text-center mb-5" style={{ color: '#4a70ea' }}>New Course</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Year</label>
                            <div className="col-sm-8">
                                <select id="firstDropdown" className="form-select" value={firstSelection} onChange={(e) => {setFirstSelection(e.target.value); setYear(e.target.value);}}>
                                    <option disabled value=''>Choose the Year</option>
                                    <option value='CI1'>First Year Engineering Cycle</option>
                                    <option value='CI2'>Second Year Engineering Cycle</option>
                                    <option value='CI3'>Third Year Engineering Cycle</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Semester</label>
                            <div className="col-sm-8">
                                <select id="secondDropdown" className="form-select" value={secondSelection} onChange={(e) => {setSecondSelection(e.target.value); setSemester(e.target.value);}}>
                                    {secondOptions.map((option, index) => (
                                         <option key={index} value={option.value}>{option.text} </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Module</label>
                            <div  className="col-sm-8">
                                <select id="thirdDropdown" className="form-select" value={thirdSelection} onChange={(e) => {setThirdSelection(e.target.value); setModule(e.target.value);}}>
                                    {thirdOptions.map((option, index) => (
                                        <option key={index} value={option.value}> {option.text} </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">File</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary" >Submit</button>
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
