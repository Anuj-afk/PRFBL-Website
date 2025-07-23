import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    Network,
    FolderGit2,
    ChevronDown,
    ChevronRight,
    FileText,
} from "lucide-react";

// Updated routesData with custom labels
const routesData = [
    {
        name: "Blog Routes",
        methods: [
            { method: "GET", label: "Get All Blogs" },
            { method: "GET", label: "Get Blog By ID" },
            { method: "POST", label: "Create Blog" },
            { method: "PUT", label: "Update Blog" },
            { method: "DELETE", label: "Delete Blog" },
        ],
    },
    {
        name: "CMS Routes",
        methods: [
            { method: "POST", label: "Create Page" },
            { method: "PUT", label: "Update Section" },
            { method: "GET", label: "Get Page" },
            { method: "POST", label: "Add Section" },
            { method: "DELETE", label: "Delete Section" },
        ],
    },
    {
        name: "Contact Routes",
        methods: [
            { method: "POST", label: "Submit Contact Form" },
            { method: "GET", label: "Get All Forms" },
        ],
    },
    {
        name: "Team Routes",
        methods: [
            { method: "POST", label: "Add Team Member" },
            { method: "GET", label: "Get All Members" },
            { method: "GET", label: "Get Member By ID" },
            { method: "PUT", label: "Update Member" },
            { method: "DELETE", label: "Remove Member" },
        ],
    },
    {
        name: "User Routes",
        methods: [
            { method: "POST", label: "Register User" },
            { method: "POST", label: "Login User" },
            { method: "POST", label: "Reset Password" },
            { method: "POST", label: "Update Profile" },
            { method: "GET", label: "Get Current User" },
        ],
    },
];

// Method badge color map
const methodColor = {
    GET: "bg-green-100 text-green-700",
    POST: "bg-blue-100 text-blue-700",
    PUT: "bg-yellow-100 text-yellow-700",
    DELETE: "bg-red-100 text-red-700",
    PATCH: "bg-purple-100 text-purple-700",
};

function Admin() {
    const location = useLocation();
    const [openRoutes, setOpenRoutes] = useState(true);
    const [openRouteFolders, setOpenRouteFolders] = useState({});

    const toggleRouteFolder = (routeName) => {
        setOpenRouteFolders((prev) => ({
            ...prev,
            [routeName]: !prev[routeName],
        }));
    };

    return (
        <div className="flex gap-12">
            <div className="w-64 min-h-screen p-4 border-r text-sm font-mono bg-white">
                {/* Top-level Routes Folder */}
                <div
                    className="flex items-center gap-2 cursor-pointer select-none mb-2"
                    onClick={() => setOpenRoutes(!openRoutes)}
                >
                    {openRoutes ? (
                        <ChevronDown size={16} />
                    ) : (
                        <ChevronRight size={16} />
                    )}
                    <Network size={16} className="text-purple-600" />
                    <span className="font-semibold">Routes</span>
                </div>

                {/* Route folders */}
                {openRoutes && (
                    <ul className="ml-5 space-y-1">
                        {routesData.map((route) => (
                            <li key={route.name}>
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() =>
                                        toggleRouteFolder(route.name)
                                    }
                                >
                                    {openRouteFolders[route.name] ? (
                                        <ChevronDown size={14} />
                                    ) : (
                                        <ChevronRight size={14} />
                                    )}
                                    <FolderGit2
                                        size={14}
                                        className="text-blue-500"
                                    />
                                    <span>{route.name}</span>
                                </div>

                                {/* Methods inside each route */}
                                {openRouteFolders[route.name] && (
                                    <ul className="ml-6 mt-1 space-y-1">
                                        {route.methods.map(
                                            ({ method, label }, index) => {
                                                const path = `/admin/${route.name
                                                    .toLowerCase()
                                                    .replace(/ /g, "-")}/${label
                                                    .toLowerCase()
                                                    .replace(/ /g, "-")}`;
                                                const isActive =
                                                    location.pathname === path;
                                                console.log(path);

                                                return (
                                                    <li
                                                        key={index}
                                                        className={`flex items-center gap-2 rounded px-2 py-1 ${
                                                            isActive
                                                                ? "bg-gray-100 font-semibold"
                                                                : "hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <FileText
                                                            size={12}
                                                            className="text-gray-600"
                                                        />
                                                        <Link
                                                            to={path}
                                                            className="flex-1 text-gray-800 hover:underline"
                                                        >
                                                            {label}
                                                        </Link>
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded ${
                                                                methodColor[
                                                                    method
                                                                ] ||
                                                                "bg-gray-100 text-gray-600"
                                                            }`}
                                                        >
                                                            {method}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="p-12">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default Admin;
