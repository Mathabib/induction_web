const staffService = require('../services/staffService');

exports.getAll = async (req, res) => {
    try {
        const staff = await staffService.getAllStaff();
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};

exports.create = async (req, res) => {
    try {
        const staff = await staffService.createStaff(req.body);
        res.status(201).json(staff);

    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};