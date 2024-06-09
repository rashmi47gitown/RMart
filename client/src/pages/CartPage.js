import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //below code - not working , ERROR : Expected an assignment or function call and instead saw an expression  no-unused-expressions
  // const totalPrice = () => {
  //   try {
  //     let total = 0;
  //     cart?.map((item) => {
  //       total = total + item.price;
  //     });
  //     return total.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const totalPrice = () => {
    // Validate cart existence to prevent potential errors
    if (!cart) {
      console.warn("Cart is empty or undefined. Returning 0.");
      return 0;
    }
    try {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error("Error calculating total price:", error);
      return null;
    }
  };
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //pay token===================================================
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //payment====================================================
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title={"Cart page - Rmart"}>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h3
              className="text-center p-2 mb-1"
              style={{ color: "#00ff00", backgroundColor: "black" }}
            >
              {!auth?.user
                ? "Hello Guest!"
                : `Hello  ${auth?.token && auth?.user?.name}!`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart. ${
                      auth?.token ? "" : "Please login to checkout !"
                    }`
                  : " Your Cart Is Empty."}
              </p>
            </h3>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p) => (
                <div className="row card mb-2 p-3 flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="50%"
                      height={"180px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <h6>{p.name}</h6>
                    <p>Price : ${p.price}</p>
                    <p>{p.description}...</p>
                    <button
                      className="btn btn-danger"
                      style={{ width: "90px" }}
                      onClick={() => removeCartItem(p._id)}
                    >
                      <RiDeleteBin5Line size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <div>
                <h5 className="text-center bg-warning p-2 mb-1">
                  CART SUMMARY
                </h5>
                <p>Total | Checkout | Payment</p>
                <hr />
                <p>
                  <b>Total</b>: {totalPrice()}{" "}
                </p>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h6>
                        Current Address : <p>{auth?.user?.address}</p>
                      </h6>

                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={!loading || !instance || auth?.user?.address}
                    >
                      {loading ? "Processing...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
