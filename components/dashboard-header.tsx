import Link from "next/link";
import LogoutButton from "@/components/logout-button";

export default function DashboardHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          Admin
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/members"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Members
          </Link>

          <Link
            href="/members/new"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Add Member
          </Link>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}