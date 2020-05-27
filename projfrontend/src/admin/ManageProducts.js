import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import goHome from "./goHome";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  function preload() {
    getAllProducts()
      .then((res) => {
        if (res.err) {
          console.log(res.err);
        } else {
          setProducts(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeProduct(productId) {
    deleteProduct(productId, user.id, token)
      .then((res) => {
        if (res.err) {
          console.log(res.err);
        } else {
          preload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //
  //TODO:work on update category
  return (
    <Base>
      <div className="row">
        <div className="col-3 offset-2">{goHome()}</div>
      </div>

      <div className="row">
        <div className="col-5 offset-2">
          <h4>All products:</h4>
        </div>
        <div className="col-3 offset-1">
          <h6 className="text-center text-white">
            Total{" "}
            <span className="text-info font-italic font-weight-bold">
              {products.length}
            </span>{" "}
            Products
          </h6>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <table className="table table-striped bg-light table-bordered">
            <thead className="thead-info">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Price $</th>
                <th scope="col">Stock</th>
                <th scope="col">edit</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-success"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `do you want to delete product "${product.name.toUpperCase()}"`
                            )
                          ) {
                            removeProduct(product._id);
                          }
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
}
