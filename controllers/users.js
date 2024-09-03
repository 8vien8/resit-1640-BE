const User = require('../models/users');

// @desc Get all users
// @route GET /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roleID').populate('facultyID');
        console.log(users);
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Get user by ID
// @route GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roleID').populate('facultyID');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Create a new user
// @route POST /api/users
exports.createUser = async (req, res) => {
    try {
        const { username, passwordHash, email, roleID, facultyID } = req.body;
        const newUser = new User({
            username,
            passwordHash,
            email,
            roleID,
            facultyID
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Update a user
// @route PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const { username, passwordHash, email, roleID, facultyID } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, passwordHash, email, roleID, facultyID },
            { new: true }
        ).populate('roleID').populate('facultyID');
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Delete a user
// @route DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
