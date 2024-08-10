import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './ProductDetails.css';
import url from '../api/url';

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${url}/admin/services`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setAlertMessage('Failed to load services. Please try again later.');
        }
    };

    const handleEdit = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${url}/admin/services/${productId}`); // Adjust this to your actual delete endpoint
            setAlertMessage('Service deleted successfully');
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
            setAlertMessage('Failed to delete service. Please try again.');
        }
    };

    return (
        <div className="product-details">
            <button className="btn btn-close" onClick={() => navigate('/dashboard')}>✖</button> {/* Close button */}
            <h1>Service Details</h1>
            {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product.serviceId}>
                        <div className="card">
                            <div className="card-body text-center"> {/* Center content */}
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Cost: {product.cost}</p>
                                <div className="button-group"> {/* Added wrapper for buttons */}
                                    <button className="btn btn-edit" onClick={() => handleEdit(product.serviceId)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => handleDelete(product.serviceId)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
