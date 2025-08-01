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
import ContactForm from "./api/ContactRoutes/SubmitForm";
import ContactAdminView from "./api/ContactRoutes/ContactAdminView";
import TeamMemberForm from "./api/TeamRoutes/TeamMemberForm";
import TeamMemberList from "./api/TeamRoutes/TeamMemberList";
import AuthForm from "./api/UserRoutes/AuthForm";
import AdminInfo from "./api/UserRoutes/AdminInfo";
import Pages from "./api/Pages";

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
                <Route path="cms-routes/add-section" element={<AddSection />} />
                <Route path="cms-routes/page" element={<Pages />} />
                <Route path="cms-routes/get-page" element={<GetPage />} />
                <Route
                    path="cms-routes/delete-section"
                    element={<HandleDeleteSection />}
                />
                <Route
                    path="cms-routes/update-section"
                    element={<UpdateSection />}
                />
                <Route
                    path="contact-routes/submit-contact-form"
                    element={<ContactForm />}
                />
                <Route
                    path="contact-routes/get-all-forms"
                    element={<ContactAdminView />}
                />
                <Route
                    path="team-routes/add-team-member"
                    element={<TeamMemberForm></TeamMemberForm>}
                ></Route>
                <Route
                    path="team-routes/team-member-list"
                    element={<TeamMemberList></TeamMemberList>}
                ></Route>
                <Route path="user-routes/register-user" element={<AuthForm></AuthForm>}></Route>
                <Route path="user-routes/register-admin" element={<AuthForm isAdmin={true}></AuthForm>}></Route>
                <Route path="user-routes/admin-info" element={<AdminInfo></AdminInfo>}></Route>
                
            </Route>
        </Routes>
    );
}

export default App;
