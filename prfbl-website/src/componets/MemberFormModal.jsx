import axios from "axios";
import React, { useState, useEffect } from "react";

export default function MemberFormModal({ parentId, member, onClose }) {
    const [formData, setFormData] = useState({
        admin: member?.admin || "",
        role: member?.role || "",
        department: member?.department || "",
        image: null,
        juniorOf: member?.juniorOf || parentId || null,
    });

    const [teamList, setTeamList] = useState([]);
    const [adminList, setAdminList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [teamRes, adminRes] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_SERVER_DOMAIN}/api/team`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "accessToken"
                                )}`,
                            },
                        }
                    ),
                    axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/admins`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }),
                ]);

                const teamData = await teamRes.data;
                const adminData = await adminRes.data;
                setTeamList(teamData);
                setAdminList(adminData);
            } catch (err) {
                console.error("Error loading team or admins:", err);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (searchText) {
            const matches = teamList.filter(
                (m) =>
                    m.role.toLowerCase().includes(searchText.toLowerCase()) ||
                    m.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredOptions(matches);
        } else {
            setFilteredOptions([]);
        }
    }, [searchText, teamList]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("admin", formData.admin); // This is the admin's ID now
        form.append("role", formData.role);
        form.append("department", formData.department);
        if (formData.image) form.append("image", formData.image);
        if (formData.juniorOf) form.append("juniorOf", formData.juniorOf);

        const method = member ? "PUT" : "POST";
        const url = member
            ? `${import.meta.env.VITE_SERVER_DOMAIN}/api/team/${member._id}`
            : `${import.meta.env.VITE_SERVER_DOMAIN}/api/team`;

        await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: form,
        });
        location.reload();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded space-y-4 w-96"
            >
                <h2 className="text-lg font-semibold">
                    {member ? "Edit Member" : "Add Member"}
                </h2>

                {/* Admin Selector (replacing name field) */}
                <select
                    name="admin"
                    value={formData.admin}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                >
                    {
                        console.log(adminList) // Debugging line to check adminList
                    }
                    <option value="">Select Member</option>
                    {adminList.map((admin) => (
                        <option key={admin.id} value={admin.id}>
                            {admin.username}
                        </option>
                    ))}
                </select>

                {/* Role */}
                <input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Role"
                    className="w-full border p-2"
                    required
                />

                {/* Department */}
                <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    className="w-full border p-2"
                    required
                />

                {/* Image Upload */}
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full"
                />

                {/* Junior Of Field */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Senior (optional)"
                        value={
                            formData.juniorOf
                                ? teamList.find(
                                      (t) => t._id === formData.juniorOf
                                  )?.name ||
                                  teamList.find(
                                      (t) => t._id === formData.juniorOf
                                  )?.role ||
                                  ""
                                : searchText
                        }
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setFormData((prev) => ({
                                ...prev,
                                juniorOf: null,
                            }));
                        }}
                        className="w-full border p-2"
                    />
                    {filteredOptions.length > 0 && (
                        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-y-auto shadow">
                            {filteredOptions.map((option) => (
                                <li
                                    key={option._id}
                                    onClick={() => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            juniorOf: option._id,
                                        }));
                                        setSearchText(
                                            option.name || option.role
                                        );
                                        setFilteredOptions([]);
                                    }}
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option.name
                                        ? `${option.name} – ${option.role}`
                                        : option.role}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
