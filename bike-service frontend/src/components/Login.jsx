import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css'; 
import url from '../api/url';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const result = await axios.post(`${url}/user/login`, { email, password });
            console.log(result);
            // Check if the login is successful
            if (result.status === 200) {
                console.log("Login Success");
                alert('Login successful!');
                navigate('/home'); // Navigate to home after successful login
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            // Check for specific error messages from the server
            if (error.response && error.response.status === 401) {
                alert('Incorrect email or password! Please try again.');
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-image"></div> {/* Left section for image */}
            <div className="login-form-container">
                <h2 className="login-heading text-dark">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <h5 className='login-info-text text-dark'>Don't have an account? 
                    <Link to='/register' className="login-link"> Register</Link>
                </h5>
            </div>
        </div>
    );
}

export default Login;
