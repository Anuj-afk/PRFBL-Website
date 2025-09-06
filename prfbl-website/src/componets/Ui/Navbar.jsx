import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo.png";

function Navbar() {
    const [navItems, setNavItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNavItems = async () => {
            try {
                const response = await axios
                    .get(`${import.meta.env.VITE_SERVER_DOMAIN}/pages/home`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    })
                    .then((request) => {
                        console.log(request);
                        for (let i = 0; i < request.data.sections.length; i++) {
                            if (
                                request.data.sections[i].order == 0 &&
                                request.data.sections[i].type == "navbar"
                            ) {
                                slides =
                                    request.data.sections[i].content.slides;
                            }
                        }
                    });
            } catch (error) {
                console.error("Error fetching navigation items:", error);
                setLoading(false);
            }
        };

        fetchNavItems();
    }, []);

    return (
        <div className="relative z-10 h-20 max-h-16 border-b border-white flex justify-around gap-6 py-4 items-center">
            <Link to={"/"} className="mb-2">
                <img src={Logo} alt="" className="h-12 w-28" />
            </Link>
            <div className="flex justify-center gap-6 items-center text-black text-semibold duration-500">
                {loading ? (
                    <div className="animate-pulse">Loading...</div>
                ) : (
                    navItems.map((item) => (
                        <Link
                            key={item._id}
                            to={item.path}
                            className="hover:text-blue-600"
                        >
                            {item.label}
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default Navbar;
