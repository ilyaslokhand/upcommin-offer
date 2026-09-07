import DealListing from "@/components/deal/DealListing";

const TABS = [
  { label: "Daily Deals", value: "daily-deal" },
  { label: "Super Deals", value: "super-deal" },
  { label: "Hot", value: "hot" },
];

export default function LatestDeals() {
  return (
    <section className="container-wrap pt-5">
      <h2 className="font-bold tracking-[-0.56px] text-text mb-5" style={{ fontFamily: "var(--font-display)" }}>
        Latest Deals
      </h2>
      <DealListing tabs={TABS} showFilter={false} noContainer={true} />
    </section>
  );
}