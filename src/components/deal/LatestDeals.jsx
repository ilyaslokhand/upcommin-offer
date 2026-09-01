import { getAllDeals } from "@/lib/graphql/queries/deals";
import LatestDealsClient from "./LatestDealsClient";

export default async function LatestDeals() {
  const { deals } = await getAllDeals({ first: 100 });
  if (!deals.length) return null;
  return <LatestDealsClient deals={deals} />;
}