import { isConfigured, model } from "@/lib/server/openrouter";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    configured: isConfigured(),
    model: model(),
    needsCode: !!process.env.ROCKSTEP_ACCESS_CODE?.trim(),
  });
}
