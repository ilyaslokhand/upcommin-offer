// Calculate discount % from prices
export function getDiscount(final, original) {
  const f = parseFloat(final), o = parseFloat(original);
  if (!f || !o || o <= f) return null;
  return Math.round((o - f) / o * 100);
}

// Get a term (store/category/etc.) from the terms array by taxonomy
export function getTerm(terms, tax) {
  return terms?.nodes?.find((t) => t.taxonomyName === tax);
}

// "12m" / "2h" / "3d" from a date
export function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

// Full formatted date ("28 Jun 2026, 5:17 PM")
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

// Decode WordPress HTML entities (&amp; → &, etc.)
export function decode(str) {
  return str?.replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/&#8211;/g, "–") ?? "";
}