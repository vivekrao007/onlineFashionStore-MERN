import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import goHome from "./goHome";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

export default function AddProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    image,
    categories,
    category,
    loading,
    error,
    product,
    formData,
    createdProduct,
  } = values;
  const { user, token } = isAuthenticated();
  useEffect(() => {
    preload();
  }, []);

  function preload() {
    getAllCategories().then((res) => {
      if (res.err) {
        setValues({ ...values, error: res.err });
      } else {
        setValues({ ...values, categories: res, formData: new FormData() });
        console.log(categories);
      }
    });
  }

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  function submit(e) {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user.id, token, formData)
      .then((res) => {
        if (res.err) {
          setValues({ ...values, error: res.err, loading: false });
        } else {
          setValues({
            ...values,
            error: "",
            name: "",
            description: "",
            price: "",
            image: "",
            stock: "",
            loading: false,
            createdProduct: res.name,
          });
        }
      })
      .catch();
  }

  function successMessage() {
    if (createdProduct) {
      return (
        <span>
          <h4 className="text-success ml-2">
            product : "{createdProduct}" created successfully
          </h4>
        </span>
      );
    }
  }

  function errorMessage() {
    if (error) {
      return (
        <span>
          <h6 className="text-danger ml-2">{error}</h6>
        </span>
      );
    }
  }
  function loadingSpinner() {
    if (loading) {
      return (
        <div
          className="spinner-border spinner-border-sm ml-2 mt-1 float-right"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }

  function createProductForm() {
    return (
      <form className="mt-3">
        <div className="form-group">
          <label className="btn btn-block btn-info">
            <input
              onChange={handleChange("image")}
              type="file"
              name="image"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="name"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="description"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>
            {categories.length > 0 &&
              categories.map((category, index) => {
                return (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={submit}
          className="btn btn-outline-info mb-3"
        >
          Create Product
          {loadingSpinner()}
        </button>
        {successMessage()}
        {errorMessage()}
      </form>
    );
  }

  //
  return (
    <Base
      title="Add Product"
      description="create new product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-1"></div>
        {goHome()}
        <div className="col-md-8">{createProductForm()}</div>
      </div>
    </Base>
  );
}
