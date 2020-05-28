import React from "react";
import Navigation from "./Navigation";

export default function Base({ children }) {
  return (
    <div>
      <Navigation></Navigation>
      <div className="container">
        <div>{children}</div>
      </div>
      {/* <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>if you got any question feel free to reach out</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">amazing place to buy THINGS !!</span>
        </div>
      </footer> */}
    </div>
  );
}
