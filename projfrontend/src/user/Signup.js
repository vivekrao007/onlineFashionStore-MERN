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
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange("firstname")}
                value={firstname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <div>
              <button className="btn btn-success btn-block" onClick={submit}>
                Submit
              </button>
            </div>
          </form>
          {successMessage()}
          {errorMessage()}
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

  return (
    <Base title="signup page" description="page for user to sign up">
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}
