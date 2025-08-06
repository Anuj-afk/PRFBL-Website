import React, { useEffect, useState } from "react";
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
import EditPage from "./api/EditPage";
import Section from "./api/Section";
import EditSection from "./api/EditSection";
import BlogCMS from "./api/Blog";
import axios from "axios";
import TeamTree from "./componets/TeamTree";
import TeamPage from "./pages/TeamPage";
import AdminList from "./api/AdminList";

function App() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/team`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((res) => setTeam(res.data))
            .catch((err) => console.error(err));
    }, []);

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
                <Route
                    path="cms-routes/page/edit/*"
                    element={<EditPage></EditPage>}
                />
                <Route path="cms-routes/get-page" element={<GetPage />} />
                <Route path="cms-routes/page/add" element={<CreatePage />} />
                <Route path="cms-routes/section" element={<Section />} />
                <Route
                    path="cms-routes/section/edit/:slug/:sectionId"
                    element={<EditSection></EditSection>}
                />
                <Route path="cms-routes/section/add" element={<AddSection />} />
                <Route path="blog" element={<BlogCMS></BlogCMS>} />
                <Route path="team" element={<TeamPage team={team} />} />
                <Route path="admin" element={<AdminList></AdminList>} ></Route>
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
                <Route
                    path="user-routes/register-user"
                    element={<AuthForm></AuthForm>}
                ></Route>
                <Route
                    path="user-routes/register-admin"
                    element={<AuthForm isAdmin={true}></AuthForm>}
                ></Route>
                <Route
                    path="user-routes/admin-info"
                    element={<AdminInfo></AdminInfo>}
                ></Route>
            </Route>
        </Routes>
    );
}

export default App;
