"use client";
import React from "react";
import useUserProfile from "@/lib/hooks/useUserProfile";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ProfileInfo from "@/components/ui/ProfileInfo";

export default function UserProfile() {
  const { profile, loading, error } = useUserProfile();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  return <ProfileInfo profile={profile} />;
}
