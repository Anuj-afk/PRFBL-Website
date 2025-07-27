// DeleteBlog.jsx
import { useState } from "react";
import axios from "axios";

function DeleteBlog() {
    const [id, setId] = useState("");
    const [result, setResult] = useState("");

    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await axios.delete(`https://prfbl-website.onrender.com/api/blogs/${id}`, {
                headers: {
                    "authorization": `Bearer ${accessToken}`
                }
            });
            setResult("Deleted successfully");
        } catch (err) {
            setResult("Error deleting");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
            <input className="border p-2 mr-2" value={id} onChange={e => setId(e.target.value)} placeholder="Enter Blog ID" />
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
            <p className="mt-4">{result}</p>
        </div>
    );
}

export default DeleteBlog;
