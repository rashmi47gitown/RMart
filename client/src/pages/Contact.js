import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { FaInstagram } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { IoLocationSharp } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6 d-flex align-items-center">
          {/*<img
            src="/images/con.jpg"
            alt="contactus"
            style={{ width: "80%", height: "300px" }}
          /> */}
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column h-100 justify-content-center">
            <p
              className="text-justify mt-2"
              style={{ fontWeight: "bold", fontFamily: "cursive" }}
            >
              Any query and info about product feel free to contact anytime, we
              are available 24X7.
            </p>
            <p className="mt-3">
              <IoLocationSharp size={20} /> :{" "}
              <Link
                to="https://maps.app.goo.gl/vsauP3dZFd3vQY6e8?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
              >
                maps.app.goo.gl/vsauP3dZFd3vQY6e8?g_st=ic
              </Link>
            </p>
            <p className="mt-3">
              <TiSocialYoutubeCircular size={20} /> :{" "}
              <Link
                to="https://www.youtube.com/@BhardwajNursery"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.youtube.com/@BhardwajNursery
              </Link>
            </p>
            <p className="mt-3">
              <FaInstagram size={20} /> :{" "}
              <Link
                to="https://instagram.com/bhardwajnursery"
                target="_blank"
                rel="noopener noreferrer"
              >
                instagram.com/bhardwajnursery
              </Link>
            </p>
            <p className="mt-3">
              <CgWebsite size={20} /> :{" "}
              <Link
                to="https://sites.google.com/view/bhardwajnursery/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check out our Website to learn more.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
