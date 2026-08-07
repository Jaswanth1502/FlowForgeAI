import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "ff_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  if (process.env.DATABASE_URL) {
    await db.insert(sessions).values({
      userId,
      token,
      expiresAt,
    });
  } else {
    const { getLocalStore, saveLocalStore } = await import("@/lib/local-db");
    const store = getLocalStore();
    store.sessions.push({
      id: crypto.randomUUID(),
      userId,
      token,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
    saveLocalStore(store);
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });

  return token;
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    if (process.env.DATABASE_URL) {
      const result = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
        })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
        .limit(1);

      return result[0] || null;
    } else {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const now = new Date();
      const validSession = store.sessions.find(s => s.token === token && new Date(s.expiresAt) > now);
      if (!validSession) return null;
      const user = store.users.find(u => u.id === validSession.userId);
      if (!user) return null;
      return { id: user.id, email: user.email, name: user.name };
    }
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    if (process.env.DATABASE_URL) {
      await db.delete(sessions).where(eq(sessions.token, token));
    } else {
      const { getLocalStore, saveLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      store.sessions = store.sessions.filter(s => s.token !== token);
      saveLocalStore(store);
    }
    cookieStore.delete(SESSION_COOKIE);
  }
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}
