import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }
    return Response.json({ user });
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}
