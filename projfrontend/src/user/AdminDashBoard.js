import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

export default function AdminDashBoard() {
  const {
    user: { firstname, email },
  } = isAuthenticated();

  function leftSection() {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/Categories" className="nav-link text-info">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  function rightSection() {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-info mr-2">First Name :</span>
            {firstname}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr-2">Email :</span>
            {email}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <Base
      title="admin dashboard"
      description="manage products"
      className="container bg-info p-4"
    >
      <div className="row">
        <div className="col-3">{leftSection()}</div>
        <div className="col-9">{rightSection()}</div>
      </div>
    </Base>
  );
}
