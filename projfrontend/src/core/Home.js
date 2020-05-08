import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    LoadAllProducts();
  }, []);

  function LoadAllProducts() {
    getAllProducts().then((res) => {
      if (res.err) {
        setError(res.err);
      } else {
        setProducts(res);
      }
    });
  }

  return (
    <Base title="Home Page" description="just home page">
      <div className="row text-center">
        <h1 className="text-white">All Products</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4  mb-1">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
