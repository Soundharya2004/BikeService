const express = require('express');
const router = express.Router();
 
module.exports = (db) => {
    // User Registration Route
    router.post('/bookings', (req, res) => {
        const { fullname, emailid, mobile, model, service, bookingDate } = req.body;

        // Check if the user is already registered
        db.query('SELECT * FROM bookings WHERE email = ?', [emailid], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            } 
            if (results.length > 0) {
                return res.json('Already registered');
            } else {
                // Insert the booking details into the database
                const query = 'INSERT INTO bookings (fullname, email, mobile, model, service, bookingDate) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(query, [fullname, emailid, mobile, model, service, bookingDate], (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error saving booking' });
                    }
                    res.json('Booking registered successfully!'); 
                });
            }
        });
    });

    // API endpoint to retrieve all bookings
    router.get('/all-bookings', (req, res) => {
        db.query('SELECT * FROM bookings', (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        });
    });

    // Route to update booking status by ID
    router.put('/servicebookings/:id', (req, res) => {
        const bookingId = req.params.id;
        const { status } = req.body; // Get the new status from the request body

        // Check if the status is provided
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        // Update the status in the database
        const query = 'UPDATE bookings SET status = ? WHERE id = ?'; // Use your actual booking table name and primary key
        db.query(query, [status, bookingId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json({ message: 'Booking status updated successfully' });
        });
    });

    // Route to filter bookings by status
    router.get('/filter-bookings', (req, res) => {
        const { status } = req.query; // Get the status from the query parameters

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        // Query to filter bookings by status
        db.query('SELECT * FROM bookings WHERE status = ?', [status], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        });
    }); 
//booking-status 
    router.get('/booking-status', (req, res) => {
        const { emailid } = req.query; // Get the email from the query parameters

        if (!emailid) {
            return res.status(400).json({ message: 'Emailid is required' });
        }

        // Query to filter bookings by email
        db.query('SELECT * FROM bookings WHERE email = ?', [emailid], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            res.json(results);
        });
    }); 

    return router; 
};
