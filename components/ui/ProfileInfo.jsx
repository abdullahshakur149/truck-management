import React from "react";

export default function ProfileInfo({ profile }) {
  if (!profile) return null;
  return (
    <div className="mt-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-2">
        Welcome{profile.name ? `, ${profile.name}` : "!"}
      </h2>
      <div className="text-gray-700 text-lg mb-1">
        <span className="font-semibold">Email:</span>{" "}
        <span className="font-medium text-gray-900">{profile.email}</span>
      </div>
      <div className="text-gray-700 text-lg mb-1">
        <span className="font-semibold">Role:</span>{" "}
        <span className="font-medium text-blue-700 uppercase tracking-wide">
          {profile.role}
        </span>
      </div>
      {profile.createdAt && (
        <div className="text-gray-700 text-lg">
          <span className="font-semibold">Joined:</span>{" "}
          <span className="font-medium text-gray-900">
            {profile.createdAt.toDate
              ? profile.createdAt.toDate().toLocaleString()
              : new Date(profile.createdAt).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
