import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";
import goHome from "./goHome";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const { user, token } = isAuthenticated();
  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };
  const submitForm = (event) => {
    event.preventDefault();
    setError(false);
    createCategory(user.id, token, { name }).then((res) => {
      if (res.err) {
        setError(true);
        setMessage(res.err);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };
  function categoryForm() {
    return (
      <form>
        <div className="form-group">
          <p className="lead pt-1">Enter the Category</p>
          {errorMessage()}
          {successMessage()}
          <input
            type="text"
            className="form-control mb-3"
            autoFocus
            required
            placeholder="Ex. Summer"
            onChange={handleChange}
            value={name}
          />
          <button className="btn btn-outline-info" onClick={submitForm}>
            Create Category
          </button>
        </div>
      </form>
    );
  }
  function successMessage() {
    if (success) {
      return (
        <div>
          <small className="text-success">category created sucessfully</small>
        </div>
      );
    }
  }
  function errorMessage() {
    if (error) {
      return (
        <div>
          <small className="text-danger">{message}</small>
        </div>
      );
    }
  }

  return (
    <Base
      title="Create Category"
      description="Add new category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-1"></div>
        {goHome()}
        <div className="col-md-8">{categoryForm()}</div>
      </div>
    </Base>
  );
}
