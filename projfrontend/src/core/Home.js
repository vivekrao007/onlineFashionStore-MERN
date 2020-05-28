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
    <Base>
      <div className="row mt-4">
        <div className="row m-0">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-3  mb-1">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
