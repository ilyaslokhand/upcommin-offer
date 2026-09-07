"use client";
import { useState } from "react";
import DealFeed from "./DealFeed";
import FilterSheet from "@/components/ui/FilterSheet";


export default function DealListing({
  baseFilter = {},
  tabs = [],                      // ← each page passes its own tabs
  filterOptions = [],             // ← the sidebar filter list (subcategories OR categories)
  filterLabel = "Filters",        // ← sidebar heading ("Subcategories" / "Categories")
  filterParam = "subcategory",    // ← which URL param the filter uses ("subcategory" / "category")
  showFilter = false,             // ← show the sidebar filter?
  showCoupons = false,            // ← show the "Coupons (Coming Soon)" tab?
}) {
  const [tab, setTab] = useState(tabs[0]?.value ?? "");
  const [couponMode, setCouponMode] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);



  const filters = {
    ...baseFilter,
    tag: tab,
    [filterParam === "category" ? "category" : "subcategories"]:
      filterParam === "category" ? (selectedFilters[0] || undefined) : selectedFilters,
  };

  const toggleFilter = (slug) => {
    setSelectedFilters((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };


  const filtersActive = selectedFilters.length > 0;
  const clearFilters = () => setSelectedFilters([]);

  // Whether the sidebar/sheet has anything to show
  const hasSidebar = showFilter && filterOptions.length > 0;

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
            {filterOptions.map((opt) => (
              <label key={opt.slug} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(opt.slug)}
                  onChange={() => toggleFilter(opt.slug)}
                  className="size-4 accent-[#4c34d4] cursor-pointer"
                />
                <span className="text-[13px] text-[#6a7180]">{opt.name}</span>
              </label>
            ))}
          </div>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Tabs row */}
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="bg-white border border-line rounded-md p-1.5 flex gap-0.5 shrink-0">
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={() => { setTab(t.value); setCouponMode(false); }}
                className={`px-3 py-1 rounded-sm cursor-pointer text-[13px] font-bold flex items-center gap-1 transition ${tab === t.value && !couponMode ? "bg-[#1c1c1c] text-white" : "text-[#6a7180]"
                  }`}
              >
                {t.label}{t.value === "hot" && " 🔥"}
              </button>
            ))}

            {/* Coupons tab — coming soon, disabled */}
            {showCoupons && (
              <button
                disabled
                className="px-3 py-1 rounded-sm text-[13px] font-bold text-[#c5c9d3] cursor-not-allowed"
                title="Coming soon"
              >
                Coupons <span className="text-[10px]">(Soon)</span>
              </button>
            )}
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
            groups={[{
              title: filterLabel,
              options: filterOptions.map((o) => ({ label: o.name, value: o.slug })),
              selected: selectedFilters,
              onSelect: toggleFilter,
              multi: true,
            }]}
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

        <DealFeed filters={filters} columns={hasSidebar ? 3 : 4} />
      </div>
    </div>
  );
}