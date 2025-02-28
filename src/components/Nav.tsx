import Link from "next/link";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center py-4 px-8 border-b">
            <Link href="/" className="text-2xl font-bold">User Posts</Link>
            <Link href="/posts">Posts</Link>
        </nav>
    );
}
