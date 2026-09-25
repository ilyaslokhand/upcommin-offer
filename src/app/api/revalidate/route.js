import { revalidateTag } from "next/cache";

/*
 * WordPress sends a request here whenever
 * a deal or blog post changes.
 */
export async function POST(request) {
  const receivedSecret = request.headers.get("x-revalidate-secret");
  const correctSecret = process.env.REVALIDATE_SECRET;

  // Reject requests that do not have the correct password.
  if (!correctSecret || receivedSecret !== correctSecret) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  // Read the information sent by WordPress.
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid JSON body",
      },
      {
        status: 400,
      },
    );
  }

  /*
   * The existing deal webhook does not send a type,
   * so a missing type continues to mean "deal".
   */
  const type = body?.type === "blog" ? "blog" : "deal";

  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

  if (type === "blog") {
    // Refresh all blog lists quietly in the background.
    revalidateTag("blogs", "max");

    // Refresh the changed blog post immediately.
    if (slug) {
      revalidateTag(`blog:${slug}`, {
        expire: 0,
      });
    }
  } else {
    // Refresh all deal lists quietly in the background.
    revalidateTag("deals", "max");

    // Refresh the changed deal immediately.
    if (slug) {
      revalidateTag(`deal:${slug}`, {
        expire: 0,
      });
    }
  }

  return Response.json({
    success: true,
    message: `${type} cache cleared`,
    type,
    slug: slug || null,
  });
}

// You publish, update or delete a deal in WordPress
//                         ↓
// WordPress sends the deal slug and private password to Next.js
//                         ↓
// Next.js checks the private password
//                         ↓
// Wrong password → Request rejected
//                         ↓
// Correct password → Continue
//                         ↓
// Refresh all deal feeds quietly in the background
//                         ↓
// Homepage, deals, store, category and subcategory feeds update
//                         ↓
// If a deal slug was provided
//                         ↓
// Clear that individual deal’s saved data immediately
//                         ↓
// Next visitor receives the fresh deal information
