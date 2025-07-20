import TeamMember from "../Schema/TeamMember.js";

// Create team member
export const createTeamMember = async (req, res) => {
    try {
        const { role, department, juniorOf } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newMember = await TeamMember.create({
            admin: req.Id, // set in verifyAdmin middleware
            role,
            department,
            image,
            juniorOf: juniorOf || null
        });

        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all members
export const getAllTeamMembers = async (req, res) => {
    try {
        const team = await TeamMember.find();
        res.json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one
export const getTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Not found" });
        res.json(member);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
export const updateTeamMember = async (req, res) => {
    try {
        const { role, department, juniorOf } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedData = {
            role,
            department,
            juniorOf: juniorOf || null
        };
        if (image) updatedData.image = image;

        const updated = await TeamMember.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
export const deleteTeamMember = async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ message: "Team member removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
