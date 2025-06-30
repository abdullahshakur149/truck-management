import React from "react";

export default function LabeledSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  ...props
}) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        {...props}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
