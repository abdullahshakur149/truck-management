import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-4 md:px-8 border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        {onMenuClick && (
          <button
            className="md:hidden p-2 rounded hover:bg-blue-100"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Bars3Icon className="w-7 h-7 text-blue-700" />
          </button>
        )}
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#2563eb" />
          <path
            d="M16 24h16M24 16l8 8-8 8"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-lg font-bold text-blue-700">
          Truck Management
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* Custom default profile SVG */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#e5e7eb" />
          <circle cx="20" cy="16" r="7" fill="#cbd5e1" />
          <ellipse cx="20" cy="29" rx="10" ry="6" fill="#cbd5e1" />
        </svg>
      </div>
    </header>
  );
}
