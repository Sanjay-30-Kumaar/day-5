"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMember,
  updateMember,
  deleteMember,
} from "@/lib/members";

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

export async function addMemberAction(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const batch = String(formData.get("batch") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const joined = String(formData.get("joined") ?? "").trim();

  const fields: FormState["fields"] = {};

  if (!name) {
    fields.name = "Name is required.";
  }

  if (!email) {
    fields.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fields.email = "Enter a valid email address.";
  }

  if (!batch) {
    fields.batch = "Batch is required.";
  }

  if (!city) {
    fields.city = "City is required.";
  }

  if (!["active", "inactive", "pending"].includes(status)) {
    fields.status = "Select a valid status.";
  }

  if (!joined) {
    fields.joined = "Joined date is required.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please correct the highlighted fields.",
      fields,
    };
  }

  const id = `m-${crypto.randomUUID()}`;

  try {
    await createMember({
      id,
      name,
      email,
      batch,
      city,
      status: status as "active" | "inactive" | "pending",
      joined,
    });
  } catch (error) {
    console.error("Failed to create member:", error);

    return {
      error: "Unable to create member. Please try again.",
      fields,
    };
  }

  revalidatePath("/");
  revalidatePath("/members");

  redirect(`/members/${id}`);
}

export async function updateMemberAction(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const batch = String(formData.get("batch") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const joined = String(formData.get("joined") ?? "").trim();

  const fields: FormState["fields"] = {};

  if (!name) {
    fields.name = "Name is required.";
  }

  if (!email) {
    fields.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fields.email = "Enter a valid email address.";
  }

  if (!batch) {
    fields.batch = "Batch is required.";
  }

  if (!city) {
    fields.city = "City is required.";
  }

  if (!["active", "inactive", "pending"].includes(status)) {
    fields.status = "Select a valid status.";
  }

  if (!joined) {
    fields.joined = "Joined date is required.";
  }

  if (!id) {
    return {
      error: "Member ID is missing.",
      fields,
    };
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please correct the highlighted fields.",
      fields,
    };
  }

  try {
    const updatedMember = await updateMember(id, {
      name,
      email,
      batch,
      city,
      status: status as "active" | "inactive" | "pending",
      joined,
    });

    if (!updatedMember) {
      return {
        error: "Member not found.",
      };
    }
  } catch (error) {
    console.error("Failed to update member:", error);

    return {
      error: "Unable to update member. Please try again.",
    };
  }

  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath(`/members/${id}`);

  redirect(`/members/${id}`);
}

export async function deleteMemberAction(
  id: string
): Promise<{ success: true }> {
  if (!id) {
    throw new Error("Member ID is required.");
  }

  try {
    const deleted = await deleteMember(id);

    if (!deleted) {
      throw new Error("Member not found.");
    }
  } catch (error) {
    console.error("Failed to delete member:", error);

    throw new Error("Unable to delete member. Please try again.");
  }

  revalidatePath("/");
  revalidatePath("/members");

  return { success: true };
}
