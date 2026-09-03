"use client";
import { useState } from "react";
import DealFeed from "./DealFeed";
import { SORTS } from "@/lib/siteConfig";
import FilterSheet from "@/components/ui/FilterSheet";

export default function DealListing({
  baseFilter = {},
  subcategories = [],
  showSubcategoryFilter = false,
}) {
  // Filter state (user's choices on top of baseFilter)
  const [tab, setTab] = useState("daily-deal");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSubcats, setSelectedSubcats] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [sort, setSort] = useState("newest");

  // Merge baseFilter (always applied) with the user's choices
  const filters = {
    ...baseFilter,
    tag: tab,
    discount,
    sort,
    subcategories: showSubcategoryFilter ? selectedSubcats : [],
  };

  const toggleSubcat = (slug) => {
    setSelectedSubcats((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filtersActive = selectedSubcats.length > 0 || discount !== 0 || sort !== "newest";


  const clearFilters = () => {
    setSelectedSubcats([]);
    setDiscount(0);
    setSort("newest");
  };

  const DISCOUNTS = [
    { label: "20% +", value: 20 },
    { label: "50% +", value: 50 },
    { label: "70% +", value: 70 },
  ];

  const TABS = [
    { label: "Latest", value: "daily-deal" },
    { label: "Hot", value: "hot" },
  ];

  //   const activeRing = "border-[#0e9f5a] ring-1 ring-[#0e9f5a]";

  return (
    <div className="container-wrap py-6 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 items-start">
      <aside className="hidden md:flex bg-white border border-line rounded-2xl px-4.5 py-4 flex-col gap-3.5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <span className="text-[15px] font-bold text-[#6a7180]">Filters</span>
          {filtersActive && (
            <button
              onClick={clearFilters}
              className="text-[15px] font-semibold text-text underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Subcategory filter — only on category pages */}
        {showSubcategoryFilter && subcategories.length > 0 && (
          <div className="flex flex-col gap-2.5 pb-3.5 border-b border-line">
            <span className="text-[13px] font-semibold text-text uppercase">
              Subcategories
            </span>
            {subcategories.map((sc) => (
              <label
                key={sc.slug}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcats.includes(sc.slug)}
                  onChange={() => toggleSubcat(sc.slug)}
                  className="size-4 accent-[#4c34d4] cursor-pointer"
                />
                <span className="text-[13px] text-[#6a7180]">{sc.name}</span>
              </label>
            ))}
          </div>
        )}

        {/* Discount filter */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-semibold text-text uppercase">
            Discount
          </span>
          <div className="flex gap-1.5">
            {DISCOUNTS.map((d) => (
              <button
                key={d.value}
                onClick={() => setDiscount(discount === d.value ? 0 : d.value)}
                className={`px-2 py-0.75 rounded-full cursor-pointer text-[13px] border ${discount === d.value
                  ? "bg-[#1c1c1c] border-[#1c1c1c] text-white font-bold"
                  : "border-line text-[#8b92a8] font-medium"
                  }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </aside>



      {/* Main: tabs + sort + grid */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Mobile filter button — shows only on mobile */}

        {/* Tabs + Sort row */}
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="bg-white border border-line rounded-md p-1.5 flex gap-0.5 shrink-0">

            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`px-3 py-1 rounded-sm cursor-pointer text-[13px] font-bold flex items-center gap-1 transition ${tab === t.value ? "bg-[#1c1c1c] text-white" : "text-[#6a7180]"
                  }`}
              >
                {t.label}
                {t.value === "hot" && " 🔥"}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSheetOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-line rounded-lg text-[13px] font-medium self-start"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters
          </button>

          {/* Sort dropdown */}
          <div className="shrink-0 hidden md:block ">
            <select
              name="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-40 bg-white border rounded-md px-2.5 py-1.5 text-[13px] font-medium text-[#6a7180] cursor-pointer outline-none focus:outline-none border-line focus:border-brand"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <FilterSheet
          open={sheetOpen}
          onClear={clearFilters}
          filtersActive={filtersActive}
          onClose={() => setSheetOpen(false)}
          groups={[
            // Subcategories — only on category pages, multi-select
            ...(showSubcategoryFilter && subcategories.length > 0
              ? [{
                title: "Subcategories",
                options: subcategories.map((sc) => ({ label: sc.name, value: sc.slug })),
                selected: selectedSubcats,
                onSelect: toggleSubcat,
                multi: true,
              }]
              : []),
            // Discount — single-select (tap active to clear)
            {
              title: "Discount",
              options: DISCOUNTS,
              selected: discount,
              onSelect: (v) => setDiscount(discount === v ? 0 : v),
              multi: false,
            },
            // Sort — single-select
            {
              title: "Sort by",
              options: SORTS,
              selected: sort,
              onSelect: setSort,
              multi: false,
            },
          ]}
        />

        {/* Mobile Clear filters — above the grid, outside the sheet */}
        {filtersActive && (
          <button
            onClick={clearFilters}
            className="md:hidden flex items-center gap-1 text-[13px] font-medium text-[#0e9f5a] self-start"
          >
            Clear filters
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        <DealFeed filters={filters} columns={3} />
      </div>
    </div>
  );
}
