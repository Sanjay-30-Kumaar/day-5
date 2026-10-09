
import "server-only";

import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Member } from "@/lib/types";

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabaseAdmin
    .from("members")
    .select("*")
    .order("joined", { ascending: false });

  if (error) {
    console.error("Failed to load members:", error);
    throw new Error("Unable to load members data.");
  }

  return (data ?? []) as Member[];
}

export async function getMemberById(
  id: string
): Promise<Member | null> {
  const { data, error } = await supabaseAdmin
    .from("members")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load member:", error);
    throw new Error("Unable to load member data.");
  }

  return data as Member | null;
}

export async function createMember(
  member: Member
): Promise<Member> {
  const { data, error } = await supabaseAdmin
    .from("members")
    .insert(member)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create member:", error);
    throw new Error("Unable to save member.");
  }

  return data as Member;
}

export async function updateMember(
  id: string,
  updates: Partial<Member>
): Promise<Member | null> {
  const { data, error } = await supabaseAdmin
    .from("members")
    .update(updates)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Failed to update member:", error);
    throw new Error("Unable to update member.");
  }

  return data as Member | null;
}

export async function deleteMember(
  id: string
): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("members")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("Failed to delete member:", error);
    throw new Error("Unable to delete member.");
  }

  return (data?.length ?? 0) > 0;
}
