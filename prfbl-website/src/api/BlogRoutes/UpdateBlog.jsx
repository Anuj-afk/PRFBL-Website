// UpdateBlog.jsx
import { useState } from "react";
import axios from "axios";

function UpdateBlog() {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        if (title) formData.append("title", title);
        if (content) formData.append("content", content);
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await axios.put(`https://prfbl-website.onrender.com/api/blogs/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data", "authorization": `Bearer ${accessToken}` },
            });
            setResult(res.data);
        } catch (err) {
            setResult({ error: err.message });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Update Blog</h2>
            <input className="border p-2 block mb-2" value={id} onChange={e => setId(e.target.value)} placeholder="Blog ID" />
            <input className="border p-2 block mb-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <textarea className="border p-2 block mb-2" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
            <input type="file" onChange={e => setCoverImage(e.target.files[0])} />
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Update</button>
            <pre className="mt-4">{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
}

export default UpdateBlog;
