import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './BookingStatus.css';
import url from '../api/url';

const BookingStatus = () => {
    const { bookingData } = useContext(UserContext);
    const [bookingStatus, setBookingStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (bookingData) {
            axios.get(`https://bikeservice-1.onrender.com/booking-status?emailid=${bookingData.emailid}`)
                .then(response => {
                    setBookingStatus(response.data);
                })
                .catch(error => {
                    console.error('Error fetching booking status:', error);
                });
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
                    <p><strong>Status:</strong> {bookingStatus ? bookingStatus.status : 'Pending'}</p>
                </div>
            </div>
        
    );
};

export default BookingStatus;
