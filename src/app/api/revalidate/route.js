import { revalidateTag } from "next/cache";

/*
 * WordPress will send a POST request to this URL
 * whenever a deal is published or updated.
 */

export async function POST(request) {
  // Read the private password sent by WordPress.
  const receivedSecret = request.headers.get("x-revalidate-secret");
  //   Read the correct password from .env.local.

  /*
   * Reject the request if:
   *
   * 1. The password is missing from .env.local.
   * 2. WordPress did not send the correct password.
   */

  const correctSecret = process.env.REVALIDATE_SECRET;
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

  /*
   * Clear all cached GraphQL requests
   * carrying the "deals" label.
   *
   * expire: 0 means the next request must
   * retrieve fresh deal data.
   */
  revalidateTag("deals", {
    expire: 0,
  });

  /*
   * Tell WordPress that the cache
   * was cleared successfully.
   */
  return Response.json({
    success: true,
    message: "Deal cache cleared",
  });
}
