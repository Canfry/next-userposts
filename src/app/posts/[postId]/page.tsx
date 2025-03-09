import { getPost } from "@/db/postQueries";
import Link from "next/link";


export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;

    const post = await getPost(postId);
    return (
        <>
            <div>
                <h1>Post {postId}</h1>
                <p>{post?.title}</p>
                <p>{post?.body}</p>
            </div>
            <Link href="/">Back to posts</Link>
        </>
    )
}