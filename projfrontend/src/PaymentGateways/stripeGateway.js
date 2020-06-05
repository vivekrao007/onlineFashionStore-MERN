import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "../core/helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "../core/helper/OrderHelper";

export default function StripeGateway({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const userData = isAuthenticated();
  function finalPrice() {
    let amount = 0;
    amount = products.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);
    return amount;
  }
  function makePayment(token) {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "Aplication/json",
      "stripe-signature": JSON.stringify(body),
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (!res.status) {
          setData({
            ...data,
            error: res.raw.message,
            loading: false,
            success: false,
          });
        }
        if (res.status === "succeeded") {
          const orderData = {
            products: products,
            transaction_id: res.id,
            amount: res.amount / 100,
          };
          createOrder(userData.user.id, userData.token, orderData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          emptyCart(() => {
            //
          });
          setReload(!reload);
        }
      })
      .catch((err) => console.log("err : ", err));
  }
  function ShowStripeButton() {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        token={makePayment}
        amount={finalPrice() * 100}
        name="Complete Payment"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">Please Login</button>
      </Link>
    );
  }

  return (
    <div>
      <h2>pay with stripe</h2>
      <div>total amount : ${finalPrice()}</div>
      {ShowStripeButton()}
    </div>
  );
}
