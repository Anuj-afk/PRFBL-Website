import React, { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_DOMAIN}/admin`;
const TOKEN = localStorage.getItem("accessToken");

function AdminForm({ onAdd }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(API_URL, form, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            onAdd(res.data);
            setForm({ name: "", email: "", password: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add admin");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-lg mb-2">Add Admin</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 mr-2 mb-2"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-2 mr-2 mb-2"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border p-2 mr-2 mb-2"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Admin"}
            </button>
        </form>
    );
}

export default AdminForm;
