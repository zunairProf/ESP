const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./mongoDatabase');
const END_POINT = require('./globalContants');
const USER = require("./schemas/user");
const BOOKED_ROOMS = require("./schemas/booked_rooms");
// JWT Secret Key
const secretKey = 'r0omB0ok!';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({status: false, error: 'Unauthorized: Token missing'});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({status: false, error: 'Unauthorized: Token expired or invalid'});
        }

        req.user = decoded;
        next();
    });
};

// LOGIN API
router.post(END_POINT.LOGIN, async (req, res) => {
    const {username, password} = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({error: 'Username and password are required'});
    }

    try {
        // Check if the user exists
        const user = await USER.findOne({name: username.toLowerCase()});

        if (!user) {
            // User not found
            return res.status(401).json({status: false, data: 'Invalid username or password'});
        }

        const storedHashedPassword = user.password;

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).json({status: false, data: 'Invalid username or password'});
        }

        // Passwords match, generate JWT token
        const {id, role} = user;
        const token = jwt.sign({id, username, role}, secretKey, {expiresIn: '24h'});

        res.status(200).json({status: true, data: {userId: id, username, token, userRole: role}});
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({error: 'Error during login'});
    }
});

// API to create user
router.post(END_POINT.SIGN_UP, async (req, res) => {
    const {username, password} = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({status: false, error: 'Username and password are required'});
    }

    // Check if the user already exists
    const foundUser = await USER.find({name: username});
    console.log('Found people:', foundUser);

    if (foundUser.length > 0) {
        return res.status(409).json({status: false, error: 'User already exists'});
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({status: false, error: 'Error creating user'});
        }

        // Insert user into the database
        try {
            const savedPerson = await new USER({
                name: username,
                password: hashedPassword,
                role: 'NORMAL_USER',
            }).save();
            // console.log('Saved user:', savedPerson);
            console.log('User created successfully');
            res.status(200).json({status: true, data: 'User created successfully'});
        } catch (error) {
            console.error('Error saving person:', error);
        }
    });
});

// FORGOT PASSWORD API
router.put(END_POINT.FORGOT_PASSWORD, verifyToken, async (req, res) => {
    const userId = req.params.userId;
    const {newPassword} = req.body;

    try {

        // Hash the password using bcrypt
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({status: false, error: 'Error updating user password'});
            }

            // Assuming you have a 'users' table with columns 'id' and 'password'
            const updateUserPasswordQuery = `UPDATE user SET password=? WHERE id=?`;
            const values = [hashedPassword, userId];

            db.query(updateUserPasswordQuery, values, (err, result) => {
                if (err) {
                    console.error('Error updating password:', err);
                    res.status(500).send('Error updating password');
                } else {
                    if (result.affectedRows > 0) {
                        console.log('Password updated successfully');
                        res.status(200).send({status: true, data: 'Password updated successfully'});
                    } else {
                        console.log('User not found');
                        res.status(404).send({status: true, data: 'User not found'});
                    }
                }
            });
        });
        // const hashedPassword = await bcrypt.hash(newPassword, 10);

    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Error hashing password');
    }
});

// GET ALL USER API
router.get(END_POINT.USERS, async (req, res) => {
    // Fetch all users from the database
    try {
        // Fetch all users with selected fields (id, username, role)
        const users = await USER.find({}, '_id name role');

        res.status(200).json({status: true, data: users});
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({error: 'Error fetching users'});
    }
});

router.get(END_POINT.GET_BOOKED_ROOMS, async (req, res) => {


    try {
        const bookedRooms = await BOOKED_ROOMS.find();
        res.status(200).json({status: true, bookedRooms});
    } catch (error) {
        console.error('Error fetching booked rooms:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.put(END_POINT.APPROVE_PAYMENT, async (req, res) => {

    console.log(new Date(), "===== Approve payment Request =====")
    const {userId, roomId, status} = req.body;
    console.log(`${userId} ${roomId} ${status}`)

    try {
        const updatedBooking = await BOOKED_ROOMS.updateOne(
            {user_id: userId, room_id: roomId},
            {$set: {payment_status: status}}
        );

        if (updatedBooking.nModified === 0) {
            return res.status(404).json({error: 'Record not found'});
        }

        res.status(200).json({success: true, data: 'Payment approved'});
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;