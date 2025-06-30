import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loader({
  size = 32,
  color = "#2563eb",
  className = "",
}) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <ClipLoader size={size} color={color} />
    </div>
  );
}
