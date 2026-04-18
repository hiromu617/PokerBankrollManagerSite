import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-zinc-100 mb-4">404</h1>
      <p className="text-zinc-300 mb-2">Page Not Found</p>
      <p className="text-zinc-400 mb-8 max-w-md">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded-md bg-zinc-800 hover:bg-zinc-700 px-6 py-3 text-zinc-100 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
