import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../pages/CreateService.css';

const CreateService = () => {
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const [serviceId, setServiceId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://bikeservice-1.onrender.com/api/v1/products', {
                serviceId,
                name,
                description,
                cost
            });
            console.log('Service created:', response.data);

            // Show alert message upon successful creation
            window.alert('A New Bike Service Successfully Created');

            // Clear form fields after successful creation
            setServiceId('');
            setName('');
            setDescription('');
            setCost('');
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    return (
        <div>
                        <button className="btn btn-close" onClick={() => navigate('/productDetails')}>✖</button> {/* Close button */}

    
        <div className="create-service-container">

            <h1>Create New Bike Service</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Service ID:</label>
                    <input type="text" value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Cost:</label>
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
                </div>
                <br />
                <button type="submit">Create Service</button>
            </form>
        </div>
        </div>
    );
};

export default CreateService;
