import React from "react";
import { Link } from "react-router-dom";

export default function goHome() {
  return (
    <div className="mt-3 mr-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        &larr; admin home
      </Link>
    </div>
  );
}
