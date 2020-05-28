import React from "react";
import { API } from "../../backend";

export default function ImageHelper({ product }) {
  const imageURL = product ? `${API}/product/image/${product._id}` : "";
  return (
    <img
      src={imageURL}
      alt="photo"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  );
}
