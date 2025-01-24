"use client";

import { useState } from "react";

import {
  SignInButton,
  SignedOut,
  SignedIn,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";

import { getCurrentUser } from "./actions";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    firstName: string | null;
    lastName: string | null;
  } | null>(null);

  const handleClick = () => {
    getCurrentUser().then(
      (data) => {
        setData({
          firstName: data.firstName ?? null,
          lastName: data.lastName ?? null,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  return (
    <main className="p-6 w-full flex flex-col gap-4 max-w-6xl ">
      {/* Signed Out */}
      <SignedOut>
        <h1 className="text-2xl font-bold">You are currently signed out</h1>
        <div className="flex gap-2 justify-center">
          <SignInButton mode="modal">
            <div className="bg-gray-500 cursor-pointer text-white w-32 py-2 rounded-lg text-center">
              Sign In
            </div>
          </SignInButton>
          <SignUpButton mode="modal">
            <div className="bg-teal-500 cursor-pointer text-white w-32 py-2 rounded-lg text-center">
              Sign Up
            </div>
          </SignUpButton>
        </div>
      </SignedOut>

      {/* Signed In */}
      <SignedIn>
        <h1 className="text-2xl font-bold">You are currently signed in</h1>
        {data && (
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-xl font-bold">
              Your name (from server action)
            </h2>
            <p className="text-lg">
              {data.firstName} {data.lastName}
            </p>
          </div>
        )}
        {error && <p className="text-red-500 text-lg">Error: {error}</p>}
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white w-32 py-2 rounded-lg text-center"
        >
          Call server action
        </button>
        <SignOutButton>
          <div className="bg-gray-500 cursor-pointer text-white w-32 py-2 rounded-lg text-center">
            Sign Out
          </div>
        </SignOutButton>
      </SignedIn>
    </main>
  );
}
