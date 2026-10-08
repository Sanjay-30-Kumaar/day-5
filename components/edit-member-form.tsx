"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Member } from "@/lib/types";
import { updateMemberAction } from "@/lib/member-actions";

type FormState = {
  error?: string;
  fields?: {
    name?: string;
    email?: string;
    batch?: string;
    city?: string;
    status?: string;
    joined?: string;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

export default function EditMemberForm({
  member,
}: {
  member: Member;
}) {
  const initialState: FormState = {};

  const [state, formAction] = useActionState(
    updateMemberAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <input
        type="hidden"
        name="id"
        value={member.id}
      />

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          defaultValue={member.name}
          className="w-full rounded-lg border px-4 py-3"
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
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          defaultValue={member.email}
          className="w-full rounded-lg border px-4 py-3"
        />

        {state.fields?.email && (
          <p className="mt-1 text-sm text-red-600">
            {state.fields.email}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="batch"
            className="mb-2 block text-sm font-medium"
          >
            Batch
          </label>

          <input
            id="batch"
            name="batch"
            type="text"
            defaultValue={member.batch}
            className="w-full rounded-lg border px-4 py-3"
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
            className="mb-2 block text-sm font-medium"
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            defaultValue={member.city}
            className="w-full rounded-lg border px-4 py-3"
          />

          {state.fields?.city && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.city}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            defaultValue={member.status}
            className="w-full rounded-lg border px-4 py-3"
          >
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
            className="mb-2 block text-sm font-medium"
          >
            Joined
          </label>

          <input
            id="joined"
            name="joined"
            type="date"
            defaultValue={member.joined}
            className="w-full rounded-lg border px-4 py-3"
          />

          {state.fields?.joined && (
            <p className="mt-1 text-sm text-red-600">
              {state.fields.joined}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <a
          href={`/members/${member.id}`}
          className="rounded-lg border px-5 py-3 text-sm font-medium"
        >
          Cancel
        </a>

        <SubmitButton />
      </div>
    </form>
  );
}