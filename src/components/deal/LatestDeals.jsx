import DealListing from "@/components/deal/DealListing";
import { getAllDeals } from "@/lib/graphql/queries/deals";
import { buildDealsWhere } from "@/lib/deals/buildDealsWhere";

const TABS = [
  { label: "Daily Deals", value: "daily-deal" },
  { label: "Super Deals", value: "super-deal" },
  { label: "Hot", value: "hot" },
];

export default async function LatestDeals() {
  const where = buildDealsWhere({
    tag: "daily-deal",
  });

  const {
    deals: initialDeals,
    pageInfo: initialPageInfo,
  } = await getAllDeals({
    first: 20,
    after: null,
    where,
  });

  return (
    <section className="container-wrap pt-5">
      <h2
        className="font-bold tracking-[-0.56px] text-text"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Latest Deals
      </h2>

      <DealListing
        tabs={TABS}
        showFilter={false}
        noContainer={true}
        initialDeals={initialDeals}
        initialPageInfo={initialPageInfo}
      />
    </section>
  );
}