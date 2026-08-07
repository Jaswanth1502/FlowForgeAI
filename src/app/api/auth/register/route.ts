import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession, hashPassword } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return Response.json({ error: "Email, password, and name are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    let user: any = null;

    if (process.env.DATABASE_URL) {
      const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (existing.length > 0) {
        return Response.json({ error: "Email already registered" }, { status: 409 });
      }
      const passwordHash = await hashPassword(password);
      const [inserted] = await db.insert(users).values({
        email,
        name,
        passwordHash,
      }).returning({ id: users.id, email: users.email, name: users.name });
      user = inserted;
    } else {
      const { getLocalStore, saveLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const existing = store.users.find(u => u.email === email);
      if (existing) {
        return Response.json({ error: "Email already registered" }, { status: 409 });
      }
      const passwordHash = await hashPassword(password);
      const newUser = {
        id: crypto.randomUUID(),
        email,
        name,
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      store.users.push(newUser);
      saveLocalStore(store);
      user = { id: newUser.id, email: newUser.email, name: newUser.name };
    }

    await createSession(user.id);

    return Response.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error("Register error:", error);
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}
