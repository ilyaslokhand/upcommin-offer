import { getAllDeals } from "@/lib/graphql/queries/deals";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag"); // e.g. "super-deal"
  const discount = Number(searchParams.get("discount") || 0); // e.g. 50
  const sort = searchParams.get("sort") || "newest";
  const after = searchParams.get("after") || null;

  // Build the GraphQL "where" clause from the filters
  const where = {};

  // Tag filter (taxQuery)
  if (tag) {
    where.taxQuery = {
      taxArray: [
        { taxonomy: "DEALTAG", field: "SLUG", terms: [tag], operator: "IN" },
      ],
    };
  }

  // Discount filter (minDiscount — our custom where-arg)
  if (discount > 0) {
    where.minDiscount = discount;
  }

  // Sort (sortBy — our custom where-arg)
  where.sortBy = sort;

  // Always exclude expired deals from the feed
  where.excludeExpired = true;

  const { deals, pageInfo } = await getAllDeals({ first: 20, after, where });

  return Response.json({ deals, pageInfo });
}
