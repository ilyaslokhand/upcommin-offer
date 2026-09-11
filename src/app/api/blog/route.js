import { getPosts } from "@/lib/graphql/queries/blog";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") || null;

  const { posts, pageInfo } = await getPosts({ first: 20, after });
  return Response.json({ posts, pageInfo });
}
