import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardHeader from "@/components/dashboard-header";
import DeleteMemberButton from "@/components/delete-member-button";
import { getMemberById } from "@/lib/members";

type MemberDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MemberDetailPage({
  params,
}: MemberDetailPageProps) {
  const { id } = await params;

  const member = await getMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6">
          <Link
            href="/members"
            className="text-sm text-gray-500 underline underline-offset-4"
          >
            ← Back to members
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Member details
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                {member.name}
              </h1>

              <p className="mt-2 text-gray-600">
                {member.email}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/members/${member.id}/edit`}
                className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Edit member
              </Link>

              <DeleteMemberButton
                memberId={member.id}
                memberName={member.name}
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <DetailItem
              label="Email"
              value={member.email}
            />

            <DetailItem
              label="Batch"
              value={member.batch}
            />

            <DetailItem
              label="City"
              value={member.city}
            />

            <DetailItem
              label="Status"
              value={
                member.status.charAt(0).toUpperCase() +
                member.status.slice(1)
              }
            />

            <DetailItem
              label="Joined"
              value={formatDate(member.joined)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}