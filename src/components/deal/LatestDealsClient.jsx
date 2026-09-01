"use client";
import { useState, useEffect, useCallback } from "react";
import DealCard from "./DealCard";

const TABS = [
  { label: "Daily Deals", value: "daily-deal" },
  { label: "Super Deals", value: "super-deal" },
  { label: "Hot", value: "hot" },
];
const DISCOUNTS = [
  { label: "All Discounts", value: 0 },
  { label: "10% & above", value: 10 },
  { label: "30% & above", value: 30 },
  { label: "50% & above", value: 50 },
  { label: "70% & above", value: 70 },
];
const SORTS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Discount: High to Low", value: "discount-desc" },
];

export default function LatestDealsClient() {
  const [tab, setTab] = useState("daily-deal");
  const [discount, setDiscount] = useState(0);
  const [sort, setSort] = useState("newest");
  const [sheetOpen, setSheetOpen] = useState(false);

  const [deals, setDeals] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  // Are any refinements active? (discount or sort changed from default)
  const filtersActive = discount !== 0 || sort !== "newest";

  const clearFilters = () => {
    setDiscount(0);
    setSort("newest");
  };

  const fetchDeals = useCallback(
    async (after = null, append = false) => {
      setLoading(true);
      const params = new URLSearchParams({
        tag: tab,
        discount: String(discount),
        sort,
      });
      if (after) params.set("after", after);

      const res = await fetch(`/api/deals?${params.toString()}`);
      const data = await res.json();

      setDeals((prev) => (append ? [...prev, ...data.deals] : data.deals));
      setCursor(data.pageInfo?.endCursor ?? null);
      setHasNext(data.pageInfo?.hasNextPage ?? false);
      setLoading(false);
    },
    [tab, discount, sort],
  );

  useEffect(() => {
    fetchDeals(null, false);
  }, [fetchDeals]);

  const activeRing = "border-[#0e9f5a] ring-1 ring-[#0e9f5a]";

  return (
    <section className="container-wrap pt-5">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2
          className="font-bold tracking-[-0.56px] text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Latest Deals
        </h2>

        {/* Desktop dropdowns + clear */}
        <div className="hidden md:flex items-center gap-2">
          {filtersActive && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-[13px] font-medium text-muted hover:text-[#0e9f5a]"
            >
              Clear
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <Dropdown
            value={discount}
            onChange={setDiscount}
            options={DISCOUNTS}
            active={discount !== 0}
            activeRing={activeRing}
          />
          <Dropdown
            value={sort}
            onChange={setSort}
            options={SORTS}
            active={sort !== "newest"}
            activeRing={activeRing}
          />
        </div>

        {/* Mobile filter icon */}
        <button
          onClick={() => setSheetOpen(true)}
          className={`md:hidden flex items-center gap-1.5 px-3 py-2 border rounded-lg text-[13px] font-medium ${filtersActive ? activeRing : "border-line"}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition ${tab === t.value ? "bg-[#1c1c1c] text-white" : "bg-white border border-line text-muted hover:border-brand"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mobile Clear (above products, outside sheet) */}
      {filtersActive && (
        <div className="md:hidden mb-3">
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[13px] font-medium text-[#0e9f5a]"
          >
            Clear filters
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Grid */}
      {loading && deals.length === 0 ? (
        <p className="text-muted text-center py-10">Loading deals…</p>
      ) : deals.length ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <p className="text-muted text-center py-10">
          No deals match these filters.
        </p>
      )}

      {/* Load More */}
      {hasNext && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchDeals(cursor, true)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-line rounded-lg text-[14px] font-semibold hover:border-brand transition disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load more deals"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex items-end"
          onClick={() => setSheetOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full bg-white rounded-t-2xl p-5 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-[16px] font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Filters
              </h3>
              <button
                onClick={() => setSheetOpen(false)}
                className="text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <SheetGroup
              title="Discount"
              options={DISCOUNTS}
              value={discount}
              onChange={setDiscount}
            />
            <SheetGroup
              title="Sort by"
              options={SORTS}
              value={sort}
              onChange={setSort}
            />
            <button
              onClick={() => setSheetOpen(false)}
              className="mt-2 bg-[#1c1c1c] text-white py-3 rounded-lg font-semibold"
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Dropdown({ value, onChange, options, active, activeRing }) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          isNaN(e.target.value) ? e.target.value : Number(e.target.value),
        )
      }
      className={`px-3 py-2 border rounded-lg text-[13px] font-medium bg-white cursor-pointer ${active ? activeRing : "border-line"}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function SheetGroup({ title, options, value, onChange }) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-muted mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`px-3 py-2 rounded-lg text-[13px] font-medium border ${value === o.value ? "bg-[#1c1c1c] text-white border-[#1c1c1c]" : "bg-white border-line text-text"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
