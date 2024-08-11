import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './AdminLogin.css'; 

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Hardcoded admin credentials
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin@123';

        // Check if the entered credentials match the hardcoded ones
        if (email === adminEmail && password === adminPassword) {
            navigate('/dashboard'); // Redirect to dashboard for admin
        } else {
            alert('Incorrect email or password! Please try again.');
        }
    };
    
    return (
        <div className="admin-login-container">
            <div className="admin-login-image"></div> {/* Left section for image */}
            <div className="admin-login-form-container">

                <form onSubmit={handleSubmit}>
                    <h2 className="admin-login-heading text-dark">Admin Login</h2> {/* Moved heading inside the form */}
                    <div className="mb-3">
                        <label htmlFor="adminInputEmail" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="adminInputEmail" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adminInputPassword" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="adminInputPassword" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
