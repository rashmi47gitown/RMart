import React, { useState } from "react";
import "../../styles/AuthStyles.css";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  console.log(process.env.REACT_APP_API);

  return (
    <Layout title={"Sign-Up-FloraFusion"}>
      <div className="form-container text-center">
        <form onSubmit={handleSubmit}>
          <h4
            className="text-center"
            style={{ color: "#568203", fontFamily: "fantasy" }}
          >
            Bharadwaj Nursery
          </h4>
          <br />
          <p>
            <b>Sign up to add, buy and checkout.</b>
          </p>
          <div className="mb-3">
            <div
              style={{
                textAlign: "center",
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <hr style={{ width: "40%", margin: "0 10px" }} />
              <span>OR</span>
              <hr style={{ width: "40%", margin: "0 10px" }} />
            </div>
            <input
              type="text"
              value={name}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your Phone number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="What's your favorite language?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
          <div className="mb-3 mt=5">
            <p>
              Have an account?
              <Link
                to="/login"
                className="btn text-center"
                style={{ color: "#1F75FE", fontWeight: "bold" }}
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
