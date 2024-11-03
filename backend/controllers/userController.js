// controllers/userController.js
const bcrypt = require('bcrypt');
const { addUser, findUserByEmail } = require('../models/userModel');
const { createNewToken } = require('../utils/token');

// Register a new user
const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body;



    try {
        // Check if the user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        console.log(req.body)
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Add user to the database
        await addUser({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Invalid password' });

        // Create JWT token
        const token = createNewToken(user.id);

        // Return user data with token
        res.json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { registerUser, loginUser };
