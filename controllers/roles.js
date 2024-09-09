const Role = require('../models/roles');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).send('Role not found');
        res.json(role);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

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

exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).send('Role not found');
        res.json({ message: 'Role deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
