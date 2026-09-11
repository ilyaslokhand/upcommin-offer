import Link from "next/link";
import { getStores } from "@/lib/graphql/queries/taxonomies";
import StoreGrid from "./StoreGrid";

export default async function TrendingStores() {
  const stores = await getStores({ first: 6 });
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>

      <StoreGrid stores={stores} columns={6} />
    </section>
  );
}