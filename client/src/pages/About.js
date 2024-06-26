import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <p
            className="mt-2"
            style={{
              fontFamily: "cursive",
              fontSize: "20px",
              color: "black",
            }}
          >
            We at Bharadwaj Nursery provide our plants/products at very
            reasonable prices both wholesale and retail. All work is done by Mr.
            Billu Sharma and Mr. Rajkumar Sharma with their employees who have
            more than 15+ years of experience. We tend to fulfill the needs of
            our customers by providing the best choices for them to choose from.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <video className="w-100" controls>
            <source src="/videos/nursery.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default About;
