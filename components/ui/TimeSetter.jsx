import React from "react";

export default function TimeSetter({
  label,
  time,
  onSet,
  onClear,
  set,
  otherSet,
  error,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={time ? new Date(time).toLocaleTimeString() : ""}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          placeholder="Not set"
        />
        <button
          type="button"
          onClick={onSet}
          disabled={set || otherSet}
          className="px-3 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50"
        >
          Set
        </button>
        {set && (
          <button
            type="button"
            onClick={onClear}
            className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Clear
          </button>
        )}
      </div>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
