import React, { useState, useEffect } from "react";
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Upload,
    Download,
    Eye,
    EyeOff,
    Code,
    Type,
} from "lucide-react";

// 🔌 LoadEditorStatePlugin - Safely loads saved state
function LoadEditorStatePlugin({ serializedEditorState }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!serializedEditorState) return;
        try {
            const jsonString =
                typeof serializedEditorState === "string"
                    ? serializedEditorState
                    : JSON.stringify(serializedEditorState);
            const parsedState = editor.parseEditorState(jsonString);
            editor.setEditorState(parsedState);
        } catch (err) {
            console.error("Error parsing editor state:", err);
        }
    }, [editor, serializedEditorState]);

    return null;
}

// 🛠 Toolbar
function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const formatText = (format) =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    const formatElement = (format) =>
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);

    return (
        <div className="flex flex-wrap gap-2 p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-1">
                <button
                    onClick={() => formatText("bold")}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Bold size={16} />
                </button>
                <button
                    onClick={() => formatText("italic")}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Italic size={16} />
                </button>
                <button
                    onClick={() => formatText("underline")}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <Underline size={16} />
                </button>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex gap-1">
                <button
                    onClick={() => formatElement("left")}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    onClick={() => formatElement("center")}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    onClick={() => formatElement("right")}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <AlignRight size={16} />
                </button>
            </div>
        </div>
    );
}

// 🛠 HTML Import
function HtmlImportPlugin({ htmlInput, setHtmlInput, onImport }) {
    const [editor] = useLexicalComposerContext();

    const handleImport = () => {
        if (!htmlInput.trim()) return;
        editor.update(() => {
            try {
                const parser = new DOMParser();
                const dom = parser.parseFromString(htmlInput, "text/html");
                const nodes = $generateNodesFromDOM(editor, dom);
                const root = $getRoot();
                root.clear();
                root.append(...nodes);
            } catch {
                const root = $getRoot();
                root.clear();
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(htmlInput));
                root.append(paragraph);
            }
        });
        onImport();
    };

    return (
        <div className="mb-4">
            <div className="flex gap-2 mb-2">
                <h3 className="text-lg font-semibold">Import HTML</h3>
                <button
                    onClick={handleImport}
                    disabled={!htmlInput.trim()}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
                >
                    <Upload size={14} />
                    Import
                </button>
            </div>
            <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Paste your HTML here..."
                className="w-full h-32 p-3 border border-gray-300 rounded resize-none font-mono text-sm"
            />
        </div>
    );
}

// 🛠 HTML Export
function HtmlExportPlugin({ onExport }) {
    const [editor] = useLexicalComposerContext();

    const handleExport = () => {
        editor.getEditorState().read(() => {
            try {
                const html = $generateHtmlFromNodes(editor, null);
                onExport(html);
            } catch {
                onExport("<p></p>");
            }
        });
    };

    return (
        <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">Export HTML</h3>
            <button
                onClick={handleExport}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
            >
                <Download size={14} />
                Export
            </button>
        </div>
    );
}

// 📝 Main Editor
export default function MyEditor({ initialData, onSave }) {
    const [htmlOutput, setHtmlOutput] = useState("");
    const [htmlInput, setHtmlInput] = useState("");
    const [showPreview, setShowPreview] = useState(true);
    const [activeTab, setActiveTab] = useState("editor");
    const [editorState, setEditorState] = useState(null);
    const [plainText, setPlainText] = useState("");

    const initialConfig = {
        namespace: "MyEditor",
        theme: {
            text: {
                bold: "font-bold",
                italic: "italic",
                underline: "underline",
                strikethrough: "line-through",
            },
            paragraph: "mb-2",
        },
        onError(error) {
            console.error("Lexical Error:", error);
        },
    };

    const onChange = (editorState, editor) => {
        setEditorState(editorState.toJSON());
        editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            setHtmlOutput(html);
            setPlainText($getRoot().getTextContent());
        });
    };

    const handleSave = () => {
        if (onSave) {
            onSave({
                editorState,
                htmlContent: htmlOutput,
                plainText,
            });
        }
    };

    const handleExport = (html) => {
        setHtmlOutput(html);
        navigator.clipboard
            .writeText(html)
            .then(() => alert("HTML copied to clipboard!"))
            .catch(() => console.log("Failed to copy to clipboard"));
    };

    const handleImport = () => {
        setHtmlInput("");
        alert("HTML imported successfully!");
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab("editor")}
                    className={`px-4 py-2 font-medium ${
                        activeTab === "editor"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <Type className="inline mr-2" size={16} />
                    Editor
                </button>
                <button
                    onClick={() => setActiveTab("import")}
                    className={`px-4 py-2 font-medium ${
                        activeTab === "import"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <Upload className="inline mr-2" size={16} />
                    Import HTML
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Panel */}
                <div className="space-y-4">
                    {activeTab === "editor" && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <LexicalComposer initialConfig={initialConfig}>
                                <LoadEditorStatePlugin
                                    serializedEditorState={
                                        initialData?.editorState
                                    }
                                />
                                <ToolbarPlugin />
                                <div className="relative">
                                    <RichTextPlugin
                                        contentEditable={
                                            <ContentEditable className="min-h-96 p-4 outline-none" />
                                        }
                                        placeholder={
                                            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                                                Start typing your content...
                                            </div>
                                        }
                                        ErrorBoundary={({ children }) => (
                                            <div className="text-red-500 p-4">
                                                An error occurred: {children}
                                            </div>
                                        )}
                                    />
                                    <OnChangePlugin onChange={onChange} />
                                    <HistoryPlugin />
                                </div>
                                <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between">
                                    <HtmlExportPlugin onExport={handleExport} />
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                                    >
                                        Save Document
                                    </button>
                                </div>
                            </LexicalComposer>
                        </div>
                    )}
                    {activeTab === "import" && (
                        <div className="border border-gray-300 rounded-lg p-4">
                            <LexicalComposer initialConfig={initialConfig}>
                                <HtmlImportPlugin
                                    htmlInput={htmlInput}
                                    setHtmlInput={setHtmlInput}
                                    onImport={handleImport}
                                />
                                <div className="border border-gray-200 rounded">
                                    <ToolbarPlugin />
                                    <div className="relative">
                                        <RichTextPlugin
                                            contentEditable={
                                                <ContentEditable className="min-h-64 p-4 outline-none" />
                                            }
                                            placeholder={
                                                <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                                                    Imported content will appear
                                                    here...
                                                </div>
                                            }
                                            ErrorBoundary={({ children }) => (
                                                <div className="text-red-500 p-4">
                                                    An error occurred:{" "}
                                                    {children}
                                                </div>
                                            )}
                                        />
                                        <OnChangePlugin onChange={onChange} />
                                        <HistoryPlugin />
                                    </div>
                                </div>
                            </LexicalComposer>
                        </div>
                    )}
                </div>

                {/* Right Panel */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                            Live Preview & HTML Output
                        </h3>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        >
                            {showPreview ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                            {showPreview ? "Hide Preview" : "Show Preview"}
                        </button>
                    </div>
                    {showPreview && (
                        <div className="border border-gray-300 rounded-lg">
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-sm">
                                Live Preview
                            </div>
                            <div
                                className="p-4 min-h-48 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: htmlOutput }}
                            />
                        </div>
                    )}
                    <div className="border border-gray-300 rounded-lg">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-sm flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Code size={16} /> HTML Output
                            </span>
                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(htmlOutput)
                                }
                                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="p-4">
                            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                                {htmlOutput || "<p></p>"}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
