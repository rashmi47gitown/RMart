import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9" style={{ border: "none" }}>
            <div
              className="card w-75 p-3 bg-light"
              style={{ fontFamily: "cursive" }}
            >
              <p>Name : {auth?.user?.name}</p>
              <p>Email : {auth?.user?.email}</p>
              <p>Delivery Address : {auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
