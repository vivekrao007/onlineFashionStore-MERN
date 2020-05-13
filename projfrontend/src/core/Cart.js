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

  function loadAllProducts() {
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
    <Base title="Cart">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
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
