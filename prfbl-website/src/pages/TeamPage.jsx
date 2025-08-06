import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamTree from "../componets/TeamTree";
import MemberFormModal from "../componets/MemberFormModal";

export default function TeamPage() {
    const [team, setTeam] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchTeam = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/team`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setTeam(res.data);
        } catch (err) {
            console.error("Failed to fetch team members:", err);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Team Hierarchy</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Add Member
                </button>
            </div>

            {team.length > 0 ? (
                <TeamTree team={team} />
            ) : (
                <p className="text-gray-500">No team members yet.</p>
            )}

            {showModal && (
                <MemberFormModal
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
