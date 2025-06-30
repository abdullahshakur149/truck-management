import React from "react";
import { ClipLoader } from "react-spinners";

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      disabled={loading}
      className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition text-lg disabled:opacity-50"
      {...props}
    >
      {loading ? <ClipLoader size={22} color="#fff" /> : children}
    </button>
  );
}
