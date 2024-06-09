import React from "react";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div
        className="container-fluid m-3 p-3"
        style={{ backgroundColor: "yellowgreen" }}
      >
        <div className="row p-10">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex justify-content-center">
            <div className="card w-70 p-5" style={{ fontSize: "20px" }}>
              <p>
                <b>Admin Name:</b> {auth?.user?.name}
              </p>
              <p>
                <b>Admin Email:</b> {auth?.user?.email}
              </p>
              <p>
                <b>Admin Phone:</b> {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
