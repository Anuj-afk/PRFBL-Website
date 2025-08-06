import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyEditor from "../componets/MyEditor.jsx"

function EditSection() {
    const { slug, sectionId } = useParams(); // Get slug and sectionId from URL
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const [formData, setFormData] = useState({
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

    const [pages, setPages] = useState([]);
    const [originalSection, setOriginalSection] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getPages = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_SERVER_DOMAIN + "/pages",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );
            setPages(response.data);
        } catch (error) {
            console.error("Error fetching pages:", error);
            setError("Failed to load pages");
        }
    };

    const loadSection = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_DOMAIN
                }/sections/${sectionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );

            const sectionData = response.data.section || response.data;
            setOriginalSection(sectionData);

            // Convert content object back to array format
            const contentArray = Object.entries(sectionData.content || {}).map(
                ([key, value]) => {
                    // Determine type based on value
                    let type = "text";
                    if (typeof value === "number") {
                        type = "number";
                    } else if (
                        typeof value === "string" &&
                        value.startsWith("data:image")
                    ) {
                        type = "image";
                    } else if (typeof value === "object" && value !== null) {
                        type = "json";
                        value = JSON.stringify(value, null, 2); // Pretty format JSON
                    }

                    return { key, type, value: value.toString() };
                }
            );

            setFormData({
                slug: slug,
                type: sectionData.type || "",
                order: sectionData.order || 0,
                content: contentArray,
                editorContent: {
                    editorState: sectionData.editorState || null,
                    htmlContent: sectionData.htmlContent || "",
                    plainText: sectionData.plainText || "",
                },
            });

            console.log("Loaded section data:", sectionData);
        } catch (error) {
            console.error("Error loading section:", error);
            setError("Failed to load section data");
        } finally {
            setLoading(false);
        }
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

    // Handle JSON validation
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

    const handleUpdateSection = async () => {
        try {
            setSaving(true);
            setError(null);

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

            // Prepare the payload
            const payload = {
                type: formData.type,
                order: Number(formData.order),
                content: contentObject,
                editorState: formData.editorContent.editorState,
                htmlContent: formData.editorContent.htmlContent,
                plainText: formData.editorContent.plainText,
            };

            const accessToken = localStorage.getItem("accessToken");
            const res = await axios.put(
                `${
                    import.meta.env.VITE_SERVER_DOMAIN
                }/sections/${sectionId}/${slug}`,
                payload,
                {
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setResponse(res.data);

            // Show success message
            alert("Section updated successfully!");

            // Optionally navigate back or reload data
            // navigate(`/admin/pages/${slug}/sections`);
        } catch (error) {
            console.error("Error updating section:", error);
            setError(
                "Failed to update section: " +
                    (error.response?.data?.error || error.message)
            );
            setResponse({ error: error.message });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSection = async () => {
        if (
            !window.confirm(
                "Are you sure you want to delete this section? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            setSaving(true);
            const accessToken = localStorage.getItem("accessToken");

            await axios.delete(
                `${
                    import.meta.env.VITE_SERVER_DOMAIN
                }/sections/${sectionId}`,
                {
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            alert("Section deleted successfully!");
            navigate(-1); // Go back to previous page
        } catch (error) {
            console.error("Error deleting section:", error);
            setError(
                "Failed to delete section: " +
                    (error.response?.data?.error || error.message)
            );
        } finally {
            setSaving(false);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const hasUnsavedChanges = () => {
        if (!originalSection) return false;

        // Check if form data has changed
        const currentContentObj = {};
        formData.content.forEach((item) => {
            if (item.key) currentContentObj[item.key] = item.value;
        });

        return (
            formData.type !== originalSection.type ||
            formData.order !== originalSection.order ||
            JSON.stringify(currentContentObj) !==
                JSON.stringify(originalSection.content || {}) ||
            formData.editorContent.htmlContent !==
                (originalSection.htmlContent || "")
        );
    };

    useEffect(() => {
        getPages();
        if (slug && sectionId) {
            loadSection();
        } else {
            setError("Missing required parameters: slug or sectionId");
            setLoading(false);
        }
    }, [slug, sectionId]);

    // Show loading state
    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading section data...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h2 className="text-red-800 font-semibold mb-2">Error</h2>
                    <p className="text-red-700">{error}</p>
                    <button
                        onClick={goBack}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Edit Section</h2>
                    <p className="text-gray-600">
                        Page: <span className="font-medium">{slug}</span> •
                        Section ID:{" "}
                        <span className="font-medium">{sectionId}</span>
                    </p>
                </div>
                <button
                    onClick={goBack}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    ← Back
                </button>
            </div>

            {hasUnsavedChanges() && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 font-medium">
                        ⚠️ You have unsaved changes
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <select
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="border p-2 bg-gray-100"
                    disabled // Usually don't want to change the page of an existing section
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

            <div className="mb-6">
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
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(
                                            index,
                                            e.target.files[0]
                                        )
                                    }
                                    className="border p-2"
                                />
                                {item.value && (
                                    <img
                                        src={item.value}
                                        alt="Preview"
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                )}
                            </div>
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
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    + Add Content Field
                </button>
            </div>

            {/* Rich Text Editor Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                    Rich Text Content:
                </h3>
                <div className="border rounded-lg p-2">
                    <MyEditor
                        initialData={
                            formData.editorContent.editorState
                                ? formData.editorContent
                                : null
                        }
                        onSave={handleEditorSave}
                    />
                </div>

                {formData.editorContent.plainText && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                        <p className="text-green-700">
                            ✅ Editor content loaded (
                            {formData.editorContent.plainText.length}{" "}
                            characters)
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={handleUpdateSection}
                    disabled={saving || !formData.type}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {saving && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    {saving ? "Updating..." : "Update Section"}
                </button>

                <button
                    onClick={handleDeleteSection}
                    disabled={saving}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                    Delete Section
                </button>

                <button
                    onClick={goBack}
                    disabled={saving}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>

            {/* Section Preview */}
            {originalSection && (
                <div className="mb-6 p-4 border bg-gray-50 rounded">
                    <h3 className="font-semibold mb-2">
                        Original Section Data:
                    </h3>
                    <div className="text-sm space-y-1">
                        <p>
                            <strong>Type:</strong> {originalSection.type}
                        </p>
                        <p>
                            <strong>Order:</strong> {originalSection.order}
                        </p>
                        <p>
                            <strong>Created:</strong>{" "}
                            {new Date(
                                originalSection.createdAt
                            ).toLocaleString()}
                        </p>
                        <p>
                            <strong>Updated:</strong>{" "}
                            {new Date(
                                originalSection.updatedAt
                            ).toLocaleString()}
                        </p>
                        <p>
                            <strong>Content Fields:</strong>{" "}
                            {Object.keys(originalSection.content || {}).length}
                        </p>
                        <p>
                            <strong>Rich Text:</strong>{" "}
                            {originalSection.htmlContent ? "Present" : "Empty"}
                        </p>
                    </div>
                </div>
            )}

            <div className="p-4 border bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">API Response:</h3>
                <pre className="whitespace-pre-wrap break-all text-sm">
                    {JSON.stringify(response, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default EditSection;
