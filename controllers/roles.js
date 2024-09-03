const Role = require('../models/roles');

// @desc Get all roles
// @route GET /api/roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Get role by ID
// @route GET /api/roles/:id
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).send('Role not found');
        res.json(role);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Create a new role
// @route POST /api/roles
exports.createRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        const newRole = new Role({ roleName });
        await newRole.save();
        res.status(201).json(newRole);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Update a role
// @route PUT /api/roles/:id
exports.updateRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { roleName },
            { new: true }
        );
        if (!updatedRole) return res.status(404).send('Role not found');
        res.json(updatedRole);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Delete a role
// @route DELETE /api/roles/:id
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).send('Role not found');
        res.json({ message: 'Role deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
