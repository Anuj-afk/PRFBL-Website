import React, { useState } from "react";
import axios from "axios";

function CmsUI() {
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        type: "",
        order: 0,
        content: "",
        sectionId: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreatePage = async () => {
        const res = await axios.post("http://localhost:3000/pages", {
            name: formData.name,
            slug: formData.slug,
        });
        setResponse(res.data);
    };

    const handleGetPage = async () => {
        const res = await axios.get(`http://localhost:3000/pages/${formData.slug}`);
        setResponse(res.data);
    };

    const handleAddSection = async () => {
        const res = await axios.post(`http://localhost:3000/pages/${formData.slug}/sections`, {
            type: formData.type,
            order: Number(formData.order),
            content: formData.content,
        });
        setResponse(res.data);
    };

    const handleUpdateSection = async () => {
        const res = await axios.put(`http://localhost:3000/sections/${formData.sectionId}`, {
            type: formData.type,
            order: Number(formData.order),
            content: formData.content,
        });
        setResponse(res.data);
    };

    const handleDeleteSection = async () => {
        const res = await axios.delete(`http://localhost:3000/sections/${formData.sectionId}`);
        setResponse(res.data);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">CMS UI</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="name"
                    onChange={handleChange}
                    placeholder="Page Name"
                    className="border p-2"
                />
                <input
                    name="slug"
                    onChange={handleChange}
                    placeholder="Page Slug"
                    className="border p-2"
                />
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
                <input
                    name="sectionId"
                    onChange={handleChange}
                    placeholder="Section ID (for update/delete)"
                    className="border p-2"
                />
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                <button
                    onClick={handleCreatePage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create Page
                </button>
                <button
                    onClick={handleGetPage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Get Page
                </button>
                <button
                    onClick={handleAddSection}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Section
                </button>
                <button
                    onClick={handleUpdateSection}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Update Section
                </button>
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

export default CmsUI;
