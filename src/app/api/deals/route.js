import { getAllDeals } from "@/lib/graphql/queries/deals";
import { buildDealsWhere } from "@/lib/deals/buildDealsWhere";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag");
  const sale = searchParams.get("sale");
  const category = searchParams.get("category");
  const store = searchParams.get("store");
  const subcategories = searchParams.getAll("subcategory");
  const after = searchParams.get("after") || null;

  const where = buildDealsWhere({
    tag,
    sale,
    category,
    store,
    subcategories,
  });

  const { deals, pageInfo } = await getAllDeals({
    first: 20,
    after,
    where,
  });

  return Response.json({ deals, pageInfo });
}
