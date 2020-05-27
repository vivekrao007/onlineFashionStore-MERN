import React, { useState, useEffect } from "react";
import Base from "./Base";
import { loadCart } from "./helper/CartHelper";
import Card from "./Card";
import StripeGateway from "../PaymentGateways/stripeGateway";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  function loadAllProducts(products) {
    return (
      <div>
        <h2>load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  }
  function loadCheckout() {
    return (
      <div>
        <h2>for checkout</h2>
      </div>
    );
  }

  return (
    <Base>
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h2>no products in cart</h2>
          )}
        </div>
        <div className="col-6">
          <StripeGateway
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
}
