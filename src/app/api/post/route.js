import { postComment } from "@/lib/graphql/queries/comments";

export async function POST(request) {
  const body = await request.json();
  const { contentId, content, author } = body;

  if (!content?.trim() || !author?.trim()) {
    return Response.json(
      { success: false, error: "Name and comment are required" },
      { status: 400 },
    );
  }

  // Placeholder email (WordPress requires one; form doesn't collect it)
  const authorEmail = "contact@upcomingoffer.com";

  const success = await postComment({
    contentId,
    content,
    author,
    authorEmail,
  });
  return Response.json({ success });
}
