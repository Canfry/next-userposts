import { getPosts } from "@/db/postQueries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
// import { PostsRecord } from "@/xata";
import { auth, currentUser } from "@clerk/nextjs/server";
import CreatePostForm from "@/components/CreatePostForm";

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
    <div className="flex flex-col items-start justify-start h-screen w-full">
      <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* <h1 className="text-2xl font-bold">List of my posts</h1> */}
        <SignedOut>
          <h1 className="text-2xl font-bold">Please sign in to see the posts</h1>
        </SignedOut>
        <SignedIn>
          {posts.length === 0 ? (
            <h1 className="text-2xl font-bold">No posts to display</h1>
          ) : (
            posts.map((post) => (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))
          )}
          <CreatePostForm />
        </SignedIn>
      </div>

    </div>
  );
}
