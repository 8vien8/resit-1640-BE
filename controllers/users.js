const User = require('../models/users');
const cloudinary = require('../config/cloudinary');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const transporter = require('../config/nodemailer');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roleID').populate('facultyID');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roleID').populate('facultyID').select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUsersByRole = async (req, res) => {
    try {
        const { roleID } = req.params;
        const users = await User.find({ roleID }).populate('roleID').populate('facultyID').select('-passwordHash');;

        if (users.length === 0) {
            return res.json(users);
        }

        res.json(users);
    } catch (err) {
        console.error('Error fetching users by role:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUsersByFaculty = async (req, res) => {
    try {
        const { facultyID } = req.params;
        const users = await User.find({ facultyID }).populate('roleID').populate('facultyID').select('-passwordHash');
        if (users.length === 0) {
            return res.json(users);
        }

        res.json(users);
    } catch (err) {
        console.error('Error fetching users by role:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, roleID, facultyID } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const randomPassword = crypto.randomBytes(10).toString('hex');

        const avatarUrl = req.file.path;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username,
            passwordHash: randomPassword,
            email,
            roleID,
            facultyID,
            avatar: avatarUrl
        });

        await newUser.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to COMP_1640 - Account Created',
            text: `Hello ${username},\n\n
            Your account has been successfully created.\n
            Your login password is: ${randomPassword}\n
            Please change it after logging in.\n\n
            Best Regards,\n
            COMP_1640`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).json({ message: 'User created and email sent', user: newUser });
            }
        });

    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, password, email, roleID, facultyID } = req.body;
        let avatarUrl = req.body.avatar;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars'
            });
            avatarUrl = result.secure_url;
        } else {
            console.log('No file uploaded');
        }

        const updateData = {
            username,
            email,
            roleID, facultyID,
            passwordHash: password,
            avatar: avatarUrl
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
