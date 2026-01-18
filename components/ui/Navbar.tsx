import Link from "next/link";
import { Button } from "./button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          EduSmart 🎓
        </div>

        {/* Right Side Buttons */}
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
          <Link href="/login">
  <Button>Sign In</Button>
</Link>
        </div>
      </div>
    </nav>
  );
}