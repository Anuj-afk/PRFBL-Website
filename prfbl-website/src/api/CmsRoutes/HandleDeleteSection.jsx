import axios from "axios";
import React, { useState } from "react";

function HandleDeleteSection() {
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        sectionId: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDeleteSection = async () => {
        const res = await axios.delete(
            `http://localhost:3000/sections/${formData.sectionId}`
        );
        setResponse(res.data);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Delete Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="sectionId"
                    onChange={handleChange}
                    placeholder="Section ID (for update/delete)"
                    className="border p-2"
                />
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                <button
                    onClick={handleDeleteSection}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete Section
                </button>
            </div>

            <div className="mt-6 p-4 border bg-gray-50">
                <h3 className="font-semibold mb-2">API Response:</h3>
                <pre className="whitespace-pre-wrap break-all">
                    {JSON.stringify(response, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default HandleDeleteSection;
