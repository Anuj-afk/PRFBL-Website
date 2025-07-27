import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminInfo() {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState();

    const handleSubmit = async (e) => {
        fetchAdmin();
    };

    const fetchAdmin = async () => {
        try {
            const res = await axios.get(
                `https://prfbl-website.onrender.com/admin/${username}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            setInfo(res.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col  gap-4 border mt-6 rounded">
            <h2 className="text-xl font-bold mb-4">Admin Info</h2>
            <label className="block font-medium">Username</label>
            <input
                type="text"
                name="title"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
            >
                Submit
            </button>
            {info ? (
                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(info, null, 2)}
                </pre>
            ) : (
                <p className="text-red-500">{JSON.stringify(error)}</p>
            )}
        </div>
    );
}

export default AdminInfo;
