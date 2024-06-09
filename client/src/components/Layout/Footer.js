import React from "react";
import { Link } from "react-router-dom";
import { RiCopyrightLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="text-light p-3" style={{ backgroundColor: "black" }}>
      <p className="text-center">
        Copyright <RiCopyrightLine size={20} /> 2024 Rashmi. All rights
        reserved.
      </p>
      <p className="text-center mt-3">
        <Link to="/about" style={{ color: "white" }}>
          About
        </Link>{" "}
        |{" "}
        <Link to="/contact" style={{ color: "white" }}>
          Contact
        </Link>{" "}
        |{" "}
        <Link to="/policy" style={{ color: "white" }}>
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
