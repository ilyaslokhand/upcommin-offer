"use client";
import { useState, useEffect, useCallback } from "react";
import DealCard from "./DealCard";

export default function DealFeed({ filters = {}, columns = 4, initialDeals = [], initialPageInfo = null, }) {

  const hasInitialData = initialPageInfo !== null;


  const [deals, setDeals] = useState(initialDeals);
  const [cursor, setCursor] = useState(
    initialPageInfo?.endCursor ?? null
  );

  const [hasNext, setHasNext] = useState(
    initialPageInfo?.hasNextPage ?? false
  );

  const [loading, setLoading] = useState(
    !hasInitialData
  );

  const buildParams = useCallback(
    (after = null) => {
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category);
      if (filters.tag) params.set("tag", filters.tag);
      if (filters.sale) params.set("sale", filters.sale);
      if (filters.store) params.set("store", filters.store);
      if (filters.search) params.set("search", filters.search);
      (filters.subcategories || []).forEach((s) => params.append("subcategory", s));
      if (after) params.set("after", after);
      return params.toString();
    },
    [filters],
  );

  // Only requests and returns the data.
  // It does not update React state.
  const requestDeals = useCallback(
    async (after = null) => {
      const res = await fetch(`/api/deals?${buildParams(after)}`);

      if (!res.ok) {
        throw new Error("Failed to fetch deals");
      }

      return res.json();
    },
    [buildParams]
  );


  // Used by the Load More button.
  const fetchDeals = useCallback(
    async (after = null, append = false) => {
      setLoading(true);

      try {
        const data = await requestDeals(after);

        setDeals((previousDeals) =>
          append
            ? [...previousDeals, ...data.deals]
            : data.deals
        );

        setCursor(data.pageInfo?.endCursor ?? null);
        setHasNext(data.pageInfo?.hasNextPage ?? false);
      } catch (error) {
        console.error("Unable to load deals:", error);
      } finally {
        setLoading(false);
      }
    },
    [requestDeals]
  );


  // Loads the first batch when the component mounts
  // or when the filters change.
  // Loads the first batch only when the server
  // has not already provided initial deals.
  useEffect(() => {
    if (hasInitialData) return;

    let cancelled = false;

    async function loadInitialDeals() {
      try {
        const data = await requestDeals();

        if (cancelled) return;

        setDeals(data.deals);
        setCursor(data.pageInfo?.endCursor ?? null);
        setHasNext(data.pageInfo?.hasNextPage ?? false);
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Unable to load initial deals:",
            error
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialDeals();

    return () => {
      cancelled = true;
    };
  }, [hasInitialData, requestDeals]);

  // requestDeals = Get deals from the API

  // fetchDeals = Load and append more deals after a user action

  // useEffect = Automatically load the first deals when the page opens


  const gridCols =
    columns === 3
      ? "grid-cols-1 min-[722px]:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 min-[722px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`w-full flex flex-col gap-7 items-center ${loading && deals.length === 0 ? "min-h-150" : ""}`}>      {loading && deals.length === 0 ? (
      <div
        className="flex min-h-75 w-full items-center justify-center"
        aria-busy="true"
        aria-live="polite"
      >
        <span
          className="size-9 animate-spin rounded-full border-[3px] border-line border-t-brand motion-reduce:animate-none"
          aria-hidden="true"
        />

        <span className="sr-only">Loading deals</span>
      </div>
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
