export type MemberStatus = "active" | "inactive" | "pending";

export type Member = {
  id: string;
  name: string;
  email: string;
  batch: string;
  city: string;
  status: MemberStatus;
  joined: string;
};