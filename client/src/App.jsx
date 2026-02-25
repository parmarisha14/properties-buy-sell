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
      </Routes>

      <Footer />
    </>
  );
};

export default App;