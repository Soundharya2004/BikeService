import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import url from '../api/url';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const registrationData = { name, email, password }; // Data to be sent to the server
        console.log('Registration Data:', registrationData); // Log the data for debugging

        try {
            const result = await axios.post(`${url}/user/register`, registrationData);
            console.log(result);
            alert("Registered successfully!");
            navigate('/login'); // Navigate to login after successful registration
        } catch (error) {
            if (error.response) {
                console.log('Error Response:', error.response.data);
                if (error.response.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert('Registration failed. Please try again.');
                }
            } else {
                console.error('Error:', error.message);
                alert('Registration failed. Please check your input and try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-image"></div>
            <div className="register-form-container">
                <div className="admin-login-button">
                    <button className="btn btn-secondary" onClick={() => navigate('/AdminLogin')}>
                        Admin Login
                    </button>
                </div>
                <div className="register-form">
                    <h1 className="register-heading text-dark">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                id="exampleInputName"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="exampleInputEmail"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control"
                                id="exampleInputPassword"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <div className="btn-container">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <div className="already-text">
                        Already have an account? <Link to='/login' className="login-link">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
