"use client";
import { useState } from "react";
import DealFeed from "./DealFeed";
import { SORTS } from "@/lib/siteConfig";

export default function DealListing({
  baseFilter = {},
  subcategories = [],
  showSubcategoryFilter = false,
}) {
  // Filter state (user's choices on top of baseFilter)
  const [tab, setTab] = useState("daily-deal");
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
    <div className="container-wrap py-6 flex flex-col md:flex-row gap-6 items-start">
      {/* Sidebar (desktop) — placeholder for now */}
      <aside className="hidden md:flex w-[250px] shrink-0 bg-white border border-line rounded-[16px] px-[18px] py-4 flex-col gap-3.5">
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
                className={`px-2 py-[3px] rounded-full cursor-pointer text-[13px] border ${discount === d.value
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
        {/* Tabs + Sort row */}
        <div className="flex items-center justify-between gap-3 ">
          {/* Tabs */}
          <div className="bg-white border border-line rounded-[6px] p-1.5 flex gap-0.5">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`px-3 py-1 rounded-[4px] cursor-pointer text-[13px] font-bold flex items-center gap-1 transition ${tab === t.value ? "bg-[#1c1c1c] text-white" : "text-[#6a7180]"
                  }`}
              >
                {t.label}
                {t.value === "hot" && " 🔥"}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`bg-white border rounded-[6px] px-2.5 py-1.5 text-[13px] font-medium text-[#6a7180] cursor-pointer outline-none focus:outline-none ${sort !== "newest"
              ? "border-[#0e9f5a] ring-1 ring-[#0e9f5a]"
              : "border-line focus:border-brand"
              }`}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <DealFeed filters={filters} columns={3} />
      </div>
    </div>
  );
}
