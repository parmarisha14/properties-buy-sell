import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Pages/Header";
import Footer from "./components/Pages/Footer";

import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Terms from "./components/Pages/Terms";
import Privacy from "./components/Pages/Privacy";
import Blog from "./components/Pages/Blog";
import Services from "./components/Pages/Services";

import SignIn from "./components/auth/SignIn";
import SignUpUser from "./components/auth/SignUpUser";
import SignUpBroker from "./components/auth/SignUpBroker";

import Profile from "./components/Pages/Profile";
import EditProfile from "./components/Pages/EditProfile";
import ChangePassword from "./components/Pages/ChangePassword";

import AllProperties from "./components/Pages/AllProperties";
import PropertyDetails from "./components/Pages/PropertyDetails";

import ExpertTeam from "./components/Pages/ExpertTeam";
import BrokerDetails from "./components/Pages/BrokerDetails";

import axios from "axios";
import UserInquiries from "./components/Pages/UserInquiries";
import Wishlist from "./components/Pages/Wishlist";
import UserMeetings from "./components/Pages/UserMeetings";
import NotFound from "./components/Pages/NotFound ";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup-user" element={<SignUpUser />} />
        <Route path="/signup-broker" element={<SignUpBroker />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/properties" element={<AllProperties />} />

        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route path="/agents" element={<ExpertTeam />} />
        <Route path="/broker/:id" element={<BrokerDetails />} />
        <Route path="/my-requests" element={<UserInquiries />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/meeting" element={<UserMeetings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
