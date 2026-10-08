import { z } from "zod";

export const memberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  batch: z
    .string()
    .trim()
    .min(1, "Batch is required"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters"),

  status: z.enum(["active", "inactive", "pending"]),

  joined: z
    .string()
    .min(1, "Joined date is required"),
});

export type MemberFormData = z.infer<typeof memberSchema>;