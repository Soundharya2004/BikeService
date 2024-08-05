import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ServiceBookings.css';
import url from '../api/url';

const RESEND_API_KEY = 're_6hp1hYt9_DBE6czhGYu1uvN6Kj36GHFeg'; // Replace with your actual API key

const ServiceBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get(`${url}/api/all-bookings`)
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching service bookings:', error);
            });
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setStatus(booking.status);
    };

    const handleSave = (id, email) => {
        axios.put(`${url}/api/servicebookings/${id}`, { status })
            .then(response => {
                // Send an email if the status is "completed"
                if (status === 'completed') {
                    sendEmail(email, id);
                }

                // Re-fetch the bookings after a successful update
                fetchBookings();
                setEditingBooking(null);
                alert("Service Booking edited successfully");
            })
            .catch(error => {
                console.error('Error updating booking:', error);
            });
    };

    const sendEmail = async (email, bookingId) => {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'rsoundharya03@gmail.com', // Replace with your sending email
                to: [email],
                subject: 'Booking Status Updated',
                html: `<strong>Your booking with ID ${bookingId} is now marked as completed. Thank you for choosing our service!</strong>`,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Email sent successfully:', data);
            alert('Email sent successfully!');
        } else {
            console.error('Error sending email:', res.statusText);
        }
    };

    return (
        <div className="service-bookings">
            <button className="btn btn-close" onClick={() => navigate('/dashboard')} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.8rem' }}>
                Close
            </button>
            <h1>Booking Details</h1>
            <div className="row">
                {bookings.map(booking => (
                    <div className="col-md-4 mb-3" key={booking._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Id: {booking.id}</h5>
                                <h5 className="card-title">Name: {booking.fullname}</h5>
                                <p className="card-text">Email: {booking.email}</p>
                                <p className="card-text">Mobile: {booking.mobile}</p>
                                <p className="card-text">Model: {booking.model}</p>
                                <p className="card-text">Service: {booking.service}</p>
                                <p className="card-text">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                <p className="card-text">Status: {booking.status}</p>
                                {editingBooking && editingBooking._id === booking._id ? (
                                    <div>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                                            <option value="pending">Pending</option>
                                            <option value="ready for delivery">Ready for Delivery</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <br />
                                        <button className="btn btn-success ml-2" onClick={() => handleSave(booking.id, booking.email)}>Save</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => setEditingBooking(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => handleEdit(booking)}>Edit Status</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceBookings;
