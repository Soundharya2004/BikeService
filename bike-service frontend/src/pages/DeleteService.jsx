import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteService = ({ serviceId }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${url}/admin/services/${serviceId}`);
            console.log('Service deleted:', response.data);
            navigate('/dashboard');
           
        } catch (error) {
            console.error('Error deleting service:', error);
        }
        
    };

    return (
        <div>
            <h1>Delete Service</h1>
            <button onClick={handleDelete}>Delete Service</button>
        </div>
    );
};

export default DeleteService;
