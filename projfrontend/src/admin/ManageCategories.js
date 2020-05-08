import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import goHome from "./goHome";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);
  function preload() {
    getAllCategories().then((res) => {
      if (res.err) {
        console.log(res.err);
      } else {
        setCategories(res);
      }
    });
  }
  function removeCategory(categoryId) {
    deleteCategory(categoryId, user.id, token)
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
  const updateCategory = (e) => (categoryId) => {
    e.preventDefault();
  };
  return (
    <Base title="Welcome admin" description="Manage categories here">
      <div className="row">
        <div className="col-3 offset-2">{goHome()}</div>
      </div>

      <div className="row">
        <div className="col-5 offset-2">
          <h4>All categories:</h4>
        </div>
        <div className="col-3 offset-1">
          <h6 className="text-center text-white">
            Total{" "}
            <span className="text-info font-italic font-weight-bold">
              {categories.length}
            </span>{" "}
            categories
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
                <th scope="col">edit</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    {<td>{category.name}</td>}
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => {
                          updateCategory(category._id);
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `do you want to delete category "${category.name.toUpperCase()}"`
                            )
                          ) {
                            removeCategory(category._id);
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
