"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100 animate-fade-in"
    >
      <div className="flex flex-col items-center mb-6">
        <Link href="/" className="mb-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#2563eb" />
            <path
              d="M16 24h16M24 16l8 8-8 8"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-blue-700">Login</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
      </div>
      {error && (
        <div className="mb-4 text-red-600 text-sm text-center animate-shake">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-600 text-sm text-center animate-fade-in">
          {success}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? <ClipLoader size={22} color="#fff" /> : "Login"}
      </button>
      <div className="flex justify-between mt-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
        <Link
          href="/Onboarding/register"
          className="text-blue-600 hover:underline"
        >
          Don&apos;t have an account?
        </Link>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease both;
        }
        @keyframes shake {
          10%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          80% {
            transform: translateX(4px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-8px);
          }
          40%,
          60% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </form>
  );
}
