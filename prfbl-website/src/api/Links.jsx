import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../componets/Ui/Loader';

function PageHierarchy() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedPages, setExpandedPages] = useState(new Set());
    const [links, setLinks] = useState({});  // Add this new state
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    // Update the fetchLinks function
    const fetchLinks = async (sectionId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_DOMAIN}/sections/${sectionId}/links`, // Update endpoint
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            // Ensure we're setting an array of links
            setLinks(prev => ({
                ...prev,
                [sectionId]: response.data.links || [] // Ensure it's an array
            }));
        } catch (error) {
            console.error("Error fetching links:", error);
            // Set empty array on error
            setLinks(prev => ({
                ...prev,
                [sectionId]: []
            }));
        }
    };

    useEffect(() => {
        const loadPagesAndLinks = async () => {
            try {
                // Fetch pages first
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_DOMAIN}/pages`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                
                const pagesData = response.data;
                setPages(pagesData);

                // For each page, check sections that have links
                for (const page of pagesData) {
                    for (const section of page.sections) {
                        if (section.has_link) {
                            await fetchLinks(section._id);
                        }
                    }
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Error loading pages and links:", error);
                setLoading(false);
            }
        };

        loadPagesAndLinks();
    }, []);

    const togglePage = (slug) => {
        setExpandedPages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(slug)) {
                newSet.delete(slug);
            } else {
                newSet.add(slug);
            }
            return newSet;
        });
    };

    const handleAddSection = async (pageSlug) => {
        try {
            // You can customize this based on your needs
            const newSection = {
                type: "New Section",
                order: 0,
                pageSlug: pageSlug
            };

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/sections`,
                newSection,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            
            // Refresh the pages to show the new section
            fetchPages();
        } catch (error) {
            console.error("Error adding section:", error);
        }
    };

    const handleAddLink = async (sectionId) => {
        setSelectedSectionId(sectionId);
        setShowDropdown(true);
    };

    const handlePageSelect = async (pageSlug) => {
        try {
            const newLink = {
                type: 'internal',
                url: `/pages/${pageSlug}`,
                title: pages.find(p => p.slug === pageSlug)?.name || pageSlug,
            };

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/sections/${selectedSectionId}/links`,
                newLink,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            if (response.data.success) {
                fetchLinks(selectedSectionId);
                setShowDropdown(false);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                alert("This page is already linked to this section");
            } else {
                console.error("Error adding link:", error);
            }
            setShowDropdown(false);
        }
    };

    const handleDeleteLink = async (sectionId, linkId) => {
        if (!confirm("Are you sure you want to delete this link?")) {
            return;
        }

        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_DOMAIN}/sections/${sectionId}/links/${linkId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            
            fetchLinks(sectionId);
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    const PageNode = ({ page }) => {
        const isExpanded = expandedPages.has(page.slug);
        
        return (
            <div className="pl-2">
                <div 
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => togglePage(page.slug)}
                >
                    <span className={`w-4 h-4 flex items-center justify-center font-bold text-gray-600 select-none`}>
                        {page.sections?.length > 0 && (
                            isExpanded ? '−' : '+'
                        )}
                    </span>
                    <span className="font-medium">
                        {page.name} 
                        <span className="text-gray-500 text-sm ml-2">
                            ({page.sections?.length || 0} sections)
                        </span>
                    </span>
                </div>

                {isExpanded && (
                    <div className="ml-6 border-l">
                        {page.sections
                            ?.sort((a, b) => a.order - b.order) // Sort sections by order
                            .map((section) => (
                            <div key={section._id}>
                                <div 
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                                    onClick={() => section.has_link && fetchLinks(section._id)}
                                >
                                    <span className="w-4"></span>
                                    <span>
                                        {section.type}
                                        <span className="text-gray-400 text-sm ml-2">
                                            (Order: {section.order})
                                        </span>
                                    </span>
                                </div>
                                
                                {/* Links under section */}
                                {section.has_link && Array.isArray(links[section._id]) && links[section._id].map(link => (
                                    <div 
                                        key={link._id}
                                        className="flex items-center gap-2 p-2 ml-8 hover:bg-gray-50 rounded group"
                                    >
                                        <span className="w-4"></span>
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {link.title || link.url}
                                        </a>
                                        <span className="text-gray-400 text-xs">
                                            ({link.type})
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDeleteLink(section._id, link._id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 ml-2 text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {/* Add Link Button and Dropdown */}
                                {section.has_link && (
                                    <>
                                        <div 
                                            className="flex items-center gap-2 p-2 ml-8 hover:bg-gray-50 rounded cursor-pointer text-blue-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddLink(section._id);
                                            }}
                                        >
                                            <span className="w-4"></span>
                                            <span className="text-sm font-medium">+ Add Link</span>
                                        </div>
                                        
                                        {/* Page Selection Dropdown */}
                                        {showDropdown && selectedSectionId === section._id && (
                                            <div className="ml-12 mt-2 bg-white border rounded-lg shadow-lg p-2">
                                                <div className="text-sm font-medium text-gray-600 mb-2 px-2">
                                                    Select a page to link to:
                                                </div>
                                                {pages.map((p) => (
                                                    <div
                                                        key={p.slug}
                                                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded text-sm"
                                                        onClick={() => handlePageSelect(p.slug)}
                                                    >
                                                        {p.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="p-6">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Page Hierarchy</h1>
            
            <div className="border rounded-lg bg-white shadow">
                {pages.length > 0 ? (
                    pages.map((page) => (
                        <PageNode key={page.slug} page={page} />
                    ))
                ) : (
                    <div className="p-4 text-gray-500">
                        No pages found
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageHierarchy;