import React from "react";
import UserProfile from "@/components/dashboard/UserProfile";
import {
  ClipboardDocumentListIcon,
  FireIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Trip Ticket Register",
    description: "Manage and track all your fleet's trip tickets efficiently.",
    icon: ClipboardDocumentListIcon,
    href: "/dashboard/trip-tickets",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Diesel Logs",
    description:
      "Log diesel usage and monitor fuel expenses for your vehicles.",
    icon: FireIcon,
    href: "/dashboard/diesel-logs",
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Fuel KPI Comparison",
    description: "Compare key fuel performance indicators across your fleet.",
    icon: ChartBarIcon,
    href: "/dashboard/fuel-kpi",
    color: "bg-green-100 text-green-700",
  },
];

export default function DashboardHome() {
  return (
    <div className="w-full max-w-full px-2 sm:px-4 md:px-8 mx-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <UserProfile />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-2 mt-6 sm:mt-10 text-center md:text-left">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg text-center md:text-left">
        Get a quick overview and manage your fleet operations with ease.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {features.map(({ title, description, icon: Icon, href, color }) => (
          <a
            key={title}
            href={href}
            className={`w-full flex flex-col items-center p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl shadow hover:shadow-xl transition bg-white border border-gray-100 hover:-translate-y-1 ${color}`}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4" />
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-center">
              {title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base text-center mb-1 sm:mb-2">
              {description}
            </p>
            <span className="mt-2 sm:mt-3 md:mt-4 text-blue-700 font-medium hover:underline text-xs sm:text-sm md:text-base">
              Go to {title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
