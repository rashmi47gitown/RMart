import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4
            className="title mb-3"
            style={{ fontFamily: "fantasy", color: "#568203" }}
          >
            Bharadwaj Nursery
          </h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email address "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
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
          <div className="mb-3">
            <Link
              to="/forgot-password"
              className="btn btn-forgot-password text-center"
              style={{ color: "#1F75FE", border: "underlined" }}
            >
              Forgotton your password ?
            </Link>
          </div>
          <div className="mb-3 mt=5">
            <p>
              Don't have an account?
              <Link
                to="/signup"
                className="btn btn-forgot-password text-center"
                style={{ color: "#1F75FE", border: "underlined" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
