"use client";
import React from "react";
import TripTicketForm from "@/components/dashboard/TripTicketForm";
import Link from "next/link";

export default function TripTicketsPage() {
  return (
    <div className="py-8 max-w-2xl mx-auto">
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
      <TripTicketForm />
    </div>
  );
}
