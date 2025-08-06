import TeamMember from "../Schema/TeamMember.js";

// Create team member
export const createTeamMember = async (req, res) => {
    try {
        const { name, role, department, juniorOf } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newMember = await TeamMember.create({
            admin: req.Id,
            name,
            role,
            department,
            image,
            juniorOf: juniorOf || null,
        });
        if (juniorOf) {
            await TeamMember.findByIdAndUpdate(juniorOf, {
                $addToSet: { seniorOf: newMember._id },
            });
        }

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
        const { admin, role, department, juniorOf } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ error: "Member not found" });

        const oldJuniorOf = member.juniorOf;

        const updatedData = {
            admin,
            role,
            department,
            juniorOf: juniorOf || null,
        };
        if (image) updatedData.image = image;

        const updated = await TeamMember.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (oldJuniorOf && oldJuniorOf !== juniorOf) {
            await TeamMember.findByIdAndUpdate(oldJuniorOf, {
                $pull: { seniorOf: updated._id }
            });
        }

        if (juniorOf && oldJuniorOf !== juniorOf) {
            await TeamMember.findByIdAndUpdate(juniorOf, {
                $addToSet: { seniorOf: updated._id }
            });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Delete
export const deleteTeamMember = async (req, res) => {
    const memberId = req.params.id;

    try {
        // Step 1: Delete the member
        const deletedMember = await TeamMember.findByIdAndDelete(memberId);
        if (!deletedMember) {
            return res.status(404).json({ error: "Team member not found" });
        }

        // Step 2: Remove references from other members' `juniorOf`
        await TeamMember.updateMany(
            { juniorOf: memberId },
            { $set: { juniorOf: null } }
        );

        res.json({
            message: "Team member removed and juniorOf references cleared",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
