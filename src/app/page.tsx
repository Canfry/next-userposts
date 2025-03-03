import { getPosts } from "@/db/postQueries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PostsRecord } from "@/xata";
import PostCards from "@/components/PostCards";
import Link from "next/link";
export default async function Home() {
  const { userId } = await auth();
  console.log(userId);

  const user = await currentUser();
  console.log(user?.id);


  const posts: PostsRecord[] = await getPosts();
  console.log(posts);

  return (
    <div className="flex-1 flex-col items-start justify-start h-screen overflow-y-auto w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SignedOut>
        <h1 className="text-2xl font-bold">Please sign in to see the posts</h1>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-4xl font-bold mb-4">List of my posts</h1>
          <Link href="/newPost" className="cursor-pointer">
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer">
              Create Post
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-start justify-start gap-16 pt-8">
          {posts.length === 0 ? (
            <h1 className="text-2xl font-bold">No posts to display</h1>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="flex flex-col items-start justify-start gap-4 shadow-xl shadow-gray-900 border-2 border-gray-900 rounded-md p-4 w-full hover:scale-101 transition-all duration-300 cursor-pointer">
                <PostCards post={post} />
              </div>
            ))
          )}

        </div>
      </SignedIn>
      {/* </div> */}

    </div>
  );
}
