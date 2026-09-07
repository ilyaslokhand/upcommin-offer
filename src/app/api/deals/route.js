import { getAllDeals } from "@/lib/graphql/queries/deals";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag");
  const category = searchParams.get("category");
  const store = searchParams.get("store");
  const subcategories = searchParams.getAll("subcategory");
  const after = searchParams.get("after") || null;

  const where = {};

  const taxArray = [];
  if (tag) {
    taxArray.push({
      taxonomy: "DEALTAG",
      field: "SLUG",
      terms: [tag],
      operator: "IN",
    });
  }

  if (store) {
    taxArray.push({
      taxonomy: "STORE",
      field: "SLUG",
      terms: [store],
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

  const { deals, pageInfo } = await getAllDeals({ first: 20, after, where });

  return Response.json({ deals, pageInfo });
}
