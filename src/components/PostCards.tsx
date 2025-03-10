import { PostsRecord } from "@/xata";

export default function PostCards({ post }: { post: PostsRecord }) {
    return (
        <>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-gray-500">{post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}</p>
        </>
    );
}