import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import MembersTable from "@/components/members-table";
import { getMembers } from "@/lib/members";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Directory
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Members
            </h1>

            <p className="mt-2 text-gray-600">
              Search, filter and manage your members.
            </p>
          </div>

          <Link
            href="/members/new"
            className="inline-flex w-fit rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Add member
          </Link>
        </div>

        <MembersTable members={members} />
      </main>
    </div>
  );
}