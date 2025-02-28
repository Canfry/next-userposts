import { getPosts } from "@/db/postQueries";

export default async function Home() {
  // const post = await createPost({
  //   title: "My second post",
  //   body: "This is my second post",
  // } as PostsRecord);

  const posts = await getPosts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">List of my posts</h1>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
