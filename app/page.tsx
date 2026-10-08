import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import { getMembers } from "@/lib/members";

export default async function HomePage() {
  const members = await getMembers();

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "active"
  ).length;

  const pendingInvites = members.filter(
    (member) => member.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            Overview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your members and invitations.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          <DashboardCard
            label="Total Members"
            value={totalMembers}
            description="All registered members"
          />

          <DashboardCard
            label="Active Members"
            value={activeMembers}
            description="Currently active"
          />

          <DashboardCard
            label="Pending Invites"
            value={pendingInvites}
            description="Awaiting acceptance"
          />
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Members
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View and manage all members.
              </p>
            </div>

            <Link
              href="/members"
              className="inline-flex w-fit rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View all members
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

type DashboardCardProps = {
  label: string;
  value: number;
  description: string;
};

function DashboardCard({
  label,
  value,
  description,
}: DashboardCardProps) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-3 text-4xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </article>
  );
}