const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
    // User Registration Route
    router.post('/register', async (req, res) => {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database
            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(query, [name, email, hashedPassword], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'Error registering user', error });
                }
                res.status(201).json({ message: 'Success', userId: results.insertId });
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });

    //login route 
    router.post('/login', (req, res) => {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error logging in', error });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const user = results[0];

            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Login successful
            res.status(200).json({ message: 'Login successful', userId: user.id });
        });
    });

    return router;
};
