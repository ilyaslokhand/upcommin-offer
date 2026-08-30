import Link from "next/link";
import { getTrendingStores } from "@/lib/graphql/queries/taxonomies";

export default async function TrendingStores() {
  const stores = (await getTrendingStores()).slice(0, 6);
  if (!stores.length) return null;

  return (
    <section className="container-wrap pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          Trending Stores
        </h2>
        <Link href="/store" className="flex items-center gap-[7px] text-[13px] font-semibold text-muted hover:text-brand">
          All Stores
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>

      {/* Store cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
        {stores.map((store) => (
          <Link
            key={store.slug}
            href={`/store/${store.slug}`}
            className=" bg-white border border-line rounded-[10px] flex flex-col items-center justify-center gap-2 p-4 hover:border-brand transition"
          >
            <span className="text-[15px] font-bold text-text leading-[21px]">{store.name}</span>
            <div className="flex flex-col items-center gap-1.5">
              {store.storeReward && (
                <span className="text-[15px] font-semibold text-center leading-[21px]" style={{ color: "#0e9f5a" }}>
                  {store.storeReward}
                </span>
              )}
              <span className="text-[13px] font-medium leading-4" style={{ color: "#9aa1ad" }}>
                {store.count ?? 0} Offers
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}