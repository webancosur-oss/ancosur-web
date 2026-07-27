import {
  proxyPost,
} from "../_shared/proxyPost";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: Request,
) {
  return proxyPost(request);
}