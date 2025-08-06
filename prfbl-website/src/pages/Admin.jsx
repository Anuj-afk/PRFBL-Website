import React from "react";
import { Link, Outlet } from "react-router-dom";

function Admin() {
    return (
        <div className="flex h-screen">
            <div className="flex flex-col items-start bg-gray-100 p-4 h-full w-60 justify-start">
                <h1 className="text-2xl font-bold text-center my-4">
                    Admin Dashboard
                </h1>
                <div className="pt-4 flex flex-col items-start w-full h-full">
                    <Link
                        className="hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="/admin/cms-routes/page"
                    >
                        Pages
                    </Link>
                    <Link
                        className=" mt-4 hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="/admin/cms-routes/section"
                    >
                        Section
                    </Link>
                    <Link
                        className=" mt-4 hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="/admin/blog"
                    >
                        Blog
                    </Link>
                    <Link
                        className=" mt-4 hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="contact-routes/submit-contact-form"
                    >
                        Contact (example to check for form submission)
                    </Link>
                    <Link
                        className=" mt-4 hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="contact-routes/get-all-forms"
                    >
                        Contact Admin View
                    </Link>
                    <Link
                        className=" mt-4 hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="team"
                    >
                        Team Members
                    </Link>
                    <Link
                        className=" mt-4 hover:text-blue-400 before:w-2 before:h-2 before:bg-blue-600 before:left-4 before:rounded-full before:content-[''] before:translate-y-2 before:absolute pl-8 border-b w-full h-fit pb-3 border-dashed border-black hover:underline"
                        to="admin"
                    >
                        Admins
                    </Link>
                </div>
            </div>
            <div className="flex-1 p-4 bg-white overflow-y-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default Admin;
