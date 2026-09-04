"use client";
import { useState } from "react";
import DealFeed from "./DealFeed";
import FilterSheet from "@/components/ui/FilterSheet";

const TABS = [
  { label: "Latest", value: "daily-deal" },
  { label: "Hot", value: "hot" },
];

export default function DealListing({
  baseFilter = {},
  subcategories = [],
  showSubcategoryFilter = false,
}) {
  const [tab, setTab] = useState("daily-deal");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSubcats, setSelectedSubcats] = useState([]);

  const filters = {
    ...baseFilter,
    tag: tab,
    subcategories: showSubcategoryFilter ? selectedSubcats : [],
  };

  const toggleSubcat = (slug) => {
    setSelectedSubcats((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filtersActive = selectedSubcats.length > 0;
  const clearFilters = () => setSelectedSubcats([]);

  // Whether the sidebar/sheet has anything to show
  const hasSidebar = showSubcategoryFilter && subcategories.length > 0;

  return (
    <div className={`container-wrap py-6 grid grid-cols-1 gap-6 items-start ${hasSidebar ? "md:grid-cols-[250px_1fr]" : ""}`}>
      {/* Sidebar — only if there are subcategories */}
      {hasSidebar && (
        <aside className="hidden md:flex bg-white border border-line rounded-2xl px-4.5 py-4 flex-col gap-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <span className="text-[15px] font-bold text-[#6a7180]">Filters</span>
            {filtersActive && (
              <button onClick={clearFilters} className="text-[15px] font-semibold text-text underline cursor-pointer">
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-semibold text-text uppercase">Subcategories</span>
            {subcategories.map((sc) => (
              <label key={sc.slug} className="flex items-center gap-2 cursor-pointer">
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
        </aside>
      )}

      {/* Main: tabs + grid */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Tabs + mobile filter button */}
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

          {/* Mobile filter button — only if there's a subcategory filter */}
          {hasSidebar && (
            <button
              onClick={() => setSheetOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-line rounded-lg text-[13px] font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
            </button>
          )}
        </div>

        {/* Mobile sheet — subcategories only */}
        {hasSidebar && (
          <FilterSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            groups={[
              {
                title: "Subcategories",
                options: subcategories.map((sc) => ({ label: sc.name, value: sc.slug })),
                selected: selectedSubcats,
                onSelect: toggleSubcat,
                multi: true,
              },
            ]}
          />
        )}

        {/* Mobile Clear filters */}
        {hasSidebar && filtersActive && (
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