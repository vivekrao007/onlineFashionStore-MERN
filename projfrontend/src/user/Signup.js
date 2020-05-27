import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

export default function Signup() {
  const [values, setValues] = useState({
    firstname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { firstname, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstname, email, password })
      .then((res) => {
        if (res.err) {
          setValues({ ...values, error: res.err });
        } else {
          setValues({
            ...values,
            firstname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  function signUpForm() {
    return (
      <div className="connect-box">
        <div className="connect-box-content">
          <div className="connect-box-header">
            <h2>
              Register <i className="fas fa-sign-in-alt fa-xs"></i>
            </h2>
          </div>
          <form>
            <div className="connect-box-input-group">
              <label className="star">Name</label>
              <input
                type="text"
                onChange={handleChange("firstname")}
                value={firstname}
                placeholder="enter firstname"
              />
            </div>
            <div className="connect-box-input-group">
              <label className="star">Email</label>
              <input
                type="email"
                onChange={handleChange("email")}
                value={email}
                placeholder="enter email"
              />
            </div>
            <div className="connect-box-input-group">
              <label className="star">Password</label>
              <input
                type="password"
                onChange={handleChange("password")}
                value={password}
                placeholder="enter password"
              />
            </div>
            <div>
              <button
                className="btn connect-box-btn-submit btn-block"
                onClick={submit}
              >
                Register <i className="fas fa-user-plus fa-xs"></i>
              </button>
            </div>
          </form>
          {successMessage()}
          {errorMessage()}
          <div>
            <p>have an account ? </p>
            <h6>
              <Link to="/signin">
                Login Here <i className="fas fa-external-link-alt"></i>
              </Link>
            </h6>
          </div>
        </div>
      </div>
    );
  }

  function successMessage() {
    return (
      <div
        className="alert alert-success mt-2"
        style={{ display: success ? "" : "none" }}
      >
        New account is created sucessfully. <Link to="/signin">Login here</Link>
      </div>
    );
  }

  function errorMessage() {
    return (
      <div
        className="alert alert-danger mt-2"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  }

  return <Base>{signUpForm()}</Base>;
}
