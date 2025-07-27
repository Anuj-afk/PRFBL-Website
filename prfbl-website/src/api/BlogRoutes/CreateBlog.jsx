import React, { useState } from "react";
import axios from "axios";

function BlogForm() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        coverImage: null
    });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("title", formData.title);
        form.append("content", formData.content);
        form.append("author", formData.author);
        if (formData.coverImage) {
            form.append("coverImage", formData.coverImage);
        }
        const accessToken = localStorage.getItem("accessToken");
        try {
            setLoading(true);
            const res = await axios.post("https://prfbl-website.onrender.com/api/blogs", form, {
                headers: { "Content-Type": "multipart/form-data", "authorization": `Bearer ${accessToken}` },
            });
            setResponse(res.data);
        } catch (err) {
            setResponse(err.response?.data || { error: "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        rows={5}
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Response:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {response ? JSON.stringify(response, null, 2) : "No response yet"}
                </pre>
            </div>
        </div>
    );
}

export default BlogForm;
