"use client";

import { useActionState } from "react";
import Link from "next/link";
import { addMemberAction } from "@/lib/member-actions";

const initialState = {
  error: "",
  fields: {},
};

export default function AddMemberForm() {
  const [state, formAction, isPending] = useActionState(
    addMemberAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
          />

          {state.fields?.name && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
          />

          {state.fields?.email && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="batch"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Batch
          </label>

          <input
            id="batch"
            name="batch"
            type="text"
            defaultValue=""
            placeholder="Example: 2025"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
          />

          {state.fields?.batch && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.batch}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
          />

          {state.fields?.city && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.city}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-black"
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          {state.fields?.status && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.status}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="joined"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Joined date
          </label>

          <input
            id="joined"
            name="joined"
            type="date"
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
          />

          {state.fields?.joined && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.joined}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add member"}
        </button>

        <Link
          href="/members"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}