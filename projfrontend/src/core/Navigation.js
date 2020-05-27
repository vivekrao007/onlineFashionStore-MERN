import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  signout,
  isAuthenticated,
  isAdmin,
  isUser,
  userDetails,
} from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#02040F",
      fontWeight: "bold",
      borderBottom: "2px solid",
    };
  } else {
    return { color: "#002642" };
  }
};

export default withRouter(function Navigation({ history }) {
  const user = userDetails();
  const navbarLinks = document.getElementsByClassName("navbar-links")[0];
  function toggleButtonActive() {
    navbarLinks.classList.toggle("active");
  }
  return (
    <header className="header">
      <nav className="navbar">
        <div className="brand-title">
          <div>Online Store</div>
        </div>
        <a href="#" className="toggle-button" onClick={toggleButtonActive}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links">
          <ul>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                <i className="fas fa-home"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                <i className="fas fa-cart-arrow-down"></i> Cart
              </Link>
            </li>
            {isUser() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  {user.firstname}
                </Link>
              </li>
            )}
            {isAdmin() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Logout <i className="fas fa-sign-out-alt"></i>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
});
