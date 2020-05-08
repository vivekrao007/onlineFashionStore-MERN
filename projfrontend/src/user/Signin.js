import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
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
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          {loadingMessage()}
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div>
              <button className="btn btn-success btn-block" onClick={submit}>
                Submit
              </button>
            </div>
          </form>
          {errorMessage()}
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
      <div
        className="alert alert-danger mt-2"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  }
  return (
    <Base title="signin page" description="page for user to sign in">
      {signInForm()}
      {redirect()}
    </Base>
  );
}
