import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "member_admin_session";

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSession(): Promise<string> {
  return new SignJWT({
    authenticated: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getAuthSecret());
}

export async function verifySession(
  token: string
): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(
      token,
      getAuthSecret()
    );

    return payload.authenticated === true;
  } catch {
    return false;
  }
}