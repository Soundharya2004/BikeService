import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { UserContext } from './UserContext';
import homeImage from '../images/home.jpg'; // Import the image

const Home = () => {
    const { setUserEmail } = useContext(UserContext);
    const navigate = useNavigate();

    const handleViewBookingStatus = () => {
        setUserEmail('kg@gmail.com'); 
        navigate('/booking-status'); 
    };

    const handleLogout = () => {
        setUserEmail(''); // Clear user email on logout
        navigate('/register'); // Redirect to register page
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <span className="navbar-brand">FZONE</span>
                <span className="navbar-description">Your trusted partner for bike maintenance!</span>
                <div className="navbar-links">
                    <span 
                        className="highlight-text" 
                        onClick={handleViewBookingStatus}
                    >
                        View Booking Status
                    </span>
                    <Link to="/previous-bookings" className="highlight-text">
                        View Previous Bookings
                    </Link>
                    <span 
                        className="highlight-text" 
                        onClick={handleLogout}
                    >
                        Logout
                    </span>
                </div>
            </nav>
            <img src={homeImage} alt="Bike Service" className="home-image" />
            <div className="buttons-container">
                <Link to="/firststep" className="btn-service">
                    <span className="service-name">General Service</span>
                    <span className="service-price">Starts from ₹1500</span>
                </Link>
                <Link to="/firststep" className="btn-service">
                    <span className="service-name">Oil Change</span>
                    <span className="service-price">Starts from ₹200</span>
                </Link>
                <Link to="/firststep" className="btn-service">
                    <span className="service-name">Water Wash</span>
                    <span className="service-price">Starts from ₹300</span>
                </Link>
            </div>
            <footer className="footer">
                <p>&copy; 2024 FZONE Bike Service. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
