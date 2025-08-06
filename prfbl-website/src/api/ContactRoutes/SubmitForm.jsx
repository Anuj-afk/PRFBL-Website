import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/api/contact`,
                formData
            );
            setResponse({ success: true, data: res.data });
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setResponse({
                success: false,
                data: error.response?.data || error.message,
            });
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="grid gap-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="border p-2 rounded"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="border p-2 rounded"
                />
                <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject (Optional)"
                    className="border p-2 rounded"
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="border p-2 rounded min-h-[100px]"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>

            {response && (
                <div
                    className={`mt-4 p-4 rounded ${
                        response.success ? "bg-green-100" : "bg-red-100"
                    }`}
                >
                    <h3 className="font-semibold">Response:</h3>
                    <pre>{JSON.stringify(response.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ContactForm;
