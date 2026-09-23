import { readFileSync } from "node:fs";

/** @type {import('next').NextConfig} */

// Read the saved WordPress slugs from the local JSON file.
const redirectData = JSON.parse(
  readFileSync(
    new URL("./src/lib/seo/legacyRedirects.json", import.meta.url),
    "utf8",
  ),
);

const RESERVED_SLUGS = new Set([
  "about",
  "affiliate-disclosure",
  "api",
  "blog",
  "category",
  "contact",
  "deals",
  "privacy-policy",
  "sale",
  "store",
]);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upcomingoffer.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  async redirects() {
    const {
      postSlugs = [],
      blogCategorySlugs = [],
      dealCategorySlugs = [],
    } = redirectData;

    // Used to prevent blog-category redirects from
    // overwriting real deal-category pages.
    const dealCategorySet = new Set(dealCategorySlugs);

    const manualRedirects = [
      {
        source: "/blog/category",
        destination: "/blog",
        permanent: true,
      },
    ];

    // Old WordPress post:
    // /post-slug → /blog/post-slug
    const postRedirects = postSlugs
      .filter((slug) => !RESERVED_SLUGS.has(slug))
      .map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      }));

    // Old WordPress blog category:
    // /category/category-slug
    // → /blog/category/category-slug
    const blogCategoryRedirects = blogCategorySlugs
      .filter((slug) => !dealCategorySet.has(slug))
      .map((slug) => ({
        source: `/category/${slug}`,
        destination: `/blog/category/${slug}`,
        permanent: true,
      }));

    return [...postRedirects, ...blogCategoryRedirects, ...manualRedirects];
  },
};

export default nextConfig;
