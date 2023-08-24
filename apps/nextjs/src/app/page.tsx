import Link from "next/link";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center">
      <span>Home Page</span>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </main>
  );
}
