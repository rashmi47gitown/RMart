import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
    <Layout title={"Admin- All Product Rmart"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="product-link"
              >
                <div
                  className="card m-3 d-flex flex-column"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"300px"}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <h5 className="card-text">${p.price}</h5>
                    <p className="card-text">{p.quantity}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
