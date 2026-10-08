"use client";

import { useFormStatus } from "react-dom";
import { logoutAction } from "@/lib/auth-actions";

function LogoutButtonContent() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
    >
      {pending ? "Signing out..." : "Logout"}
    </button>
  );
}

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <LogoutButtonContent />
    </form>
  );
}