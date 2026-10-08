import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import AddMemberForm from "@/components/add-member-form";

export default function NewMemberPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/members"
          className="text-sm text-gray-600 underline"
        >
          ← Back to members
        </Link>

        <div className="mt-6 rounded-2xl border bg-white p-8">
          <div className="mb-8">
            <p className="text-sm text-gray-500">
              Member management
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Add member
            </h1>

            <p className="mt-2 text-gray-600">
              Add a new member to the directory.
            </p>
          </div>

          <AddMemberForm />
        </div>
      </main>
    </div>
  );
}