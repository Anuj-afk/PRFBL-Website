// GetBlogById.jsx
import { useState } from "react";
import axios from "axios";

function GetBlogById() {
    const [id, setId] = useState("");
    const [blog, setBlog] = useState(null);

    const handleSubmit = async () => {
        try {
            const res = await axios.get(`https://prfbl-website.onrender.com/api/blogs/${id}`);
            setBlog(res.data);
        } catch (err) {
            setBlog({ error: "Not Found" });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Get Blog By ID</h2>
            <input className="border p-2 mr-2" value={id} onChange={e => setId(e.target.value)} placeholder="Enter Blog ID" />
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Fetch</button>
            <pre className="mt-4">{JSON.stringify(blog, null, 2)}</pre>
        </div>
    );
}

export default GetBlogById;
