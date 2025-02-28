import Link from "next/link";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center p-4">
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
        </nav>
    );
}
