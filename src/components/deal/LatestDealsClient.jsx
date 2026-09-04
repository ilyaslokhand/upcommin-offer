"use client";
import { useState } from "react";
import DealFeed from "./DealFeed";

const TABS = [
  { label: "Daily Deals", value: "daily-deal" },
  { label: "Super Deals", value: "super-deal" },
  { label: "Hot", value: "hot" },
];

export default function LatestDealsClient() {
  const [tab, setTab] = useState("daily-deal");

  return (
    <section className="container-wrap pt-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          Latest Deals
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 rounded-lg cursor-pointer text-[13px] font-semibold whitespace-nowrap transition ${tab === t.value ? "bg-[#1c1c1c] text-white" : "bg-white border border-line text-muted hover:border-brand"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <DealFeed filters={{ tag: tab }} columns={4} />
    </section>
  );
}