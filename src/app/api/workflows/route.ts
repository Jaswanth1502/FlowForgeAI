import { db } from "@/db";
import { workflows } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let user = await getCurrentUser();
    if (!user) {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      return Response.json({ workflows: store.workflows });
    }

    if (process.env.DATABASE_URL) {
      const result = await db
        .select()
        .from(workflows)
        .where(eq(workflows.userId, user.id))
        .orderBy(desc(workflows.updatedAt));

      return Response.json({ workflows: result });
    } else {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const userWorkflows = store.workflows.filter(w => w.userId === user.id);
      return Response.json({ workflows: userWorkflows.length > 0 ? userWorkflows : store.workflows });
    }
  } catch (error) {
    console.error("List workflows error:", error);
    try {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      return Response.json({ workflows: store.workflows });
    } catch {
      return Response.json({ workflows: [] });
    }
  }
}

export async function POST(request: Request) {
  try {
    let user = await getCurrentUser();
    if (!user) {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      user = store.users[0] || { id: "guest-user", email: "creator@flowforge.ai", name: "FlowForge Creator", passwordHash: "", createdAt: new Date().toISOString() };
    }

    const body = await request.json();
    const { title, description, prompt, uiSchema } = body;

    if (!title || !prompt || !uiSchema) {
      return Response.json({ error: "Title, prompt, and uiSchema are required" }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      const [workflow] = await db.insert(workflows).values({
        userId: user.id,
        title,
        description: description || "",
        prompt,
        uiSchema,
      }).returning();

      return Response.json({ workflow });
    } else {
      const { getLocalStore, saveLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const newWf = {
        id: crypto.randomUUID(),
        userId: user.id,
        title,
        description: description || "",
        prompt,
        uiSchema,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      store.workflows.push(newWf);
      saveLocalStore(store);
      return Response.json({ workflow: newWf });
    }
  } catch (error) {
    console.error("Create workflow error:", error);
    return Response.json({ error: "Failed to create workflow" }, { status: 500 });
  }
}
