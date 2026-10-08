import Link from "next/link";
import { notFound } from "next/navigation";
import EditMemberForm from "@/components/edit-member-form";
import DashboardHeader from "@/components/dashboard-header";
import { getMemberById } from "@/lib/members";

type EditMemberPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMemberPage({
  params,
}: EditMemberPageProps) {
  const { id } = await params;

  const member = await getMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href={`/members/${member.id}`}
          className="text-sm text-gray-600 underline"
        >
          ← Back to member
        </Link>

        <div className="mt-6 rounded-2xl border bg-white p-8">
          <div className="mb-8">
            <p className="text-sm text-gray-500">
              Member management
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Edit member
            </h1>

            <p className="mt-2 text-gray-600">
              Update {member.name}&apos;s information.
            </p>
          </div>

          <EditMemberForm member={member} />
        </div>
      </main>
    </div>
  );
}