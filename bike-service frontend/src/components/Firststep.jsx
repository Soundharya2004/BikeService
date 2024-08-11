import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Firststep.css';
import url from '../api/url';
import emailjs from 'emailjs-com';

const FirstStep = () => {
    const [fullname, setFullName] = useState('');
    const [emailid, setEmailid] = useState('');
    const [mobile, setMobile] = useState('');
    const [model, setModel] = useState('');
    const [service, setService] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [servicesList, setServicesList] = useState([]); // State for services
    const { setUserEmail, setBookingData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices(); // Fetch services on component mount
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${url}/admin/get-services`);
            setServicesList(response.data); // Update services list
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bookingDetails = { fullname, emailid, mobile, model, service, bookingDate };
        console.log('Booking details:', bookingDetails); // Log booking details

        try {
            const result = await axios.post(`${url}/api/bookings`, bookingDetails);
            console.log('API Response:', result); // Log the API response

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
            console.log('Error:', err); // Log the error
        }
    };

    const sendEmailToAdmin = async (bookingDetails) => {
        const templateParams = {
            to_name: 'Admin',
            from_name: 'Booking Service',
            message: `A new booking has been created:\nFull Name: ${bookingDetails.fullname}\nEmail: ${bookingDetails.emailid}\nMobile: ${bookingDetails.mobile}\nBike Model: ${bookingDetails.model}\nService: ${bookingDetails.service}\nBooking Date: ${bookingDetails.bookingDate}`,
        };

        try {
            const result = await emailjs.send('service_gc8a5it', 'template_52al0oe', templateParams, '7vWW8UnGD34a4T4KS');
            console.log('Email sent successfully:', result.text);
        } catch (error) {
            console.error('Error sending email:', error);
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
                            {servicesList.map((service) => (
                                <option key={service.id} value={service.name}>{service.name}</option>
                            ))}
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
