import {
  SignInButton,
  SignedOut,
  SignedIn,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

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
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl font-bold">Your name</h2>
          <p className="text-lg">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <SignOutButton>
          <div className="bg-gray-500 cursor-pointer text-white w-32 py-2 rounded-lg text-center">
            Sign Out
          </div>
        </SignOutButton>
      </SignedIn>
    </main>
  );
}
