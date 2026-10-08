"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth-actions";

const initialState = {
  error: "",
};

export default function LoginForm() {
  const [state, formAction, isPending] =
    useActionState(
      loginAction,
      initialState
    );

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Admin Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          required
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Signing in..."
          : "Sign in"}
      </button>
    </form>
  );
}