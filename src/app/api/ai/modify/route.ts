import { modifyUISchema, modifyFallbackSchema } from "@/lib/ai";
import { validateUISchema } from "@/lib/schema-validator";

export async function POST(request: Request) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON request body" }, { status: 400 });
    }

    const existingSchema = body?.schema || body?.currentSchema || body?.existingSchema || body?.uiSchema;
    const instruction = typeof body?.instruction === "string" ? body.instruction.trim() : "";
    const model = body?.model;

    if (!instruction) {
      return Response.json({ error: "Modification instruction is required" }, { status: 400 });
    }

    const schemaToModify = (existingSchema && typeof existingSchema === "object" && Object.keys(existingSchema).length > 0)
      ? existingSchema
      : null;

    let rawSchema: any = null;
    if (schemaToModify) {
      rawSchema = await modifyUISchema(schemaToModify, instruction, model);
    } else {
      const { generateUISchema } = await import("@/lib/ai");
      rawSchema = await generateUISchema(instruction, model);
    }

    const validation = validateUISchema(rawSchema);

    if (validation.valid && validation.sanitized) {
      return Response.json({ schema: validation.sanitized }, { status: 200 });
    }

    const fallback = modifyFallbackSchema(schemaToModify || {}, instruction);
    const sanitizedFallback = validateUISchema(fallback).sanitized || fallback;
    return Response.json({ schema: sanitizedFallback }, { status: 200 });
  } catch (error) {
    console.error("AI modify error:", error);
    const fallback = modifyFallbackSchema({}, "enhance interface");
    return Response.json({ schema: fallback }, { status: 200 });
  }
}
