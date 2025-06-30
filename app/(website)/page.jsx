"use client";
import React from "react";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    id: "trip-ticket",
    icon: (
      <svg
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="5" y="10" width="30" height="20" rx="5" fill="#1e293b" />
        <rect x="10" y="15" width="20" height="10" rx="2" fill="#f8fafc" />
        <circle cx="12" cy="30" r="3" fill="#0ea5e9" />
        <circle cx="28" cy="30" r="3" fill="#0ea5e9" />
      </svg>
    ),
    title: "Trip Ticket Register",
    description:
      "Easily manage and record all your trip tickets for efficient fleet tracking and compliance.",
    cta: "Register Trip",
    href: "/Onboarding/register",
  },
  {
    id: "diesel-log",
    icon: (
      <svg
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="12" y="8" width="16" height="24" rx="4" fill="#2563eb" />
        <rect x="16" y="14" width="8" height="10" rx="2" fill="#fff" />
        <circle cx="20" cy="30" r="3" fill="#2563eb" />
      </svg>
    ),
    title: "Diesel Log",
    description:
      "Log diesel usage, monitor fuel expenses, and optimize your fleet's fuel efficiency.",
    cta: "Log Diesel",
    href: "/Onboarding/login",
  },
  {
    id: "fuel-kpi",
    icon: (
      <svg
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="20" width="6" height="12" rx="2" fill="#2563eb" />
        <rect x="17" y="12" width="6" height="20" rx="2" fill="#60a5fa" />
        <rect x="26" y="6" width="6" height="26" rx="2" fill="#93c5fd" />
      </svg>
    ),
    title: "Fuel KPI Comparison",
    description:
      "Compare key fuel performance indicators across your fleet to drive cost savings and sustainability.",
    cta: "Compare KPIs",
    href: "/Onboarding/login",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="w-full max-w-5xl mx-auto text-center py-20 relative">
        {/* Decorative SVG background */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-30"
          width="600"
          height="200"
          viewBox="0 0 600 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="300" cy="100" rx="280" ry="80" fill="#2563eb" />
        </svg>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg animate-fade-in">
          Welcome to Truck Management
        </h1>
        <p className="text-lg text-gray-600 mb-10 animate-fade-in delay-100">
          Your all-in-one platform for managing trip tickets, diesel logs, and
          fuel KPIs. Streamline your fleet operations with ease and efficiency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in-up delay-200">
          {services.map((service, i) => (
            <div
              key={service.id}
              style={{ animationDelay: `${i * 100 + 300}ms` }}
              className="animate-fade-in-up"
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </section>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease both;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
}
