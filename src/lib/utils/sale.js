// Sale status badge (live / ended / upcoming)
export function getSaleBadge(sale) {
  if (sale.saleStatus === "ended") return { text: "Ended", tone: "ended" };
  if (sale.saleStatus === "upcoming") {
    const d = sale.startDate
      ? new Date(sale.startDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        })
      : "";
    return { text: d ? `Starts ${d}` : "Upcoming", tone: "upcoming" };
  }
  return { text: "Live Now", tone: "live" };
}

// Map a badge tone to its Tailwind classes
export function saleBadgeClass(tone) {
  if (tone === "live") return "bg-green-500/90 border-green-300 text-white";
  if (tone === "ended") return "bg-black/40 border-white/30 text-white/70";
  return "bg-black/30 border-white/40 text-white";
}

// Date only (no time) — for sale start/end dates
export function formatDateShort(date) {
  return date
    ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;
}