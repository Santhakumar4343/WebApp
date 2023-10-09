import React, { useEffect } from "react";
import { Navbar } from "../Navbar/navbar";
import Homepage from "../Home/Homepage";
import Footer from "../Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.css";

const Layout = ({ children }) => {
  const toTopStyle = {
    backgroundColor: "#000",
    position: "fixed",
    width: "50px",
    height: "50px",
    right: "50px",
    bottom: "60px",
    borderRadius: "50%",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    color: "#fff",
    textDecoration: "none",
    opacity: 0,
    pointerEvents: "none",
    transition: "all 0.4s"
  };

  const toTopActiveStyle = {
    bottom: "40px",
    opacity: 1,
    pointerEvents: "all"
  };

  useEffect(() => {
    const toTop = document.querySelector(".to-top");

    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        Object.assign(toTop.style, toTopActiveStyle);
      } else {
        Object.assign(toTop.style, toTopStyle);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Homepage />
      {children}
      <Footer />
      <a href="#" className="to-top" style={toTopStyle}>
        <i className="fa-solid fa-chevron-up"></i>
      </a>
    </div>
  );
};

export default Layout;
