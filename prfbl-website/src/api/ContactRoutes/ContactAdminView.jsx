import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactAdminView() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get(
                    "https://prfbl-website.onrender.com/api/contact",
                    {
                        headers: {
                            // Comment out if no auth required
                            authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                );
                setContacts(res.data);
            } catch (err) {
                setError(err.response?.data || err.message);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Contact Submissions</h2>
            {error && (
                <div className="text-red-600 mb-4">
                    Error: {JSON.stringify(error)}
                </div>
            )}

            <div className="grid gap-4">
                {contacts.map((contact, idx) => (
                    <div key={idx} className="border p-4 rounded bg-gray-50">
                        <p>
                            <strong>Name:</strong> {contact.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {contact.email}
                        </p>
                        {contact.subject && (
                            <p>
                                <strong>Subject:</strong> {contact.subject}
                            </p>
                        )}
                        <p>
                            <strong>Message:</strong> {contact.message}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Submitted:{" "}
                            {new Date(contact.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactAdminView;
