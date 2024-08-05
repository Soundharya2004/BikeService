import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './FirstStep.css';
import url from '../api/url';

const RESEND_API_KEY = 're_6hp1hYt9_DBE6czhGYu1uvN6Kj36GHFeg'; // Replace with your actual API key

const FirstStep = () => {
    const [fullname, setFullName] = useState('');
    const [emailid, setEmailid] = useState('');
    const [mobile, setMobile] = useState('');
    const [model, setModel] = useState('');
    const [service, setService] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const { setUserEmail, setBookingData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bookingDetails = { fullname, emailid, mobile, model, service, bookingDate };
        try {
            const result = await axios.post(`${url}/api/bookings`, bookingDetails);
            if (result.data === "Already registered") {
                alert("You are already registered");
            } else {
                alert("Registered successfully! Get ready for top-notch service!");
                await sendEmailToAdmin(bookingDetails); // Send email to admin
            }
            setUserEmail(emailid);
            setBookingData(bookingDetails);
            navigate('/booking-status');
        } catch (err) {
            console.log(err);
        }
    };

    const sendEmailToAdmin = async (bookingDetails) => {
        const emailData = {
            from: 'admin@example.com', // Admin email address
            to: ['admin@example.com'], // Add admin's email
            subject: 'New Booking Notification',
            html: `<strong>A new booking has been created:</strong><br>Details: ${JSON.stringify(bookingDetails)}`,
        };

        try {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify(emailData),
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Admin email sent successfully:', data);
            } else {
                console.error('Error sending admin email:', res.statusText);
            }
        } catch (error) {
            console.error('Error in sending email to admin:', error);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    const handleClose = () => {
        navigate('/home');
    };

    return (
        <div className="firststep-container">
            <div className="close-option" onClick={handleClose}>
                Close
            </div>
            <div className="firststep-form-container">
                <h2 className="firststep-heading">Your Bike Deserves the Best Care!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleInputName" className="form-label firststep-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Full Name"
                                className="form-control firststep-input"
                                id="exampleInputName"
                                onChange={(event) => setFullName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label firststep-label">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control firststep-input"
                                id="exampleInputEmail"
                                onChange={(event) => setEmailid(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleInputMobile" className="form-label firststep-label">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter Mobile Number"
                                className="form-control firststep-input"
                                id="exampleInputMobile"
                                onChange={(event) => setMobile(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleInputModel" className="form-label firststep-label">
                                Bike Model
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Bike Model"
                                className="form-control firststep-input"
                                id="exampleInputModel"
                                onChange={(event) => setModel(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputService" className="form-label firststep-label">
                            Service Required
                        </label>
                        <select
                            className="form-control firststep-input"
                            id="exampleInputService"
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                            required
                        >
                            <option value="" disabled>Select Service</option>
                            <option value="General service check-up">General service check-up</option>
                            <option value="Oil change">Oil change</option>
                            <option value="Water wash">Water wash</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputDate" className="form-label firststep-label">
                            Booking Date
                        </label>
                        <input
                            type="date"
                            placeholder="Select Date"
                            className="form-control firststep-input"
                            id="exampleInputDate"
                            min={today}
                            onChange={(event) => setBookingDate(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn firststep-btn">Register Now!</button>
                </form>
            </div>
        </div>
    );
};

export default FirstStep;
