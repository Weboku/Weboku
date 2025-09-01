import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ServicePage from "../components/Services/ServicesPage";
import Services from "../components/Services/Services";
import Process from "../components/Process/Process";
import Strategies from "../components/Strategies/Strategies";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import TechStack from "../components/TechStack/TechStack";
import Disclaimer from "../components/Disclaimer/Disclaimer";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import Terms from "../components/Terms/Terms";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import AdsIllustration from "../components/Services/Adsillustration/AdsIllustration";


// admin
import AdminLayout from "./AdminLayout";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminLogin from "../Admin/Signin/AdminLogin";
import Dashboard from "../Admin/dashboard/Dashboard";
import BlogDash from "../Admin/blog/BlogDash";
import ReadBlog from "../Admin/blog/ReadBlog";
import BlogEditForm from "../Admin/blog/BlogEditForm";
import ManageUser from "../Admin/ManageUser/ManageUser";
import ManageMessages from "../Admin/ManageMessages/ManageMessages";
import ManageComment from "../Admin/ManageComment/ManageComment";


import RequireRole from "../routes/RequireRole";
import Forbidden from "../Admin/Forbidden";
import ManageAdmin from "../Admin/ManageAdmin/ManageAdmin";
import Blogs from "../components/Blogs/Blogs";
import Postpage from "../components/Blogs/Postpage/Postpage";
import ContactFormPopup from "../components/ContactFormPopup/ContactFormPopup";
import TeamMember from "../components/About/Ourteam/TeamMember/TeamMember";
import Ourteam from "../components/About/Ourteam/Ourteam";

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
};

const MainContent = ({ children }) => {
  const location = useLocation();
  const isAdjustedRoute = ["/services", "", "/contact"].includes(location.pathname);
  const style = isAdjustedRoute ? { minHeight: "60vh" } : {};
  return <div style={style}>{children}</div>;
};

const Shell = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
       {!isAdmin && <ContactFormPopup />}
      {/* Only show public site chrome when NOT in /admin */}
      {!isAdmin && (
        <div className="circle-bg">
          <div className="circle"></div><div className="circle"></div><div className="circle"></div>
          <div className="circle"></div><div className="circle"></div><div className="circle"></div>
          <div className="circle"></div><div className="circle"></div><div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}
      {!isAdmin && <Header />}

      {children}

      {!isAdmin && <TechStack />}
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTopButton />}
    </>
  );
};

const Container = () => {

  return (
    <Router>
      <ScrollToTop />
   
      <Shell>
        <MainContent>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/services/ads/:adsid" element={<AdsIllustration />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<Ourteam/>} />
               <Route path="/about/team/:name" element={<TeamMember/>} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:category/:slug" element={<Postpage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/our-strategies" element={<Strategies />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-condition" element={<Terms />} />
            
            {/* Admin redirect for clean UX */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Admin public route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin protected branch */}
            <Route element={<AdminPrivateRoute />}>
             <Route element={<AdminLayout />}>

                   {/* Dashboard: any authenticated admin role */}
                <Route path="/admin/dashboard" element={<Dashboard />} />

                     <Route element={<RequireRole roles={['master']} />}>
                   <Route path="/admin/manage-admin" element={<ManageAdmin />} />
                    </Route>

                   {/* Blog — master, all, editor */}
               <Route element={<RequireRole roles={['master','all','editor']} />}>
                   <Route path="/admin/blog" element={<BlogDash />} />
                   <Route path="/admin/blog/:name" element={<ReadBlog />} />
                   <Route path="/admin/blog/edit" element={<BlogEditForm />} />
              </Route>

                   {/* Users — master or all only */}
             <Route element={<RequireRole roles={['master','all']} />}>
                    <Route path="/admin/manage-users" element={<ManageUser />} />
             </Route>

                    {/* Messages & Comments — master, all, editor */}
             <Route element={<RequireRole roles={['master','all','editor']} />}>
                    <Route path="/admin/manage-contacts" element={<ManageMessages />} />
                    <Route path="/admin/manage-comments" element={<ManageComment />} />
             </Route>

          {/* 403 */}
            <Route path="/admin/forbidden" element={<Forbidden />} />
           </Route>
         </Route>
          {/*End  Admin protected branch */}

        </Routes>
      </MainContent>
      </Shell>
    </Router>
  );
};

export default Container;
