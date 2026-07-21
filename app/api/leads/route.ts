import { proxyGet, proxyPost } from "../_shared/proxyPost";


export async function GET(request: Request) {
  return proxyGet(request, "/api/leads", {
    requireAuth: true,
  });
}

export async function POST(request: Request) {
  return proxyPost(request, "/api/leads", {
    requireAuth: false,
  });
}