import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { IoMdAdd } from "react-icons/io";
import Fade, { Bounce, Zoom } from "react-reveal";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories==========================
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //GET PRODUCTS================================
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //filter by category===========
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  //get filtered product=============
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offer"}>
      <div className="row">
        <div
          className="col-12 position-relative"
          style={{
            height: "98vh",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
            }}
          >
            <source src="/videos/Nvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className="col-12 position-absolute top-0 start-0 bg-black-opacity w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <img
              src="/images/bnhome.jpeg"
              alt="Bharadwaj Nursery Logo"
              style={{ maxWidth: "600px", marginBottom: "20px" }}
            />
          </div>
        </div>
      </div>

      {/*<div className="row">
        <div
          className="col-12"
          style={{
            height: "98vh",
            backgroundImage: "url('/images/nursery.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="col-12 position-absolute top-5 start-0 bg-black-opacity w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <img
              src="/images/bnhome.jpeg"
              alt="Bharadwaj Nursery Logo"
              style={{ maxWidth: "600px", marginBottom: "20px" }}
            />
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-12" style={{ height: "50vh" }}>
          <div className="col-12 position-absolute top-5 start-0 bg-black-opacity w-100 h-100 d-flex justify-content-center align-items-center">
            <img
              src="/images/bnlogo.jpeg"
              alt="Bharadwaj Nursery Logo"
              style={{
                maxWidth: "600px",
                marginBottom: "5px",
                width: "400px",
              }}
            />
          </div>
        </div>
        <Zoom>
          <div
            className="col-12"
            style={{ height: "80vh", paddingTop: "50px" }}
          >
            <p
              className="text-center"
              style={{
                marginTop: "20px",
                padding: "100px",
                color: "#4A5D23",
                fontSize: "27px",
                fontFamily: "revert-layer",
              }}
            >
              We at Bharadwaj Nursery provide our plants/products at very
              reasonable prices both wholesale and retail. All work is done by
              Mr. Billu Sharma and Mr. Rajkumar Sharma with their employees who
              have more than 15+ years of experience. We tend to fulfill the
              needs of our customers by providing the best choices for them to
              choose from.
            </p>
          </div>
        </Zoom>
      </div>

      <div className="row">
        <div
          className="col-12"
          style={{
            height: "98vh",
            backgroundImage: "url('/images/nursery.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="col-12 position-relative top-2 start-0 bg-black-opacity w-70 h-100 d-flex justify-content-center align-items-center">
        <div
          className="col-12"
          style={{
            height: "10vh",
            backgroundColor: "white",
          }}
        ></div>
      </div>

      <div className="row m-3">
        <div className="col-md-2">
          <p
            className="text-left"
            style={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Filter by Category
          </p>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <p
            className="text-left mt-4"
            style={{
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Filter by Price
          </p>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-warning mt-5"
              style={{
                fontFamily: "Times New Roman, Times, serif",
                width: "150px",
              }}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/*<h2 className="text-center">ALL PRODUCTS</h2>*/}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Fade top>
                <div
                  className="card m-3 d-flex flex-column"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <Link
                    to={`/product/${p.slug}`}
                    className="card-text"
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="20%"
                      height={"250px"}
                    />
                  </Link>
                  <div
                    className="card-body d-flex flex-column justify-content-between"
                    style={{
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    <h6 className="card-title" style={{ fontWeight: "bold" }}>
                      {p.name}
                    </h6>
                    <p className="card-text">
                      <b> Price:</b> ${p.price}
                    </p>
                    <Link
                      to={`/product/${p.slug}`}
                      className="card-text"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer",
                        ":hover": {
                          color: "green",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <h6>{p.description.substring(0, 50)}...</h6>
                    </Link>
                    <p className="card-text">
                      <b>Quantity:</b>
                      {p.quantity}
                    </p>
                    <div className="d-flex justify-content-between align-items-end">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart");
                        }}
                      >
                        <IoMdAdd size={20} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
