import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../componets/Ui/Loader";
import {
    ArrowDown,
    ArrowUp,
    CircleCheck,
    CirclePlus,
    CircleX,
    PencilRuler,
    Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function EditPage() {
    const location = useLocation();
    const slug = location.pathname.split("/").pop(); // Extract slug from URL
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [sectionsNotInPage, setSectionsNotInPage] = useState([]);
    const navig = useNavigate();

    const getPage = async () => {
        await axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + `/pages/${slug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                console.log("Pages fetched successfully:", response.data);
                setPages(response.data);
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
                getPage(); // Refresh the page data after update
            })
            .catch((error) => {
                console.error("Error updating section:", error);
            });
    };

    const getSectionsNotInPage = async () => {
        await axios
            .get(
                import.meta.env.VITE_SERVER_DOMAIN + `/page/sections/${slug}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log("Sections not in page fetched successfully:", response.data);
                setSectionsNotInPage(response.data);
            })
            .catch((error) => {
                console.error("Error fetching sections not in page:", error);
            });
    };

    const setDelete = async (sectionId) => {
        await axios
            .delete(
                import.meta.env.VITE_SERVER_DOMAIN + `/pages/${sectionId}/${pages.slug}`,
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
                getPage(); // Refresh the page data after deletion
            })
            .catch((error) => {
                console.error("Error deleting section:", error);
            });
    };

    const changeOrder = async (sectionId, newOrder) => {
        await axios
            .put(
                import.meta.env.VITE_SERVER_DOMAIN + `/sections/${sectionId}`,
                {
                    order: newOrder,
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
                getPage(); // Refresh the page data after update
            })
            .catch((error) => {
                console.error("Error updating section:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        axios
            .put(
                import.meta.env.VITE_SERVER_DOMAIN + `/pages/${slug}`,
                {
                    [name]: value,
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
                console.log("Page updated successfully:", response.data);
                getPage(); // Refresh the page data after update
            })
            .catch((error) => {
                console.error("Error updating page:", error);
            });
    };

    const handleAdd = (e) => {

    }

    useEffect(() => {
        getPage();
        getSectionsNotInPage();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className=" p-6 flex flex-col gap-4 border mt-6 rounded">
                        <form
                            id="pageForm"
                            className="flex flex-col gap-4 w-full h-full"
                        >
                            <div className="flex w-full mb-4 border-b pb-4 justify-between items-center">
                                <div className="flex gap-4 items-center w-full">
                                    <span>Name: </span>
                                    <input
                                        name="name"
                                        className="text-2xl font-bold"
                                        defaultValue={pages.name}
                                        onChange={handleChange}
                                    ></input>
                                </div>

                                <div className="flex gap-4 items-center justify-end w-full">
                                    <span className="ml-4 w-fit">Slug: </span>
                                    <input
                                        name="slug"
                                        className="text-2xl font-bold w-fit"
                                        defaultValue={pages.slug}
                                        onChange={handleChange}
                                    ></input>
                                </div>
                                <div className="flex gap-4 items-center w-full">
                                    <span>URL: </span>
                                    <input
                                        name="URL"
                                        className="text-2xl font-bold"
                                        defaultValue={pages.URL}
                                        onChange={handleChange}
                                    ></input>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 justify-center items-stretch">
                                <div className="flex w-full">
                                    <span className="text-xl font-semibold">
                                        Sections
                                    </span>
                                    <span className="text-xl font-semibold ml-[26%]">
                                        ID
                                    </span>
                                    <span className="text-xl font-semibold ml-[29%]">
                                        Order
                                    </span>
                                </div>
                                {pages.sections.length > 0 ? (
                                    pages.sections.map((section) => (
                                        <>
                                            <div
                                                key={section._id}
                                                className="border-b pb-2 flex justify-between gap-4 items-center w-full"
                                            >
                                                <span className="w-full">
                                                    {section.type}
                                                </span>
                                                <span className="w-full">
                                                    {section._id}
                                                </span>
                                                <div className="text-center w-full flex gap-2 items-center justify-center">
                                                    <span className="w-fit">
                                                        {section.order}
                                                    </span>
                                                    <div className="flex flex-col w-fit">
                                                        <ArrowUp
                                                            className={`size-4 hover:border ${
                                                                section.order ==
                                                                0
                                                                    ? " hidden "
                                                                    : " "
                                                            }`}
                                                            onClick={() => {
                                                                changeOrder(
                                                                    pages
                                                                        .sections[
                                                                        section.order -
                                                                            1
                                                                    ]._id,
                                                                    section.order
                                                                );
                                                                changeOrder(
                                                                    section._id,
                                                                    section.order -
                                                                        1
                                                                );
                                                            }}
                                                        ></ArrowUp>
                                                        <ArrowDown
                                                            className={`size-4 hover:border ${
                                                                section.order ==
                                                                pages.sections
                                                                    .length -
                                                                    1
                                                                    ? " hidden "
                                                                    : " "
                                                            }`}
                                                            onClick={() => {
                                                                changeOrder(
                                                                    pages
                                                                        .sections[
                                                                        section.order +
                                                                            1
                                                                    ]._id,
                                                                    section.order
                                                                );
                                                                changeOrder(
                                                                    section._id,
                                                                    section.order +
                                                                        1
                                                                );
                                                            }}
                                                        ></ArrowDown>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 w-full items-center justify-end">
                                                    <PencilRuler
                                                        size={18}
                                                        className="hover:text-blue-500"
                                                        onClick={() => {
                                                            navig(
                                                                `/admin/cms-routes/section/edit/${section._id}`
                                                            );
                                                        }}
                                                    />
                                                    <Trash2
                                                        size={18}
                                                        className="hover:text-red-500"
                                                        onClick={() =>
                                                            setDelete(
                                                                section._id
                                                            )
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
                                        </>
                                    ))
                                ) : (
                                    <p>No Section available.</p>
                                )}
                            </div>
                        </form>
                        <div>
                            <CirclePlus
                                className="text-blue-500 hover:text-blue-600"
                                onClick={() => {
                                    handleAdd();
                                }}
                            ></CirclePlus>
                        </div>
                    </div>
                    <div></div>
                </>
            )}
        </div>
    );
}

export default EditPage;
