import { db } from "@/db";
import { workflows } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq, and } from "drizzle-orm";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (process.env.DATABASE_URL && user) {
      const [workflow] = await db
        .select()
        .from(workflows)
        .where(eq(workflows.id, id))
        .limit(1);

      if (!workflow) {
        return Response.json({ error: "Workflow not found" }, { status: 404 });
      }
      return Response.json({ workflow });
    } else {
      const { getLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const workflow = store.workflows.find((w) => w.id === id);
      if (!workflow) {
        return Response.json({ error: "Workflow not found" }, { status: 404 });
      }
      return Response.json({ workflow });
    }
  } catch (error) {
    console.error("Get workflow error:", error);
    return Response.json({ error: "Failed to get workflow" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const user = await getCurrentUser();

    if (process.env.DATABASE_URL && user) {
      const [workflow] = await db
        .update(workflows)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(workflows.id, id))
        .returning();

      if (!workflow) {
        return Response.json({ error: "Workflow not found" }, { status: 404 });
      }
      return Response.json({ workflow });
    } else {
      const { getLocalStore, saveLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      const idx = store.workflows.findIndex((w) => w.id === id);
      if (idx === -1) {
        return Response.json({ error: "Workflow not found" }, { status: 404 });
      }
      store.workflows[idx] = {
        ...store.workflows[idx],
        ...body,
        updatedAt: new Date().toISOString(),
      };
      saveLocalStore(store);
      return Response.json({ workflow: store.workflows[idx] });
    }
  } catch (error) {
    console.error("Update workflow error:", error);
    return Response.json({ error: "Failed to update workflow" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (process.env.DATABASE_URL && user) {
      const [workflow] = await db
        .delete(workflows)
        .where(eq(workflows.id, id))
        .returning();

      if (!workflow) {
        return Response.json({ error: "Workflow not found" }, { status: 404 });
      }
      return Response.json({ ok: true });
    } else {
      const { getLocalStore, saveLocalStore } = await import("@/lib/local-db");
      const store = getLocalStore();
      store.workflows = store.workflows.filter((w) => w.id !== id);
      saveLocalStore(store);
      return Response.json({ ok: true });
    }
  } catch (error) {
    console.error("Delete workflow error:", error);
    return Response.json({ error: "Failed to delete workflow" }, { status: 500 });
  }
}
