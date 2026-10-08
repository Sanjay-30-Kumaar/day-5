"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMemberAction } from "@/lib/member-actions";

type DeleteMemberButtonProps = {
  memberId: string;
  memberName: string;
};

export default function DeleteMemberButton({
  memberId,
  memberName,
}: DeleteMemberButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] =
    useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${memberName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteMemberAction(memberId);

      router.push("/members");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete member:", error);

      window.alert(
        "Unable to delete the member. Please try again."
      );

      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}