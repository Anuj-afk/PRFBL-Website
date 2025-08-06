import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../componets/Ui/Loader";
import {
    CircleCheck,
    CircleX,
    PencilRuler,
    Trash2,
    CirclePlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Section() {
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState([]);
    const navig = useNavigate();

    const getSections = async () => {
        await axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/sections", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                console.log("Sections fetched successfully:", response.data);
                setSections(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching pages:", error);
            });
    };


    const setActivate = async (sectionId, activate) => {
        await axios
            .put(
                import.meta.env.VITE_SERVER_DOMAIN + `/sections/${sectionId}`,
                {
                    activated: activate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log("Section updated successfully:", response.data);
                getSections(); // Refresh the page data after update
            })
            .catch((error) => {
                console.error("Error updating section:", error);
            });
    };

    const setDelete = async (sectionId) => {
        await axios
            .delete(
                import.meta.env.VITE_SERVER_DOMAIN + `/sections/${sectionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log("Section deleted successfully:", response.data);
                getSections(); // Refresh the page data after deletion
            })
            .catch((error) => {
                console.error("Error deleting section:", error);
            });
    };

    useEffect(() => {
        getSections();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className=" p-6 flex flex-col gap-4 border mt-6 rounded">
                        <h1 className="text-2xl font-bold mb-4 border-b pb-4">
                            Sections
                        </h1>
                        <div className="flex flex-col gap-4">
                            {sections.length > 0 ? (
                                sections.map((section) => (
                                    <div
                                        key={section._id}
                                        className="border-b pb-2 flex justify-between items-center"
                                    >
                                        <span className="w-full">
                                            {section.type}
                                        </span>
                                        <span className="w-full">
                                            {section.page.name}
                                        </span>
                                        <div className="flex gap-2 w-full items-center justify-end">
                                            <PencilRuler
                                                size={18}
                                                className="hover:text-blue-500"
                                                onClick={() => {
                                                    navig(
                                                        `/admin/cms-routes/section/edit/${section.page.slug}/${section._id}`
                                                    );
                                                }}
                                            />
                                            <Trash2
                                                size={18}
                                                className="hover:text-red-500"
                                                onClick={() =>
                                                    setDelete(section._id)
                                                }
                                            />
                                            <CircleCheck
                                                size={18}
                                                className={`hover:text-red-500 ${
                                                    section.activated
                                                        ? ""
                                                        : " hidden "
                                                } text-green-500`}
                                                onClick={() =>
                                                    setActivate(
                                                        section._id,
                                                        false
                                                    )
                                                }
                                            />
                                            <CircleX
                                                size={18}
                                                className={`hover:text-green-500 ${
                                                    section.activated
                                                        ? " hidden "
                                                        : ""
                                                } text-red-500`}
                                                onClick={() =>
                                                    setActivate(
                                                        section._id,
                                                        true
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No pages available.</p>
                            )}
                        </div>
                        <div>
                            <CirclePlus
                                className="text-blue-500 hover:text-blue-600"
                                onClick={() => {
                                    navig("/admin/cms-routes/section/add");
                                }}
                            ></CirclePlus>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Section;
