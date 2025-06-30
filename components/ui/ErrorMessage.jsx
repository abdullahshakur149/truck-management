import React from "react";

export default function ErrorMessage({ children, className = "" }) {
  return (
    <div className={`text-red-600 text-center py-8 ${className}`}>
      {children}
    </div>
  );
}
