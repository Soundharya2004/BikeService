import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './BookingStatus.css';
import url from '../api/url';

const BookingStatus = () => {
    const { bookingData } = useContext(UserContext);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (bookingData) {
            const fetchStatus = () => {
                axios.get(`${url}/api/booking-status?emailid=${bookingData.emailid}`)
                    .then(response => {
                        setStatus(response.data.status);
                    })
                    .catch(error => {
                        console.error('Error fetching booking status:', error);
                    });
            };

            fetchStatus(); // Fetch status on component mount

            // Optionally, set an interval to periodically update the status
            const intervalId = setInterval(fetchStatus, 5000); // e.g., every 5 seconds

            return () => clearInterval(intervalId); // Cleanup the interval on component unmount
        }
    }, [bookingData]);

    if (!bookingData) return <div className="no-booking">No current booking.</div>;

    return (
        <div className="booking-status-container">
            <button className="close-button" onClick={() => navigate('/home')}>
                Close
            </button>
            <h2>Booking Status</h2>
            <div className="booking-details">
                <p><strong>Full Name:</strong> {bookingData.fullname}</p>
                <p><strong>Email:</strong> {bookingData.emailid}</p>
                <p><strong>Mobile:</strong> {bookingData.mobile}</p>
                <p><strong>Model:</strong> {bookingData.model}</p>
                <p><strong>Service:</strong> {bookingData.service}</p>
                <p><strong>Date:</strong> {new Date(bookingData.bookingDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {'Pending'}</p>
            </div>
        </div>
    );
};

export default BookingStatus;
