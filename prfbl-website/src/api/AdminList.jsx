import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminForm from "../componets/AdminForm";

const API_URL = `${import.meta.env.VITE_SERVER_DOMAIN}`; // Update if needed
const TOKEN = localStorage.getItem("accessToken"); // Replace with actual token

function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmins = async () => {
        try {
            const res = await axios.get(`${API_URL}/admins`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setAdmins(res.data);
        } catch (err) {
            console.error("Error fetching admins:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/admin/${id}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setAdmins(admins.filter(admin => admin._id !== id));
            location.reload();
        } catch (err) {
            console.error("Failed to delete admin:", err);
        }
    };

    const handleAdd = (newAdmin) => {
        setAdmins([newAdmin, ...admins]);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    if (loading) return <p>Loading admins...</p>;

    return (
        <div>
            <AdminForm onAdd={handleAdd} />
            <h2 className="text-xl mt-6 mb-2">All Admins</h2>
            <ul>
                {admins.map(admin => (
                    <li key={admin._id} className="mb-2 flex justify-between items-center border p-2">
                        <span>{admin.fullname} ({admin.email})</span>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => handleDelete(admin.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminList;
