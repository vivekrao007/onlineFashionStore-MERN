import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import goHome from "./goHome";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

export default function UpdateProduct({ match }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
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
    photo,
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
    preload(match.params.productId);
  }, []);

  function preload(productId) {
    getProduct(productId).then((res) => {
      if (res.err) {
        setValues({ ...values, error: res.err });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: res.name,
          description: res.description,
          price: res.price,
          category: res.category._id,
          stock: res.stock,
          formData: new FormData(),
        });
      }
    });
  }
  //TODO: category is not getting selected after loading component
  function preloadCategories() {
    getAllCategories().then((res) => {
      if (res.err) {
        setValues({ ...values, error: res.err });
      } else {
        setValues({ categories: res, formData: new FormData() });
      }
    });
  }

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  function submit(e) {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user.id, token, formData)
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
            photo: "",
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
            product : "{createdProduct}" updated successfully
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
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
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
          Update Product
          {loadingSpinner()}
        </button>
        {successMessage()}
        {errorMessage()}
      </form>
    );
  }

  //
  return (
    <Base>
      <div className="row bg-white rounded">
        <div className="col-md-1"></div>
        {goHome()}
        <div className="col-md-8">{createProductForm()}</div>
      </div>
    </Base>
  );
}
