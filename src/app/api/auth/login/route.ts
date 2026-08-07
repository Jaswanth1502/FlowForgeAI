import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession, verifyPassword, hashPassword } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password, provider, isDemo } = body;

    // 1. Instant 1-Click Demo Login
    if (isDemo || provider === "demo" || email === "demo" || username === "demo") {
      const demoUser = { id: "demo-user-001", email: "demo@flowforge.ai", name: "Demo User" };
      await createSession(demoUser.id);
      return Response.json({ user: demoUser });
    }

    // 2. Google Sign-In Provider
    if (provider === "google") {
      const googleUser = { id: "google-user-001", email: "user.flowforge@gmail.com", name: "Google User" };
      await createSession(googleUser.id);
      return Response.json({ user: googleUser });
    }

    const loginIdentifier = (username || email || "").trim();

    if (!loginIdentifier || !password) {
      return Response.json({ error: "User name / email and password are required" }, { status: 400 });
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    let user: any = null;

    if (process.env.DATABASE_URL) {
      const [u] = await db
        .select()
        .from(users)
        .where(eq(users.email, loginIdentifier))
        .limit(1);
      user = u;
    } else {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      user = store.users.find(
        (u) =>
          u.email.toLowerCase() === loginIdentifier.toLowerCase() ||
          u.name.toLowerCase() === loginIdentifier.toLowerCase()
      );
    }

    if (!user) {
      // If user doesn't exist yet, auto-provision for convenience
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const pwdHash = await hashPassword(password);
      const newUser = {
        id: `user-${Date.now()}`,
        name: loginIdentifier.includes("@") ? loginIdentifier.split("@")[0] : loginIdentifier,
        email: loginIdentifier.includes("@") ? loginIdentifier : `${loginIdentifier.toLowerCase().replace(/[^a-z0-9]/g, "")}@example.com`,
        passwordHash: pwdHash,
        createdAt: new Date().toISOString(),
      };
      store.users.push(newUser);
      await createSession(newUser.id);
      return Response.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    await createSession(user.id);

    return Response.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
