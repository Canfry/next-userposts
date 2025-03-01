import { getPosts } from "@/db/postQueries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
// import { PostsRecord } from "@/xata";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  console.log(userId);
  // const post = await createPost({
  //   title: "My second post",
  //   body: "This is my second post",
  //   userId: userId
  // } as PostsRecord);



  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);

  const posts = await getPosts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <h1 className="text-2xl font-bold">List of my posts</h1> */}
      <SignedOut>
        <h1 className="text-2xl font-bold">Please sign in to see the posts</h1>
      </SignedOut>
      <SignedIn>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </SignedIn>
    </div>
  );
}
