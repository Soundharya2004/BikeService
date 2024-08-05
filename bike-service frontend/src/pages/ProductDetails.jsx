import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './ProductDetails.css';

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        axios.get('https://bikeservice-1.onrender.com/api/v1/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://bikeservice-1.onrender.com/api/v1/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (productId) => {
        window.location.href = `/edit-product/${productId}`;
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`https://bikeservice-1.onrender.com/api/v1/products/${productId}`);
            setAlertMessage('Service deleted successfully');
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-details">
            <button className="btn btn-close" onClick={() => navigate('/dashboard')}>✖</button> {/* Close button */}
            <h1>Service Details</h1>
            {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product._id}>
                        <div className="card">
                            <div className="card-body text-center"> {/* Center content */}
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Cost: {product.cost}</p>
                                <div className="button-group"> {/* Added wrapper for buttons */}
                                    <button className="btn btn-edit" onClick={() => handleEdit(product._id)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
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
