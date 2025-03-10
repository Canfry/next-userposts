import { getPost } from "@/db/postQueries";
import Link from "next/link";


export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;

    const post = await getPost(postId);
    return (
        <>
            <div className="flex-1 flex-col items-start justify-start h-screen overflow-y-auto w-full p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <h1 className="text-4xl font-bold mb-10">{post?.title}</h1>
                <p className="text-lg">{post?.body}</p>
            </div>
            <Link href="/" className="text-blue-500 px-20">&larr; Back to posts</Link>
        </>
    )
}