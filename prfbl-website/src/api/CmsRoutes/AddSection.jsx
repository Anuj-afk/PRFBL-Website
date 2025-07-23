import axios from "axios";
import React, { useState } from "react";

function AddSection() {
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        slug: "",
        type: "",
        order: 0,
        content: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], [field]: value };
        setFormData({ ...formData, content: newContent });
    };

    const handleImageChange = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            handleContentChange(index, "value", reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    const addContentField = () => {
        setFormData({
            ...formData,
            content: [
                ...formData.content,
                { key: "", type: "text", value: "" },
            ],
        });
    };

    const removeContentField = (index) => {
        const newContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: newContent });
    };

    const handleAddSection = async () => {
        const contentObject = {};
        formData.content.forEach((item) => {
            if (item.key) contentObject[item.key] = item.value;
        });

        const res = await axios.post(
            `http://localhost:3000/pages/${formData.slug}/sections`,
            {
                type: formData.type,
                order: Number(formData.order),
                content: contentObject,
            }
        );
        setResponse(res.data);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="slug"
                    onChange={handleChange}
                    placeholder="Page Slug"
                    className="border p-2"
                />
                <input
                    name="type"
                    onChange={handleChange}
                    placeholder="Section Type"
                    className="border p-2"
                />
                <input
                    name="order"
                    type="number"
                    onChange={handleChange}
                    placeholder="Section Order"
                    className="border p-2"
                />
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Content Fields:</h3>
                {formData.content.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center"
                    >
                        <input
                            placeholder="Key"
                            value={item.key}
                            onChange={(e) =>
                                handleContentChange(
                                    index,
                                    "key",
                                    e.target.value
                                )
                            }
                            className="border p-2"
                        />
                        <select
                            value={item.type}
                            onChange={(e) =>
                                handleContentChange(
                                    index,
                                    "type",
                                    e.target.value
                                )
                            }
                            className="border p-2"
                        >
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="number">Number</option>
                        </select>

                        {item.type === "text" && (
                            <input
                                placeholder="Text"
                                value={item.value}
                                onChange={(e) =>
                                    handleContentChange(
                                        index,
                                        "value",
                                        e.target.value
                                    )
                                }
                                className="border p-2"
                            />
                        )}
                        {item.type === "number" && (
                            <input
                                type="number"
                                placeholder="Number"
                                value={item.value}
                                onChange={(e) =>
                                    handleContentChange(
                                        index,
                                        "value",
                                        e.target.value
                                    )
                                }
                                className="border p-2"
                            />
                        )}
                        {item.type === "image" && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImageChange(index, e.target.files[0])
                                }
                                className="border p-2"
                            />
                        )}

                        <button
                            onClick={() => removeContentField(index)}
                            className="w-8 h-8 flex items-center justify-center border text-red-500 border-red-500 rounded-full hover:border-red-700 hover:text-red-700 transition"
                            title="Remove field"
                        >
                            &minus;
                        </button>
                    </div>
                ))}

                <button
                    onClick={addContentField}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    + Add Content Field
                </button>
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleAddSection}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add Section
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

export default AddSection;
