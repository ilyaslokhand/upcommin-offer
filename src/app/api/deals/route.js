import { getAllDeals } from "@/lib/graphql/queries/deals";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag");
  const discount = Number(searchParams.get("discount") || 0);
  const sort = searchParams.get("sort") || "newest";
  const after = searchParams.get("after") || null;
  const category = searchParams.get("category");
  const subcategories = searchParams.getAll("subcategory"); // multiple

  // Build the GraphQL "where" clause
  const where = {};

  // Combine tag + category + subcategory into one taxQuery (all must match)
  const taxArray = [];
  if (tag) {
    taxArray.push({
      taxonomy: "DEALTAG",
      field: "SLUG",
      terms: [tag],
      operator: "IN",
    });
  }
  if (category) {
    taxArray.push({
      taxonomy: "DEALCATEGORY",
      field: "SLUG",
      terms: [category],
      operator: "IN",
    });
  }
  if (subcategories.length) {
    taxArray.push({
      taxonomy: "DEALCATEGORY",
      field: "SLUG",
      terms: subcategories,
      operator: "IN",
    });
  } else if (category) {
    taxArray.push({
      taxonomy: "DEALCATEGORY",
      field: "SLUG",
      terms: [category],
      operator: "IN",
    });
  }
  if (taxArray.length) {
    where.taxQuery = { relation: "AND", taxArray };
  }

  // Discount filter
  if (discount > 0) {
    where.minDiscount = discount;
  }

  // Sort
  where.sortBy = sort;

  // Always exclude expired
  where.excludeExpired = true;

  const { deals, pageInfo } = await getAllDeals({ first: 20, after, where });

  return Response.json({ deals, pageInfo });
}
