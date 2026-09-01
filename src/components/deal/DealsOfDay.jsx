import { getAllDeals } from "@/lib/graphql/queries/deals";
import DealsOfDayCarousel from "./DealsOfDayCarousel";

export default async function DealsOfDay() {
  const { deals: allDeals } = await getAllDeals();

  // Filter: only "Deal of the Day" tag AND not expired
  const deals = allDeals.filter((deal) => {
    const isDealOfDay = deal.dealTags?.nodes?.some(
      (t) => t.slug === "deal-of-the-day",
    );
    const notExpired = deal.isExpired !== "true";
    return isDealOfDay && notExpired;
  });

  if (!deals.length) return null;

  return (
    <section className="container-wrap pt-5">
      <div
        className="rounded-[20px] border border-line p-6"
        style={{ background: "linear-gradient(to bottom, #ffffff, #fafbff)" }}
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-2.5">
            <h2
              className="font-bold tracking-[-0.56px] text-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Deals of the Day
            </h2>
            <span className="text-2xl">🔥</span>
          </div>
        </div>

        {/* Carousel */}
        <DealsOfDayCarousel deals={deals} />
      </div>
    </section>
  );
}
