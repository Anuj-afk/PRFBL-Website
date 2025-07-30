import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../componets/Ui/Loader";
import { CircleCheck, CircleX, PencilRuler, Trash2 } from "lucide-react";

function Pages() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);

    const getPages = async () => {
        await axios
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
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching pages:", error);
            });
    };

    useEffect(() => {
        getPages();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className=" p-6 flex flex-col gap-4 border mt-6 rounded">
                        <h1 className="text-2xl font-bold mb-4 border-b pb-4">Pages</h1>
                        <div className="flex flex-col gap-4">
                            {pages.length > 0 ? (
                                pages.map((page) => (
                                    <div key={page._id} className="border-b pb-2 flex justify-between items-center">
                                        <span className="">
                                            {page.name}
                                        </span>
                                        <div className="flex gap-2">
                                            <PencilRuler size={18} className="hover:text-blue-500"/>
                                            <Trash2 size={18} className="hover:text-red-500"/>
                                            <CircleCheck size={18} className="hover:text-red-500"/>
                                            <CircleX size={18} className="hover:text-green-500"/>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No pages available.</p>
                            )}
                        </div>
                    </div>
                    <div></div>
                </>
            )}
        </div>
    );
}

export default Pages;
