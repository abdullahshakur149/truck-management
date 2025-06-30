import React from "react";
import TripTicketTable from "@/components/dashboard/TripTicketTable";
import Link from "next/link";

export default function TripTicketTablePage() {
  return (
    <div className="w-full py-8 px-2 md:px-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center mb-6 text-blue-700 hover:text-blue-900 font-medium transition group"
      >
        <svg
          className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" stroke="currentColor" />
        </svg>
        Back to Dashboard
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        All Trip Tickets
      </h1>
      <TripTicketTable />
    </div>
  );
}
