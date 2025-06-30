"use client";

import React, { useState } from "react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between py-6 px-8 bg-white shadow-md relative z-20">
      <div className="text-2xl font-bold text-blue-700">Truck Management</div>
      <nav className="flex items-center">
        <div className="relative ml-6">
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition focus:outline-none flex items-center gap-2"
          >
            Sign In / Sign Up
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 animate-fade-in z-30">
              <a
                href="/Onboarding/login"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                Login
              </a>
              <a
                href="/Onboarding/register"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                Signup
              </a>
            </div>
          )}
        </div>
      </nav>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease both;
        }
      `}</style>
    </header>
  );
};

export default Header;
