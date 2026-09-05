import { getComments } from "@/lib/graphql/queries/comments";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get("contentId");
  const after = searchParams.get("after") || null;

  const { comments, pageInfo } = await getComments(contentId, {
    first: 10,
    after,
  });
  return Response.json({ comments, pageInfo });
}
