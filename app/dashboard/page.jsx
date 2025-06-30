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
    <div className="max-w-5xl mx-auto">
      <UserProfile />
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2 mt-12">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600 mb-10 text-lg">
        Get a quick overview and manage your fleet operations with ease.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ title, description, icon: Icon, href, color }) => (
          <a
            key={title}
            href={href}
            className={`flex flex-col items-center p-8 rounded-xl shadow-md hover:shadow-xl transition bg-white border border-gray-100 hover:-translate-y-1 ${color}`}
          >
            <Icon className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 text-center mb-2">{description}</p>
            <span className="mt-4 text-blue-700 font-medium hover:underline">
              Go to {title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
