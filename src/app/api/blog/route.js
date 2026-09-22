import { getPosts,getPostsByCategory } from "@/lib/graphql/queries/blog";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") || null;
  const categorySlug = searchParams.get("category");

   // Category page: load more posts from that same category.
   if (categorySlug) {
    const category = await getPostsByCategory(categorySlug, after);

    if (!category) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }
  

   return Response.json({
      posts: category.posts?.nodes ?? [],
      pageInfo: category.posts?.pageInfo ?? {
        hasNextPage: false,
        endCursor: null,
      },
    });
  }

  // Main /blog page: keep its existing behavior.
  const { posts, pageInfo } = await getPosts({ first: 20, after });
  return Response.json({ posts, pageInfo });
}
