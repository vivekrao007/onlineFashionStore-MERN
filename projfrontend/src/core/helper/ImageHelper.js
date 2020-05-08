import React, { Component } from "react";
import { API } from "../../backend";

export default function ImageHelper({ product }) {
  const imageURL = product ? `${API}/product/image/${product._id}` : "";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}
