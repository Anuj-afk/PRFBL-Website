import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import BlogForm from "./api/BlogRoutes/CreateBlog";
import GetAllBlogs from "./api/BlogRoutes/GetAllBLog";
import GetBlogById from "./api/BlogRoutes/GetBlog";
import UpdateBlog from "./api/BlogRoutes/UpdateBlog";
import DeleteBlog from "./api/BlogRoutes/DeleteBlog";
import AddSection from "./api/CmsRoutes/AddSection";
import CreatePage from "./api/CmsRoutes/CreatePage";
import GetPage from "./api/CmsRoutes/GetPage";
import HandleDeleteSection from "./api/CmsRoutes/HandleDeleteSection";
import UpdateSection from "./api/CmsRoutes/UpdateSection";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/admin-login" element={<Login></Login>}></Route>
            <Route path="/admin/" element={<Admin></Admin>}>

                <Route
                    path="blog-routes/get-all-blogs"
                    element={<GetAllBlogs />}
                />
                <Route
                    path="blog-routes/get-blog-by-id"
                    element={<GetBlogById />}
                />
                <Route path="blog-routes/create-blog" element={<BlogForm />} />
                <Route
                    path="blog-routes/update-blog"
                    element={<UpdateBlog />}
                />
                <Route
                    path="blog-routes/delete-blog"
                    element={<DeleteBlog />}
                />
                <Route
                    path="cms-routes/add-section"
                    element={<AddSection />}
                />
                <Route
                    path="cms-routes/create-page"
                    element={<CreatePage />}
                />
                <Route path="cms-routes/get-page" element={<GetPage />} />
                <Route
                    path="cms-routes/delete-section"
                    element={<HandleDeleteSection />}
                />
                <Route
                    path="cms-routes/update-section"
                    element={<UpdateSection />}
                />
            </Route>
        </Routes>
    );
}

export default App;
