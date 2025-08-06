import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import MemberFormModal from "./MemberFormModal";
import axios from "axios";

export default function TeamMemberCard({ member }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="border p-4 rounded shadow bg-white ml-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.department}</p>
                    {member.image && (
                        <img
                            src={`${import.meta.env.VITE_SERVER_DOMAIN}/PRFBL-WEBSITE${member.image}`}
                            alt={member.role}
                            className="w-16 h-16 mt-2 rounded"
                        />
                    )}
                </div>
                <div className="space-x-2">
                    <button
                        onClick={() => {
                            setShowModal(true);
                            setEditMode(false);
                        }}
                    >
                        <FaPlus />
                    </button>
                    <button
                        onClick={() => {
                            setShowModal(true);
                            setEditMode(true);
                        }}
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={async () => {
                            if (confirm("Delete this member?")) {
                                await axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/api/team/${member._id}`, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                    },
                                });
                                location.reload();
                            }
                        }}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            {
                console.log(member)
            }
            {member.juniors?.length > 0 && (
                <div className="ml-6 mt-2 border-l pl-4 space-y-2">
                    {member.juniors.map((j) => (
                        <TeamMemberCard key={j._id} member={j} />
                    ))}
                </div>
            )}

            {showModal && (
                <MemberFormModal
                    parentId={!editMode ? member._id : null}
                    member={editMode ? member : null}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
