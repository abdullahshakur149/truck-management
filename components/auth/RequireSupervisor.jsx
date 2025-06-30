"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ClipLoader } from "react-spinners";

export default function RequireSupervisor({ children }) {
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let unsubscribe;
    setChecking(true);
    setError("");
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/Onboarding/login");
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const profile = docSnap.data();
          if (profile.role !== "supervisor") {
            setError(
              "Access denied: You must be a supervisor to view this page."
            );
          }
        } else {
          setError("User profile not found.");
        }
      } catch {
        setError("Failed to check user role.");
      } finally {
        setChecking(false);
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center py-16">
        <ClipLoader size={32} color="#2563eb" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-600 text-center py-16 text-lg font-semibold">
        {error}
      </div>
    );
  }
  return <>{children}</>;
}
