const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Route to create a new service
    router.post('/services', (req, res) => {
        const { name, description, cost } = req.body;

        // Insert the service details into the database
        const query = 'INSERT INTO Services (name, description, cost) VALUES (?, ?, ?)';
        db.query(query, [name, description, cost], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving service' });
            }
            res.status(201).json({ message: 'Service created successfully!' });
        }); 
    });

    // API endpoint to retrieve all services
    router.get('/services', (req, res) => {
        db.query('SELECT * FROM Services', (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        });
    });

    // Route to retrieve a specific service by ID
    router.get('/services/:id', (req, res) => {
        const productId = req.params.id; 

        db.query('SELECT * FROM Services WHERE serviceId = ?', [productId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.json(results[0]);
        });
    });
    router.delete('/services/:id', (req, res) => {
        const serviceId = req.params.id;
    
        db.query('DELETE FROM Services WHERE serviceId = ?', [serviceId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
    
            // Check if any row was affected (i.e., deleted)
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Service not found' });
            }
    
            // If deletion was successful, return a success message
            res.json({ message: 'Service deleted successfully' });
        });
    });
    
    // Route to update a service by ID
    router.put('/services/:id', (req, res) => {
        const serviceId = req.params.id;
        const { name, description, cost } = req.body;

        const query = 'UPDATE Services SET name = ?, description = ?, cost = ? WHERE serviceId = ?';
        db.query(query, [name, description, cost, serviceId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.json({ message: 'Service updated successfully' });
        });
    });

    return router;
};
