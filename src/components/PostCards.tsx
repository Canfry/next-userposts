
import { PostsRecord } from "@/xata";
import Link from "next/link";

export default function PostCards({ post, deletePost }: { post: PostsRecord, deletePost: (postId: string) => Promise<void> }) {

    return (
        <>
            <Link href={`/posts/${post.id}`} className="flex flex-col flex-1 items-start justify-center gap-4">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="text-gray-500">{post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}</p>
            </Link>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors" onClick={() => deletePost(post.id)}>
                Delete
            </button>
        </>
    );
}