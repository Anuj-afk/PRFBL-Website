import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogCMS = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        coverImage: null,
        url: "",
        slug: "",
    });

    const [editId, setEditId] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchBlogs = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_SERVER_DOMAIN}/api/blogs`
        );
        console.log("Blogs fetched successfully:", res.data);
        setBlogs(res.data);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "coverImage") {
            const file = files[0];
            setFormData({ ...formData, coverImage: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("content", formData.content);
        data.append("author", formData.author);
        data.append("url", formData.url);
        data.append("slug", formData.slug);

        if (formData.coverImage) data.append("coverImage", formData.coverImage);

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            };

            if (editId) {
                await axios.put(
                    `${import.meta.env.VITE_SERVER_DOMAIN}/api/blogs/${editId}`,
                    data,
                    { headers }
                );
            } else {
                await axios.post(
                    `${import.meta.env.VITE_SERVER_DOMAIN}/api/blogs`,
                    data,
                    { headers }
                );
            }

            fetchBlogs();
            resetForm();
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const resetForm = () => {
        setFormData({ title: "", content: "", author: "", coverImage: null });
        setEditId(null);
        setPreview(null);
    };

    const handleEdit = (blog) => {
        setEditId(blog._id);
        setFormData({
            title: blog.title,
            content: blog.content,
            author: blog.author,
            url: blog.url || "",
            slug: blog.slug || "",
            coverImage: null, // don't preload file object
        });
        setPreview(
            blog.coverImage
                ? `${import.meta.env.VITE_SERVER_DOMAIN}/PRFBL-Website/${
                      blog.coverImage
                  }`
                : null
        );
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_DOMAIN}/api/blogs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            fetchBlogs();
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">
                {editId ? "Edit Blog" : "Create Blog"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-4 shadow rounded"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="url"
                    placeholder="Canonical URL"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    rows={4}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input
                    type="file"
                    name="coverImage"
                    onChange={handleChange}
                    className="w-full"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-auto my-2 rounded"
                    />
                )}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {editId ? "Update" : "Create"}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="text-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-2xl font-semibold mt-10 mb-4">All Blogs</h2>
            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="border p-4 rounded shadow-sm bg-gray-50"
                    >
                        <h3 className="text-xl font-bold">{blog.title}</h3>
                        <p className="text-sm text-gray-600">
                            By {blog.author}
                        </p>
                        <p className="my-2">{blog.content.slice(0, 100)}...</p>
                        {blog.coverImage && (
                            <img
                                src={`${
                                    import.meta.env.VITE_SERVER_DOMAIN
                                }/PRFBL-Website/${blog.coverImage}`}
                                alt="Cover"
                                className="w-40 h-auto my-2 rounded"
                            />
                        )}
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={() => handleEdit(blog)}
                                className="text-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogCMS;
