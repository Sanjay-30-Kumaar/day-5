"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSession,
  SESSION_COOKIE,
} from "./auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password.length === 0
  ) {
    return {
      error: "Password is required.",
    };
  }

  const configuredPassword =
    process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    throw new Error(
      "ADMIN_PASSWORD is not configured."
    );
  }

  if (password !== configuredPassword) {
    return {
      error: "Invalid password.",
    };
  }

  const token = await createSession();

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);

  redirect("/login");
}