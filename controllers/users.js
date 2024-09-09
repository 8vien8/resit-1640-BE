const User = require('../models/users');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcrypt');

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
        const user = await User.findById(req.params.id).populate('roleID').populate('facultyID');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUsersByRole = async (req, res) => {
    try {
        const { roleID } = req.params;
        const users = await User.find({ roleID }).populate('roleID').populate('facultyID');

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found for this role' });
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
        const users = await User.find({ facultyID }).populate('roleID').populate('facultyID');

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found for this faculty' });
        }

        res.json(users);
    } catch (err) {
        console.error('Error fetching users by role:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, passwordHash, email, roleID, facultyID } = req.body;
        const avatar = req.file.path;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newUser = new User({
            username,
            passwordHash,
            email,
            roleID,
            facultyID,
            avatar
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server Error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, passwordHash, email, roleID, facultyID } = req.body;
        let avatarUrl = req.body.avatar;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars'
            });
            avatarUrl = result.secure_url;
        } else {
            console.log('No file uploaded');
        }

        const updateData = { username, email, roleID, facultyID, avatar: avatarUrl };

        if (passwordHash) {
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(passwordHash, salt);
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
