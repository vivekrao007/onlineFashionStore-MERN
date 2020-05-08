import React from "react";
import Navigation from "./Navigation";

export default function Base({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <Navigation></Navigation>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center pb-0">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>if you got any question feel free to reach out</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">amazing place to buy THINGS !!</span>
        </div>
      </footer>
    </div>
  );
}
