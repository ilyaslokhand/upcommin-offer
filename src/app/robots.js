// Use the same public domain as your sitemap and metadata.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://upcomingoffer.com"
).replace(/\/$/, "");

export default function robots() {
  return {
    rules: {
      // The rule applies to all search crawlers.
      userAgent: "*",

      // Let crawlers visit public pages, deals, blogs, and images.
      allow: "/",

      // The Next.js API returns data, not public pages to browse.
      disallow: "/api/",
    },

    // Tell crawlers where the public Next.js sitemap lives.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
