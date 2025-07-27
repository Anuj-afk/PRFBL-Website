import React, { useState } from "react";
import axios from "axios";

function AuthForm({ isAdmin = false }) {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const url = isRegister
            ? `http://localhost:3000/${isAdmin ? "admin" : "register"}`
            : `http://localhost:3000/${isAdmin ? "adminLogin" : "login"}`;

        try {
            const res = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setResponse({ success: true, data: res.data });

            setFormData({ name: "", email: "", password: "" });
        } catch (err) {
            setResponse({
                success: false,
                data: err.response?.data || { message: err.message },
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded">
            <h2 className="text-xl font-bold mb-4">
                {isRegister ? "Register" : "Login"} {isAdmin ? "Admin" : "User"}
            </h2>
            <div className="grid gap-4">
                {isRegister && (
                    <input
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        placeholder="Name"
                        className="border p-2 rounded"
                    />
                )}
                <input
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Email"
                    type="email"
                    className="border p-2 rounded"
                />
                <input
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Password"
                    type="password"
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
                >
                    {isRegister ? "Register" : "Login"}
                </button>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-sm text-blue-500 underline"
                >
                    {isRegister
                        ? "Already have an account? Login"
                        : "No account? Register"}
                </button>
            </div>

            {response && (
                <div
                    className={`mt-4 p-2 rounded ${
                        response.success ? "bg-green-100" : "bg-red-100"
                    }`}
                >
                    <pre>{JSON.stringify(response.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default AuthForm;
