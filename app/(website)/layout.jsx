import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center px-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
