import React, { useEffect, useState } from 'react';
import './auth.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    profession: '',
    institution: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.closest('.sign-up-container')) {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setLoginData({
        ...loginData,
        [name]: value
      });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8083/api/v1/java/signup', formData);
      alert('Registration successful, please check your email for confirmation.');
    } catch (error) {
      if (error.response) {
        console.error('There was an error registering!', error.response.data);
        alert('There was an error registering. ' + error.response.data);
      } else {
        console.error('Network error:', error.message);
        alert('A network error occurred. Please try again.');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8083/api/v1/java/login', loginData);
      alert('Login successful.');
    } catch (error) {
      if (error.response) {
        console.error('There was an error logging in!', error.response.data);
        alert('There was an error logging in. ' + error.response.data);
      } else {
        console.error('Network error:', error.message);
        alert('A network error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form class='form1' onSubmit={handleSignUpSubmit}>
              <h1 className="tit">Create Account</h1>
              <input
                placeholder="Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                placeholder="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              >
                <option value="">Select Profession</option>
                <option value="STUDENT">Student</option>
                <option value="ENGINEER">Engineer</option>
                <option value="TEACHER">Teacher</option>
                <option value="OTHER">Other</option>
              </select>
              <select
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
              >
                <option value="">Select Institution</option>
                <option value="UNIVERSITY">University</option>
                <option value="COMPANY">Company</option>
                <option value="SCHOOL">School</option>
                <option value="OTHER">Other</option>
              </select>
              <button className="sign" type="submit">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form class='form1' onSubmit={handleLoginSubmit}>
              <h1 className="tit">Sign in</h1>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <button className="sign" type="submit">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p style={{color:'white'}}>To keep connected with us please login with your personal info</p>
                <button className="signup" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p style={{color:'white'}}>Enter your personal details and start journey with us</p>
                <button className="signup" id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
