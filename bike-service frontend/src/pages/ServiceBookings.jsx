import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ServiceBookings.css';
import url from '../api/url';

const ServiceBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [status, setStatus] = useState('');
    const [filter, setFilter] = useState('all'); // New state for filter
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, [filter]); // Fetch bookings whenever the filter changes

    const fetchBookings = () => {
        const endpoint = filter === 'all' ? 'all-bookings' : `filter-bookings?status=${filter}`;
        axios.get(`${url}/api/${endpoint}`)
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

    const handleSave = (id, fullname, email) => {
        axios.put(`${url}/api/servicebookings/${id}`, { status })
            .then(response => {
                if (status === 'completed') {
                    sendEmail(id, fullname, email);
                }
                fetchBookings(); // Re-fetch bookings after update
                setEditingBooking(null);
                alert("Service Booking edited successfully");
            })
            .catch(error => {
                console.error('Error updating booking:', error);
            });
    };

    const sendEmail = async (bookingId, fullname, email) => {
        const templateParams = {
            to_name: fullname,
            from_name: 'Admin',
            user_email: email,
            booking_id: bookingId,
            message: `Hello ${fullname}, Your booking with ID ${bookingId} is now marked as completed. Thank you for choosing our service! If you have any questions, please feel free to contact us.`,
        };
        console.log(templateParams);

        emailjs.send('service_gc8a5it', 'template_qrwbwwl', templateParams, '7vWW8UnGD34a4T4KS')
            .then((response) => {
                console.log('Email sent successfully:', response.status, response.text);
                alert('Email sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    // Function to determine if an option should be disabled
    const isOptionDisabled = (optionValue) => {
        if (!editingBooking) return false;

        const currentStatus = editingBooking.status;

        if (currentStatus === 'completed') {
            return true;
        }
        if (optionValue === 'pending' && currentStatus === 'ready for delivery') {
            return true;
        }
        if (optionValue === 'ready for delivery' && currentStatus === 'completed') {
            return true;
        }
        return false;
    };

    return (
        <div className="service-bookings">
            <button className="btn btn-close" onClick={() => navigate('/dashboard')} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.8rem' }}>
                Close
            </button>
            <h1>Booking Details</h1>
            
            {/* Dropdown filter for status */}
            <div className="filter-dropdown">
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} // Update filter state
                    className="form-select"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="ready for delivery">Ready for Delivery</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="row">
                {bookings.map(booking => (
                    <div className="col-md-4 mb-3" key={booking.id}>
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
                                {editingBooking && editingBooking.id === booking.id ? (
                                    <div>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                                            <option value="pending" disabled={isOptionDisabled('pending')}>Pending</option>
                                            <option value="ready for delivery" disabled={isOptionDisabled('ready for delivery')}>Ready for Delivery</option>
                                            <option value="completed" disabled={isOptionDisabled('completed')}>Completed</option>
                                        </select>
                                        <br />
                                        <button className="btn btn-success ml-2" onClick={() => handleSave(booking.id, booking.fullname, booking.email)}>Save</button>
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
