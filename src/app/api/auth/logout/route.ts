import { destroySession } from "@/lib/session";

export async function POST() {
  try {
    await destroySession();
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Logout error:", error);
    return Response.json({ error: "Logout failed" }, { status: 500 });
  }
}
