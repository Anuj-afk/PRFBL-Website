import axios from "axios";
import React, { useEffect, useState } from "react";
import MyEditor from "../../componets/MyEditor";

function AddSection() {
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        slug: "",
        type: "",
        order: 0,
        content: [],
        // New fields for editor content
        editorContent: {
            editorState: null,
            htmlContent: "",
            plainText: "",
        },
    });

    const [pages, setPages] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getPages = async () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/pages", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                console.log("Pages fetched successfully:", response.data);
                setPages(response.data);
            })
            .catch((error) => {
                console.error("Error fetching pages:", error);
            });
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

    // New function to handle JSON validation
    const handleJsonChange = (index, value) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], value: value };

        // Validate JSON and set error state
        try {
            if (value.trim()) {
                JSON.parse(value);
                newContent[index].jsonError = null;
            } else {
                newContent[index].jsonError = null;
            }
        } catch (error) {
            newContent[index].jsonError = error.message;
        }

        setFormData({ ...formData, content: newContent });
    };

    // New function to handle editor content changes
    const handleEditorSave = (editorData) => {
        setFormData({
            ...formData,
            editorContent: {
                editorState: editorData.editorState,
                htmlContent: editorData.htmlContent,
                plainText: editorData.plainText,
            },
        });
        console.log("Editor content updated:", editorData);
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
        // Convert content array to object
        const contentObject = {};
        formData.content.forEach((item) => {
            if (item.key) {
                // Handle JSON type - parse the JSON string
                if (item.type === "json") {
                    try {
                        contentObject[item.key] = JSON.parse(
                            item.value || "{}"
                        );
                    } catch (error) {
                        console.error(
                            `Error parsing JSON for key "${item.key}":`,
                            error
                        );
                        // Store as string if JSON is invalid
                        contentObject[item.key] = item.value;
                    }
                } else {
                    contentObject[item.key] = item.value;
                }
            }
        });

        // Prepare the payload with editor content
        const payload = {
            type: formData.type,
            order: Number(formData.order),
            content: contentObject,
            // Add editor content to the payload
            editorState: formData.editorContent.editorState,
            htmlContent: formData.editorContent.htmlContent,
            plainText: formData.editorContent.plainText,
        };

        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/pages/${
                    formData.slug
                }/sections`,
                payload,
                {
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setResponse(res.data);
            console.log("Section added successfully:", res.data);

            // Optional: Reset form after successful submission
            // resetForm();
        } catch (error) {
            console.error("Error adding section:", error);
            setResponse({ error: error.message });
        }
    };

    // Optional: Reset form function
    const resetForm = () => {
        setFormData({
            slug: "",
            type: "",
            order: 0,
            content: [],
            editorContent: {
                editorState: null,
                htmlContent: "",
                plainText: "",
            },
        });
    };

    useEffect(() => {
        getPages();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="border p-2"
                >
                    <option value="">Select a Page</option>
                    {pages.map((page) => (
                        <option key={page.slug} value={page.slug}>
                            {page.name}
                        </option>
                    ))}
                </select>
                <input
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Section Type"
                    className="border p-2"
                />
                <input
                    name="order"
                    type="number"
                    value={formData.order}
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
                            <option value="json">JSON</option>
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
                        {item.type === "json" && (
                            <div className="space-y-2">
                                <textarea
                                    placeholder='{"key": "value", "array": [1, 2, 3]}'
                                    value={item.value || ""}
                                    onChange={(e) =>
                                        handleJsonChange(index, e.target.value)
                                    }
                                    className={`border p-2 resize-none font-mono text-sm h-20 ${
                                        item.jsonError
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                />
                                {item.jsonError && (
                                    <p className="text-red-500 text-xs">
                                        Invalid JSON: {item.jsonError}
                                    </p>
                                )}
                                {item.value && !item.jsonError && (
                                    <p className="text-green-500 text-xs">
                                        ✅ Valid JSON
                                    </p>
                                )}
                            </div>
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

            {/* Rich Text Editor Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                    Rich Text Content:
                </h3>
                <div className="border rounded-lg p-2">
                    <MyEditor onSave={handleEditorSave} />
                </div>

                {/* Show editor content status */}
                {formData.editorContent.plainText && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                        <p className="text-green-700">
                            ✅ Editor content saved (
                            {formData.editorContent.plainText.length}{" "}
                            characters)
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleAddSection}
                    disabled={!formData.slug || !formData.type}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Add Section
                </button>
                <button
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Reset Form
                </button>
            </div>

            {/* Debug info */}
            <div className="mt-6 p-4 border bg-gray-50">
                <h3 className="font-semibold mb-2">Form Data Preview:</h3>
                <div className="text-sm space-y-2">
                    <p>
                        <strong>Slug:</strong> {formData.slug}
                    </p>
                    <p>
                        <strong>Type:</strong> {formData.type}
                    </p>
                    <p>
                        <strong>Order:</strong> {formData.order}
                    </p>
                    <p>
                        <strong>Content Fields:</strong>{" "}
                        {formData.content.length}
                    </p>
                    <p>
                        <strong>Editor Content:</strong>{" "}
                        {formData.editorContent.plainText ? "Present" : "Empty"}
                    </p>
                </div>
            </div>

            <div className="mt-6 p-4 border bg-gray-50">
                <h3 className="font-semibold mb-2">API Response:</h3>
                <pre className="whitespace-pre-wrap break-all text-sm">
                    {JSON.stringify(response, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default AddSection;
