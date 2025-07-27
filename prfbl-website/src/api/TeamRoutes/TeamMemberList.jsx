import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamMemberForm from "./TeamMemberForm";

function TeamMemberList() {
    const [members, setMembers] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchMembers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/team");
            setMembers(res.data);
        } catch (err) {
            console.error("Fetch failed:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const deleteMember = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/team/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });
            fetchMembers();
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <TeamMemberForm
                editMember={editing}
                onSuccess={() => {
                    setEditing(null);
                    fetchMembers();
                }}
            />

            <h2 className="text-2xl font-bold mb-4">Team Members</h2>
            <div className="grid gap-4">
                {members.map((member) => (
                    <div
                        key={member._id}
                        className="border p-4 rounded bg-gray-50 relative"
                    >
                        {member.image && (
                            <img
                                src={`http://localhost:3000${member.image}`}
                                alt="Team"
                                className="w-24 h-24 object-cover rounded mb-2"
                            />
                        )}
                        <p>
                            <strong>Role:</strong> {member.role}
                        </p>
                        <p>
                            <strong>Department:</strong> {member.department}
                        </p>
                        {member.juniorOf && (
                            <p>
                                <strong>Junior of:</strong> {member.juniorOf}
                            </p>
                        )}

                        <div className="mt-2 flex gap-2">
                            <button
                                className="text-blue-600 underline"
                                onClick={() => setEditing(member)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600 underline"
                                onClick={() => deleteMember(member._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamMemberList;
