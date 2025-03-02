import Link from "next/link";

import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export default function Nav() {
    return (
        <ClerkProvider>
            <nav className="flex justify-between items-center py-4 px-8 border-b w-full">
                <Link href="/" className="text-2xl font-bold">User Posts</Link>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-300 transition-colors cursor-pointer text-black">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer">
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
