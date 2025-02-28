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
            <nav className="flex justify-between items-center py-4 px-8 border-b">
                <Link href="/" className="text-2xl font-bold">User Posts</Link>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </ClerkProvider>
    );
}
