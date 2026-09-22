// These functions fetch all the slugs we need from WordPress.
import {
  getSitemapPosts,
  getSitemapDeals,
  getSitemapStores,
  getSitemapSales,
  getSitemapBlogCategories,
  getSitemapDealCategories,
} from "@/lib/graphql/queries/sitemap";

// This is the public website URL used at the start of every sitemap link.
// replace(/\/$/, "") removes a final "/" if one exists.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://upcomingoffer.com"
).replace(/\/$/, "");

// Next.js runs this function to create /sitemap.xml.
export default async function sitemap() {
  // Fetch all six types of WordPress content at the same time.
  // Each function already handles fetching more pages when needed.
  const [posts, deals, stores, sales, blogCategories, dealCategories] =
    await Promise.all([
      getSitemapPosts(),
      getSitemapDeals(),
      getSitemapStores(),
      getSitemapSales(),
      getSitemapBlogCategories(),
      getSitemapDealCategories(),
    ]);

  // These pages have fixed URLs, so we write their paths here.
  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy-policy",
    "/deals",
    "/store",
    "/category",
    "/blog",
  ];

  // Add the website URL to each fixed path.
  // Example: "/about" becomes "https://upcomingoffer.com/about".
  const staticPages = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  // Create a URL for every blog post that has a slug.
  const postPages = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
    }));

  // Create a URL for every deal that has a slug.
  const dealPages = deals
    .filter((deal) => deal.slug)
    .map((deal) => ({
      url: `${SITE_URL}/deals/${deal.slug}`,
    }));

  // Create a URL for every store that has a slug.
  const storePages = stores
    .filter((store) => store.slug)
    .map((store) => ({
      url: `${SITE_URL}/store/${store.slug}`,
    }));

  // Create a URL for every sale that has a slug.
  const salePages = sales
    .filter((sale) => sale.slug)
    .map((sale) => ({
      url: `${SITE_URL}/sale/${sale.slug}`,
    }));

  // Create a URL for every blog category that has a slug.
  const blogCategoryPages = blogCategories
    .filter((category) => category.slug)
    .map((category) => ({
      url: `${SITE_URL}/blog/category/${category.slug}`,
    }));

  // Go through each parent deal category.
  const categoryPages = dealCategories.flatMap((category) => {
    // Skip a parent category if it has no slug.
    if (!category.slug) return [];

    // Create the parent URL.
    // Example: /category/electronics
    const parentPage = {
      url: `${SITE_URL}/category/${category.slug}`,
    };

    // Create a URL for each child of this parent.
    // Example: /category/electronics/headphones
    const subcategoryPages = (category.children?.nodes ?? [])
      .filter((child) => child.slug)
      .map((child) => ({
        url: `${SITE_URL}/category/${category.slug}/${child.slug}`,
      }));

    // Add the parent and its children to the sitemap.
    return [parentPage, ...subcategoryPages];
  });

  // Give Next.js all the URLs so it can create sitemap.xml.
  return [
    ...staticPages,
    ...postPages,
    ...dealPages,
    ...storePages,
    ...salePages,
    ...blogCategoryPages,
    ...categoryPages,
  ];
}
