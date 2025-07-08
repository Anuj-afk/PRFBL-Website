import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Navbar() {
    return (
        <div className="relative z-10 h-16 max-h-16 border-b border-white flex justify-around gap-6 py-4 items-center">
            <Link to={"/"} className="mb-2">
                <img src={Logo} alt="" className="h-12 w-28" />
            </Link>
            <div className="flex justify-center gap-6 items-center text-black text-semibold duration-500">
                <Link className="hover:text-blue-600">Home</Link>
                <Link className="hover:text-blue-600">About Us</Link>
                <Link className="hover:text-blue-600">Our Portfolio</Link>
                <Link className="hover:text-blue-600">Services</Link>
                <Link className="hover:text-blue-600">Blog</Link>
                <Link className="hover:text-blue-600">Contact Us</Link>
            </div>
        </div>
    );
}

export default Navbar;
