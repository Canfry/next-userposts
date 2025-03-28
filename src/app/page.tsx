import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import SearchPost from "@/components/SearchPost";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex-1 flex-col items-start justify-start h-screen overflow-y-auto w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] scroll-smooth">
      <SignedOut>
        <h1 className="text-2xl font-bold text-gray-200">
          Please sign in to see the posts
        </h1>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-4xl font-bold text-white">My Posts</h1>
          <Link href="/newPost" className="cursor-pointer">
            <button className="bg-[#1a1a2e] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-900/50 transition-colors border border-purple-800/30 hover:border-purple-500/50">
              Create Post
            </button>
          </Link>
        </div>
        <SearchPost userId={userId as string} />
      </SignedIn>
    </div>
  );
}
