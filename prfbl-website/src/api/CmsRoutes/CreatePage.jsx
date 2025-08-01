import axios from "axios";
import React, { useState } from "react";

function CreatePage() {

        const [response, setResponse] = useState(null);
        const [formData, setFormData] = useState({
            name: "",
            slug: "",
        });
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

    const handleCreatePage = async () => {
        const res = await axios.post("https://prfbl-website.onrender.com/pages", {
            name: formData.name,
            slug: formData.slug,
        }
        , {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        setResponse(res.data);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create Page</h2>

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
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                <button
                    onClick={handleCreatePage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create Page
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

export default CreatePage;
