import axios from "axios";
import React, { useState } from "react";

function UpdateSection() {
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        type: "",
        order: 0,
        content: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSection = async () => {
        const res = await axios.put(
            `https://prfbl-website.onrender.com/sections/${formData.sectionId}`,
            {
                type: formData.type,
                order: Number(formData.order),
                content: formData.content,
            }
        );
        setResponse(res.data);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Update Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="type"
                    onChange={handleChange}
                    placeholder="Section Type"
                    className="border p-2"
                />
                <input
                    name="order"
                    type="number"
                    onChange={handleChange}
                    placeholder="Section Order"
                    className="border p-2"
                />
                <input
                    name="content"
                    onChange={handleChange}
                    placeholder="Section Content"
                    className="border p-2"
                />
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                <button
                    onClick={handleUpdateSection}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Update Section
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

export default UpdateSection;
