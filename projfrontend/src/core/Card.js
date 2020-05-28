import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import addItemToCart, { removeItemFromCart } from "./helper/CartHelper";

export default function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  function addProductToCart() {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  }
  function getRedirect(redirect) {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  }
  return (
    <div className="card">
      <ImageHelper product={product} />
      <div className="card-content">
        {/* <ImageHelper product={product} /> */}
        <div className="row m-0">
          <div className="col-12">
            <strong>
              <h5>{product.name}</h5>
            </strong>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12 text-secondary">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="row m-0">
          <div className="col">
            <p className="product-price">${product.price}</p>
          </div>
        </div>

        <div className="row m-0">
          <div className="col-12 card-button-group">
            <button className="btn btn-sm card-btn">
              Add to Cart <i class="fas fa-cart-plus"></i>
            </button>
            {addToCart && (
              <button
                onClick={addProductToCart}
                className="btn btn-sm card-btn"
              >
                Buy Now <i className="fas fa-external-link-alt"></i>
              </button>
            )}
            {getRedirect(redirect)}
          </div>
          <div className="col-12">
            {removeFromCart && (
              <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
