import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Pages/Header";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Footer from "./components/Pages/Footer";
import Terms from "./components/Pages/Terms";
import Privacy from "./components/Pages/Privacy";
import Blog from "./components/Pages/Blog";

import SignIn from "./components/auth/SignIn";
import SignUpBroker from "./components/auth/SignUpBroker";
import EditProfile from "./components/Pages/EditProfile";
import Profile from "./components/Pages/Profile";
import SignUpUser from "./components/auth/SignUpUser";
import ChangePassword from "./components/Pages/ChangePassword";
import Services from "./components/Pages/Services";


const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signup-user" element={<SignUpUser />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup-broker" element={<SignUpBroker />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;