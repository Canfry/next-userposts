import Link from "next/link";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Nav() {
  return (
    <ClerkProvider>
      <nav className="flex justify-between items-center py-4 px-8 border-b w-full">
        <Link href="/" className="text-2xl font-bold">
          User Posts
        </Link>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-[#1a1a2e] text-white hover:bg-purple-900/50 transition-colors cursor-pointer border border-purple-800/30 hover:border-purple-500/50">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-purple-900 text-white hover:bg-purple-800 transition-colors cursor-pointer border border-purple-800/30 hover:border-purple-500/50">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </ClerkProvider>
  );
}
