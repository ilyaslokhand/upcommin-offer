import { revalidateTag } from "next/cache";

/*
 * WordPress sends a protected request here whenever
 * a deal, blog post, store or category changes.
 */
export async function POST(request) {
  const receivedSecret = request.headers.get("x-revalidate-secret");
  const correctSecret = process.env.REVALIDATE_SECRET;

  // Reject requests that do not have the correct private password.
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
   * The original deal webhook does not send a type.
   * Therefore, a missing type must continue to mean "deal".
   */
  const requestedType = typeof body?.type === "string" ? body.type.trim() : "";

  const type = requestedType || "deal";

  /*
   * Only allow cache types that this endpoint
   * currently understands.
   *
   * Sale and deal-tag support will be added
   * after their queries have been audited.
   */
  const allowedTypes = [
    "deal",
    "blog",
    "blog-category",
    "store",
    "category",
    "sale",
  ];

  if (!allowedTypes.includes(type)) {
    return Response.json(
      {
        success: false,
        message: "Unsupported cache type",
      },
      {
        status: 400,
      },
    );
  }

  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

  /*
   * Refresh deal caches.
   */
  if (type === "deal") {
    // Refresh all deal listings quietly in the background.
    revalidateTag("deals", "max");

    // Refresh the changed individual deal immediately.
    if (slug) {
      revalidateTag(`deal:${slug}`, {
        expire: 0,
      });
    }
  }

  /*
   * Refresh blog caches.
   */
  if (type === "blog") {
    // Refresh the blog feed and blog-category article listings.
    revalidateTag("blogs", "max");

    // Refresh the changed individual blog post immediately.
    if (slug) {
      revalidateTag(`blog:${slug}`, {
        expire: 0,
      });
    }
  }

  /*
   * Refresh store caches.
   */
  if (type === "store") {
    // Refresh store count, menus and the store index.
    revalidateTag("stores", "max");

    // Refresh the changed store's details immediately.
    if (slug) {
      revalidateTag(`store:${slug}`, {
        expire: 0,
      });
    }
  }

  /*
   * Refresh deal-category caches.
   */
  if (type === "category") {
    // Refresh category menus and category indexes.
    revalidateTag("categories", "max");

    // Refresh the changed category's details immediately.
    if (slug) {
      revalidateTag(`category:${slug}`, {
        expire: 0,
      });
    }
  }

  /*
   * Refresh blog-category caches.
   */
  if (type === "blog-category") {
    // Refresh blog feeds because post cards display category names.
    revalidateTag("blogs", "max");

    // Refresh category menus and the blog-category list.
    revalidateTag("blog-categories", "max");
  }

  /*
   * Refresh sale caches.
   */
  if (type === "sale") {
    // Refresh sale lists and homepage sale banners.
    revalidateTag("sales", "max");

    // Refresh the changed sale and its related categories.
    if (slug) {
      revalidateTag(`sale:${slug}`, {
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

/*
 * DEAL FLOW
 *
 * Publish, update, trash or restore a deal in WordPress
 *                         ↓
 * WordPress sends the deal slug and private password
 *                         ↓
 * Next.js verifies the private password
 *                         ↓
 * Refresh all deal listings using "deals"
 *                         ↓
 * Refresh that individual deal using "deal:slug"
 *                         ↓
 * Visitors receive fresh deal information
 */

/*
 * BLOG FLOW
 *
 * Publish, update, trash or restore a blog post
 *                         ↓
 * WordPress sends type "blog" and the post slug
 *                         ↓
 * Next.js verifies the private password
 *                         ↓
 * Refresh blog lists using "blogs"
 *                         ↓
 * Refresh that article using "blog:slug"
 *                         ↓
 * Visitors receive fresh blog content
 */

/*
 * STORE FLOW
 *
 * Create, edit or delete a WordPress store
 *                         ↓
 * WordPress sends type "store" and the store slug
 *                         ↓
 * Next.js verifies the private password
 *                         ↓
 * Refresh store lists using "stores"
 *                         ↓
 * Refresh that store using "store:slug"
 *                         ↓
 * Visitors receive the updated store information
 */

/*
 * CATEGORY FLOW
 *
 * Create, edit or delete a deal category
 *                         ↓
 * WordPress sends type "category" and the category slug
 *                         ↓
 * Next.js verifies the private password
 *                         ↓
 * Refresh category lists using "categories"
 *                         ↓
 * Refresh that category using "category:slug"
 *                         ↓
 * Visitors receive the updated category information
 */

/*
 * SALE FLOW
 *
 * Create, edit or delete a sale
 *                 ↓
 * WordPress sends type "sale" and the sale slug
 *                 ↓
 * Next.js verifies the private password
 *                 ↓
 * Refresh sale lists using "sales"
 *                 ↓
 * Refresh that sale using "sale:slug"
 *                 ↓
 * Visitors receive updated sale information
 */
