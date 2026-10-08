import { promises as fs } from "fs";
import path from "path";
import type { Member } from "./types";

const dataFile = path.join(
  process.cwd(),
  "data",
  "members.json"
);

async function readMembers(): Promise<Member[]> {
  try {
    const file = await fs.readFile(dataFile, "utf-8");

    return JSON.parse(file) as Member[];
  } catch (error) {
    console.error("Failed to read members data:", error);

    throw new Error("Unable to load members data.");
  }
}

async function writeMembers(
  members: Member[]
): Promise<void> {
  try {
    await fs.writeFile(
      dataFile,
      JSON.stringify(members, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Failed to write members data:", error);

    throw new Error("Unable to save members data.");
  }
}

export async function getMembers(): Promise<Member[]> {
  return readMembers();
}

export async function getMemberById(
  id: string
): Promise<Member | null> {
  const members = await readMembers();

  return (
    members.find((member) => member.id === id) ?? null
  );
}

export async function createMember(
  member: Member
): Promise<Member> {
  const members = await readMembers();

  members.push(member);

  await writeMembers(members);

  return member;
}

export async function updateMember(
  id: string,
  updates: Partial<Member>
): Promise<Member | null> {
  const members = await readMembers();

  const index = members.findIndex(
    (member) => member.id === id
  );

  if (index === -1) {
    return null;
  }

  members[index] = {
    ...members[index],
    ...updates,
    id,
  };

  await writeMembers(members);

  return members[index];
}

export async function deleteMember(
  id: string
): Promise<boolean> {
  const members = await readMembers();

  const filteredMembers = members.filter(
    (member) => member.id !== id
  );

  if (filteredMembers.length === members.length) {
    return false;
  }

  await writeMembers(filteredMembers);

  return true;
}