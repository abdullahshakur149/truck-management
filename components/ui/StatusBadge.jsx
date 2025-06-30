import React from "react";

const statusStyles = {
  completed: "bg-green-100 text-green-700",
  pending_arrival: "bg-yellow-100 text-yellow-700",
  default: "bg-gray-100 text-gray-700",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.default;
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
