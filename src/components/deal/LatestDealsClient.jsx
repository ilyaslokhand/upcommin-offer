"use client";
import { useState } from "react";
import DealFeed from "./DealFeed";
import { SORTS } from "@/lib/siteConfig";
import FilterSheet from "@/components/ui/FilterSheet";

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

export default function LatestDealsClient() {
  const [tab, setTab] = useState("daily-deal");
  const [discount, setDiscount] = useState(0);
  const [sort, setSort] = useState("newest");
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtersActive = discount !== 0 || sort !== "newest";
  const clearFilters = () => {
    setDiscount(0);
    setSort("newest");
  };
  const activeRing = "border-[#0e9f5a] ring-1 ring-[#0e9f5a]";

  return (
    <section className="container-wrap pt-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          Latest Deals
        </h2>
        <div className="hidden md:flex items-center gap-2">
          {filtersActive && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-[13px] font-medium text-muted hover:text-[#0e9f5a] cursor-pointer">
              Clear{" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <Dropdown value={discount} onChange={setDiscount} options={DISCOUNTS} active={discount !== 0} activeRing={activeRing} />
          <Dropdown value={sort} onChange={setSort} options={SORTS} active={sort !== "newest"} activeRing={activeRing} />
        </div>
        <button
          onClick={() => setSheetOpen(true)}
          className={`md:hidden flex items-center gap-1.5 px-3 py-2 border rounded-lg text-[13px] font-medium ${filtersActive ? activeRing : "border-line"}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            className={`px-4 py-2 rounded-lg cursor-pointer text-[13px] font-semibold whitespace-nowrap transition ${tab === t.value ? "bg-[#1c1c1c] text-white" : "bg-white border border-line text-muted hover:border-brand"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mobile clear — above grid */}
      {filtersActive && (
        <div className="md:hidden mb-3">
          <button onClick={clearFilters} className="flex items-center gap-1 text-[13px] font-medium text-[#0e9f5a]">
            Clear filters{" "}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <DealFeed filters={{ tag: tab, discount, sort }} columns={4} />

      {/* Shared FilterSheet — replaces the custom sheet */}
      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        groups={[
          {
            title: "Discount",
            options: DISCOUNTS,
            selected: discount,
            onSelect: (v) => setDiscount(v),
            multi: false,
          },
          {
            title: "Sort by",
            options: SORTS,
            selected: sort,
            onSelect: setSort,
            multi: false,
          },
        ]}
      />
    </section>
  );
}

function Dropdown({ value, onChange, options, active, activeRing }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(isNaN(e.target.value) ? e.target.value : Number(e.target.value))}
      className={`px-3 py-2 border rounded-lg text-[13px] font-medium bg-white cursor-pointer outline-none focus:outline-none ${active ? activeRing : "border-line focus:border-brand"}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}