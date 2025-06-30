"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardDocumentListIcon,
  FireIcon,
  ChartBarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  {
    label: "Trip Ticket Register",
    icon: ClipboardDocumentListIcon,
    dropdown: [
      { label: "Register Trip", href: "/dashboard/trip-tickets" },
      { label: "View Trips", href: "/dashboard/trip-tickets/table" },
    ],
  },
  {
    label: "Diesel Logs",
    href: "/dashboard/diesel-logs",
    icon: FireIcon,
  },
  {
    label: "Fuel KPI Comparison",
    href: "/dashboard/fuel-kpi",
    icon: ChartBarIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <aside className="h-screen w-72 bg-gradient-to-b from-white via-blue-50 to-gray-100 border-r border-gray-200 flex flex-col py-8 px-6 shadow-xl">
      <div className="mb-10 flex items-center gap-3 px-2">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#2563eb" />
          <path
            d="M16 24h16M24 16l8 8-8 8"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">
          Dashboard
        </span>
      </div>
      <div className="mb-4 mt-2 text-xs font-semibold text-gray-500 tracking-widest uppercase px-2">
        Main Menu
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) =>
          item.dropdown ? (
            <div key={item.label} className="relative">
              <button
                className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-colors group w-full text-left ${
                  openDropdown ||
                  item.dropdown.some((sub) => sub.href === pathname)
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-blue-50 text-gray-700"
                }`}
                onClick={() => setOpenDropdown((open) => !open)}
                aria-expanded={openDropdown}
              >
                <span className="p-2 rounded-lg text-blue-600 bg-blue-50 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </span>
                <span className="text-base font-semibold tracking-tight flex-1">
                  {item.label}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 ml-auto transition-transform ${
                    openDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown && (
                <div className="ml-10 mt-1 flex flex-col gap-1">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`block px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                        pathname === sub.href
                          ? "bg-blue-200 text-blue-800"
                          : "hover:bg-blue-100 text-blue-700"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-colors group ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <span
                className={`p-2 rounded-lg text-orange-600 bg-orange-50 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-6 h-6" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                {item.label}
              </span>
            </Link>
          )
        )}
      </nav>
      <div className="flex-1" />
      <div className="border-t border-gray-200 mt-8 pt-6 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Truck Management
        <br />
        All rights reserved.
      </div>
    </aside>
  );
}
