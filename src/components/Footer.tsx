import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="https://xata.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity text-white font-semibold"
          >
            Xata.io
          </Link>
          <span className="text-white/40">×</span>
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity text-white font-semibold"
          >
            Next.js
          </Link>
          <span className="text-white/40">×</span>
          <Link
            href="https://clerk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity text-white font-semibold"
          >
            Clerk
          </Link>
        </div>
        <p className="text-sm text-white/60">Made by Christophe Anfry</p>
      </div>
    </footer>
  );
}
