import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

export default function Signin() {
  const [values, setValues] = useState({
    email: "tommy.shelby@gmail.com", //tommy.shelby@gmail.com //ter@gm.com
    password: "tommyshelby", //tommyshelby //test@123
    error: "",
    loading: false,
    redirected: false,
  });
  const { email, password, error, loading, redirected } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const submit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((res) => {
        if (res.err) {
          setValues({
            ...values,
            error: res.err,
            loading: false,
          });
        } else {
          authenticate(res, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              redirected: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const redirect = () => {
    //TODO: need to do rediretion
    if (redirected) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  function signInForm() {
    return (
      <div className="connect-box">
        {/* {loadingMessage()} */}
        <div className="connect-box-content">
          <div className="connect-box-header">
            <h2>
              Login <i className="fas fa-sign-in-alt fa-xs"></i>
            </h2>
          </div>
          <form>
            <div className="connect-box-input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={handleChange("email")}
                placeholder="enter your email"
              />
            </div>
            <div className="connect-box-input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                placeholder="enter your password"
              />
            </div>
            <div>
              <button
                className="btn btn-block connect-box-btn-submit"
                onClick={submit}
              >
                Login <i className="fas fa-arrow-circle-right fa-xs"></i>
              </button>
              {errorMessage()}
            </div>
          </form>

          <div>
            <p>Do not have an account ? </p>
            <h6>
              <Link to="/signup">
                create an account <i className="fas fa-external-link-alt"></i>
              </Link>
            </h6>
          </div>
        </div>
      </div>
    );
  }
  function loadingMessage() {
    return (
      loading && (
        <div className="alert alert-success mt-2">
          <h2>Loading...</h2>
        </div>
      )
    );
  }

  function errorMessage() {
    return (
      <span className="text-danger" style={{ display: error ? "" : "none" }}>
        {error}
      </span>
    );
  }
  return (
    <Base>
      {signInForm()}
      {redirect()}
    </Base>
  );
}
