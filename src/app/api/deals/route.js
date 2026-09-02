import { getAllDeals } from "@/lib/graphql/queries/deals";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag");
  const discount = Number(searchParams.get("discount") || 0);
  const sort = searchParams.get("sort") || "newest";
  const after = searchParams.get("after") || null;
  const category = searchParams.get("category");
  const stores = searchParams.getAll("store"); // can be multiple

  // Build the GraphQL "where" clause
  const where = {};

  // Combine tag + category + store into one taxQuery (all must match)
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
  if (stores.length) {
    taxArray.push({
      taxonomy: "STORE",
      field: "SLUG",
      terms: stores,
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
