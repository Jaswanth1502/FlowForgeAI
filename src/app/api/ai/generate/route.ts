import { generateUISchema, buildUniversalFallback, classifyUIIntent } from "@/lib/ai";
import { validateUISchema } from "@/lib/schema-validator";

export const dynamic = "force-static";

export async function POST(request: Request) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON request body" }, { status: 400 });
    }

    const { prompt, model } = body || {};

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > 2000) {
      return Response.json({ error: "Prompt is too long" }, { status: 400 });
    }

    const rawSchema = await generateUISchema(prompt.trim(), model);
    const validation = validateUISchema(rawSchema);

    if (validation.valid && validation.sanitized) {
      return Response.json({ schema: validation.sanitized }, { status: 200 });
    }

    const fallback = buildUniversalFallback(prompt.trim(), classifyUIIntent(prompt.trim()), model);
    const sanitizedFallback = validateUISchema(fallback).sanitized || fallback;
    return Response.json({ schema: sanitizedFallback }, { status: 200 });
  } catch (error) {
    console.error("AI generate route error:", error);
    const fallback = buildUniversalFallback("Custom Interface", classifyUIIntent("Custom Interface"));
    return Response.json({ schema: fallback }, { status: 200 });
  }
}
