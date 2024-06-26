import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";

const Search = () => {
  const [cart, setCart] = useCart();
  const [values] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((p) => (
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
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
