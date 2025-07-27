import React, { useState, useEffect } from "react";
import axios from "axios";

function TeamMemberForm({ editMember, onSuccess }) {
    const [formData, setFormData] = useState({
        role: "",
        department: "",
        juniorOf: "",
        image: null,
    });

    useEffect(() => {
        if (editMember) {
            setFormData({
                role: editMember.role,
                department: editMember.department,
                juniorOf: editMember.juniorOf || "",
                image: null,
            });
        }
    }, [editMember]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("role", formData.role);
        data.append("department", formData.department);
        data.append("juniorOf", formData.juniorOf);
        if (formData.image) data.append("image", formData.image);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        try {
            const url = editMember
                ? `https://prfbl-website.onrender.com/team/${editMember._id}`
                : "https://prfbl-website.onrender.com/team";
            const method = editMember ? axios.put : axios.post;
            await method(url, data, config);
            setFormData({
                role: "",
                department: "",
                juniorOf: "",
                image: null,
            });
            onSuccess();
        } catch (err) {
            console.error(
                "Submission failed:",
                err.response?.data || err.message
            );
        }
    };

    return (
        <div className="border p-4 rounded mb-6">
            <h2 className="text-xl font-bold mb-4">
                {editMember ? "Edit" : "Create"} Team Member
            </h2>
            <div className="grid gap-4">
                <input
                    name="role"
                    onChange={handleChange}
                    value={formData.role}
                    placeholder="Role"
                    className="border p-2 rounded"
                />
                <input
                    name="department"
                    onChange={handleChange}
                    value={formData.department}
                    placeholder="Department"
                    className="border p-2 rounded"
                />
                <input
                    name="juniorOf"
                    onChange={handleChange}
                    value={formData.juniorOf}
                    placeholder="Junior Of (optional)"
                    className="border p-2 rounded"
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {editMember ? "Update" : "Create"}
                </button>
            </div>
        </div>
    );
}

export default TeamMemberForm;
