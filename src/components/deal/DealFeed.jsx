"use client";
import { useState, useEffect, useCallback } from "react";
import DealCard from "./DealCard";
import DealGridSkeleton from "@/components/ui/DealGridSkeleton";

export default function DealFeed({ filters = {}, columns = 4 }) {
  const [deals, setDeals] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const buildParams = useCallback(
    (after = null) => {
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category);
      if (filters.tag) params.set("tag", filters.tag); // ← FIXED: filters.tag not filters.tab
      if (filters.discount) params.set("discount", String(filters.discount));
      if (filters.sort) params.set("sort", filters.sort);
      (filters.subcategories || []).forEach((s) => params.append("subcategory", s));
      if (after) params.set("after", after);
      return params.toString();
    },
    [filters],
  );

  const fetchDeals = useCallback(
    async (after = null, append = false) => {
      setLoading(true);
      const res = await fetch(`/api/deals?${buildParams(after)}`);
      const data = await res.json();
      setDeals((prev) => (append ? [...prev, ...data.deals] : data.deals));
      setCursor(data.pageInfo?.endCursor ?? null);
      setHasNext(data.pageInfo?.hasNextPage ?? false);
      setLoading(false);
    },
    [buildParams],
  );

  useEffect(() => {
    fetchDeals(null, false);
  }, [fetchDeals]);

  const gridCols =
    columns === 3
      ? "grid-cols-1 min-[722px]:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 min-[722px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`w-full flex flex-col gap-7 items-center ${loading && deals.length === 0 ? "min-h-150" : ""}`}>      {loading && deals.length === 0 ? (
      <DealGridSkeleton count={8} columns={columns} />
    ) : deals.length ? (
      <div className={`w-full grid ${gridCols} gap-4`}>
        {deals.map((deal, i) => (
          <DealCard key={deal.id} deal={deal} priority={i < 4} />
        ))}
      </div>
    ) : (
      <p className="text-muted text-center py-10">
        No deals match these filters.
      </p>
    )}

      {hasNext && (
        <button
          onClick={() => fetchDeals(cursor, true)}
          disabled={loading}
          className="flex items-center gap-1.75 text-[15px] font-semibold text-text transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Loading…" : "Load more deals"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
