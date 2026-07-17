import { NextRequest } from "next/server";

import { proxyPost } from "../_shared/proxyPost";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
) {
  return proxyPost(
    request,
    "/api/leads"
  );
}