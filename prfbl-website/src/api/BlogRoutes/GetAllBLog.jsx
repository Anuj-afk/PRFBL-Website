// GetAllBlogs.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function GetAllBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/blogs")
            .then(res => setBlogs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">All Blogs</h2>
            <pre>{JSON.stringify(blogs, null, 2)}</pre>
        </div>
    );
}

export default GetAllBlogs;
