import React, { useState, useEffect } from "react";
import "./Form/SearchInput.css";
import { NavLink, Link } from "react-router-dom";
import { BsBagHeartFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";
import { Badge } from "antd";
import { LuLayoutDashboard } from "react-icons/lu";
import useCategory from "../../hooks/useCategory";
import { FaUserPlus } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyle = {
    backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.3)" : "transparent",
    transition: "background-color 0.3s ease",
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // return (
  //   <nav className="navbar navbar-expand-lg sticky-top" style={headerStyle}>
  //     <div className="container-fluid">
  //       <Link to="/" className="navbar-brand" style={{ color: "#00b300" }}>
  //         <img
  //           src="/images/bnlogo.jpeg"
  //           alt="Bharadwaj Nursery Logo"
  //           style={{ width: "90px", height: "70px", marginRight: "10px" }}
  //         />
  //       </Link>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarTogglerDemo01"
  //         aria-controls="navbarTogglerDemo01"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon" />
  //       </button>
  //       <div
  //         className="collapse navbar-collapse justify-content-center"
  //         id="navbarTogglerDemo01"
  //       >
  //         <ul className="navbar-nav mb-2 mb-lg-0">
  //           <li className="nav-item dropdown">
  //             <Link
  //               className="nav-link dropdown-toggle"
  //               to={"/categories"}
  //               data-bs-toggle="dropdown"
  //               style={{ color: "#ED9121", fontSize: "1rem" }}
  //             >
  //               💚 Shop By Category
  //             </Link>
  //             <ul className="dropdown-menu">
  //               <li>
  //                 <Link className="dropdown-item" to={"/categories"}>
  //                   All Plants
  //                 </Link>
  //               </li>
  //               {categories?.map((c) => (
  //                 <li key={c.id}>
  //                   <Link className="dropdown-item" to={`/category/${c.slug}`}>
  //                     {c.name}
  //                   </Link>
  //                 </li>
  //               ))}
  //             </ul>
  //           </li>
  //         </ul>

  //         <div className="d-flex align-items-center mx-3">
  //           <SearchInput />
  //         </div>

  //         <ul className="navbar-nav mb-2 mb-lg-0">
  //           <li className="nav-item">
  //             <NavLink to="/" className="nav-link" activeClassName="active">
  //               <HiHome size={20} color="#ED9121" />
  //             </NavLink>
  //           </li>

  //           <li className="nav-item">
  //             <NavLink to="/cart" className="nav-link" activeClassName="active">
  //               <Badge count={cart?.length} showZero>
  //                 <BsBagHeartFill size={20} color="#ED9121" />
  //               </Badge>
  //             </NavLink>
  //           </li>

  //           {!auth.user ? (
  //             <>
  //               <li className="nav-item">
  //                 <NavLink
  //                   to="/signup"
  //                   className="nav-link"
  //                   activeClassName="active"
  //                 >
  //                   Sign Up
  //                 </NavLink>
  //               </li>
  //               <li className="nav-item">
  //                 <NavLink
  //                   to="/login"
  //                   className="nav-link"
  //                   activeClassName="active"
  //                 >
  //                   <GrUserAdmin size={20} color="#ED9121" /> Login
  //                 </NavLink>
  //               </li>
  //             </>
  //           ) : (
  //             <>
  //               <li className="nav-item dropdown">
  //                 <NavLink
  //                   className="nav-link dropdown-toggle"
  //                   activeClassName="active"
  //                   href="#"
  //                   role="button"
  //                   data-bs-toggle="dropdown"
  //                   aria-expanded="false"
  //                 >
  //                   <RiAccountPinCircleFill size={20} color="#ED9121" />{" "}
  //                   {auth?.user?.name}
  //                 </NavLink>
  //                 <ul className="dropdown-menu">
  //                   <li>
  //                     <NavLink
  //                       to={`/dashboard/${
  //                         auth?.user?.role === 1 ? "admin" : "user"
  //                       }`}
  //                       className="dropdown-item"
  //                     >
  //                       <LuLayoutDashboard size={20} color="#ED9121" />{" "}
  //                       Dashboard
  //                     </NavLink>
  //                   </li>
  //                   <li>
  //                     <NavLink
  //                       onClick={handleLogout}
  //                       to="/login"
  //                       className="dropdown-item"
  //                     >
  //                       <RiAdminLine size={20} color="#ED9121" /> Logout
  //                     </NavLink>
  //                   </li>
  //                 </ul>
  //               </li>
  //             </>
  //           )}
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>
  // );

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={headerStyle}>
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          style={{ color: "#00b300" }}
        >
          <img
            src="/images/bnlogo.jpeg"
            alt="Bharadwaj Nursery Logo"
            style={{ width: "90px", height: "70px", marginRight: "10px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <div className="d-flex justify-content-center w-100">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: "#ED9121", fontSize: "1rem" }}
                >
                  💚 Shop By Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Plants
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="d-flex align-items-center mx-3">
              <SearchInput />
            </div>
          </div>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item mx-2">
              <NavLink
                to="/"
                className="nav-link d-flex align-items-center"
                activeClassName="active"
              >
                <HiHome size={20} color="#ED9121" />
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                to="/cart"
                className="nav-link d-flex align-items-center"
                activeClassName="active"
              >
                <Badge count={cart?.length} showZero>
                  <BsBagHeartFill size={20} color="#ED9121" />
                </Badge>
              </NavLink>
            </li>

            {!auth.user ? (
              <>
                {/*
                <li className="nav-item mx-2">
                <NavLink
                  to="/signup"
                  className="nav-link d-flex align-items-center"
                  activeClassName="active"
                >
                  <FaUserPlus
                    size={20}
                    color="#ED9121"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Signup
                </NavLink>
              </li>
              */}
                <li className="nav-item mx-2 d-flex align-items-center">
                  <NavLink
                    to="/login"
                    className="nav-link d-flex align-items-center"
                    activeClassName="active"
                  >
                    <RiLoginCircleFill
                      size={20}
                      color="#ED9121"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown mx-2">
                  <NavLink
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    activeClassName="active"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <RiAccountPinCircleFill
                      size={20}
                      color="#ED9121"
                      style={{ marginRight: "5px" }}
                    />
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <LuLayoutDashboard
                          size={20}
                          color="#ED9121"
                          style={{ marginRight: "5px" }}
                        />
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item d-flex align-items-center"
                      >
                        <IoLogOutSharp
                          size={20}
                          color="#ED9121"
                          style={{ marginRight: "5px" }}
                        />
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
