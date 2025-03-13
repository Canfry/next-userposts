import { getPost, deletePost } from "@/db/postQueries";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";
import Form from "next/form";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const post = await getPost(postId);

  const handleDeletePost = async () => {
    "use server";
    await deletePost(postId);
  };

  return (
    <>
      <div className="flex-1 flex-col items-start justify-start h-screen overflow-y-auto w-full p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300 transition-colors mb-8 inline-block"
        >
          &larr; Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-10">{post?.title}</h1>
        <p className="text-lg">{post?.body}</p>
        <Form action={handleDeletePost}>
          <DeletePostButton />
        </Form>
      </div>
    </>
  );
}
