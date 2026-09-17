/** @type {import('next').NextConfig} */

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

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

const POST_SLUGS_QUERY = `
  query GetAllPostSlugs($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const BLOG_CATEGORY_SLUGS_QUERY = `
  query GetBlogCategorySlugs($first: Int!, $after: String) {
    categories(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const DEAL_CATEGORY_SLUGS_QUERY = `
  query GetDealCategorySlugs($first: Int!, $after: String) {
    dealCategories(
      first: $first
      after: $after
      where: { parent: 0 }
    ) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

async function getAllSlugs(query, connectionName) {
  if (!WORDPRESS_API_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is missing");
  }

  const slugs = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          first: 100,
          after,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${connectionName}: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors?.length) {
      throw new Error(result.errors[0].message);
    }

    const connection = result.data?.[connectionName];

    if (!connection) {
      throw new Error(`WordPress did not return ${connectionName}`);
    }

    for (const item of connection.nodes ?? []) {
      if (item.slug) {
        slugs.push(item.slug);
      }
    }

    hasNextPage = connection.pageInfo?.hasNextPage ?? false;

    after = connection.pageInfo?.endCursor ?? null;
  }

  return [...new Set(slugs)];
}

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
    const [postSlugs, blogCategorySlugs, dealCategorySlugs] = await Promise.all(
      [
        getAllSlugs(POST_SLUGS_QUERY, "posts"),
        getAllSlugs(BLOG_CATEGORY_SLUGS_QUERY, "categories"),
        getAllSlugs(DEAL_CATEGORY_SLUGS_QUERY, "dealCategories"),
      ],
    );

    const dealCategorySet = new Set(dealCategorySlugs);

    const postRedirects = postSlugs
      .filter((slug) => !RESERVED_SLUGS.has(slug))
      .map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      }));

    const blogCategoryRedirects = blogCategorySlugs
      .filter((slug) => !dealCategorySet.has(slug))
      .map((slug) => ({
        source: `/category/${slug}`,
        destination: `/blog/category/${slug}`,
        permanent: true,
      }));

    return [...postRedirects, ...blogCategoryRedirects];
  },
};

export default nextConfig;




/*
============================================================
BLOG AND BLOG-CATEGORY REDIRECT FLOW
============================================================

WHY THIS CODE EXISTS

The old WordPress URLs and new Next.js URLs are different.

Old blog post:
  /post-slug

New blog post:
  /blog/post-slug

Old blog category:
  /category/blog-category-slug

New blog category:
  /blog/category/blog-category-slug


============================================================
1. WORDPRESS GRAPHQL URL
============================================================

NEXT_PUBLIC_WORDPRESS_API_URL
            ↓
Gets the WordPress GraphQL URL from .env.local
            ↓
Current example:
https://upcomingoffer.com/graphql
            ↓
Future example:
https://cms.upcomingoffer.com/graphql


============================================================
2. GET ALL BLOG POST SLUGS
============================================================

Next.js sends POST_SLUGS_QUERY to WordPress
            ↓
WordPress returns the first 100 blog post slugs
            ↓
Example:
amazon-sale
binance-quiz
flipkart-offer
            ↓
Next.js checks hasNextPage
            ↓
If hasNextPage is true:
Use endCursor to request the next 100 posts
            ↓
Continue until hasNextPage becomes false
            ↓
Next.js now has every old blog post slug


============================================================
3. GET ALL BLOG-CATEGORY SLUGS
============================================================

Next.js sends BLOG_CATEGORY_SLUGS_QUERY
            ↓
The query uses the normal WordPress "categories" taxonomy
            ↓
It does not get deal categories
            ↓
Example result:
cashback-offers
earn-paytm-cash
amazon-funzone
            ↓
Pagination continues until all blog categories are collected


============================================================
4. GET PARENT DEAL-CATEGORY SLUGS
============================================================

Next.js sends DEAL_CATEGORY_SLUGS_QUERY
            ↓
The query uses the custom "dealCategories" taxonomy
            ↓
where: { parent: 0 } means:
Only retrieve parent deal categories
            ↓
Example result:
electronics
beauty
grocery
fashion
            ↓
These slugs are used only as a safety check


============================================================
5. WHY DEAL CATEGORIES ARE CHECKED
============================================================

A deal category might use:
  /category/electronics

An old blog category also starts with:
  /category/category-slug

If both taxonomies contain "electronics", creating this redirect:

  /category/electronics
            ↓
  /blog/category/electronics

would break the deal-category page.

Therefore:

Get all blog-category slugs
            ↓
Compare them with deal-category slugs
            ↓
If the slug is a deal category:
Do not create the blog-category redirect
            ↓
If it is only a blog category:
Create the redirect


============================================================
6. getAllSlugs FUNCTION
============================================================

getAllSlugs receives:

1. The GraphQL query to run
2. The GraphQL connection name to read

Example:

getAllSlugs(POST_SLUGS_QUERY, "posts")

            ↓

Runs the post-slug query
            ↓
Reads result.data.posts
            ↓
Collects all post slugs
            ↓
Returns the completed slug array

The same function can retrieve:

posts
categories
dealCategories

This prevents writing the same pagination code three times.


============================================================
7. Promise.all
============================================================

Promise.all starts these three requests together:

1. Blog post slugs
2. Blog-category slugs
3. Deal-category slugs

            ↓

Next.js does not wait for request 1 before starting request 2
            ↓
All three run at approximately the same time
            ↓
This makes the build faster


============================================================
8. BLOG POST REDIRECTS
============================================================

Next.js gets every blog post slug
            ↓
It removes protected Next.js page slugs such as:

about
contact
deals
store
category
sale
blog

            ↓

This prevents mistakes such as:

/about
            ↓
/blog/about

            ↓

Each remaining post slug becomes an exact redirect.

Example:

/binance-quiz
            ↓
308 Permanent Redirect
            ↓
/blog/binance-quiz


============================================================
9. BLOG-CATEGORY REDIRECTS
============================================================

Next.js gets all normal WordPress blog categories
            ↓
It removes any slug also used by a parent deal category
            ↓
Each remaining blog category becomes an exact redirect

Example:

/category/cashback-offers
            ↓
308 Permanent Redirect
            ↓
/blog/category/cashback-offers


============================================================
10. DEAL ROUTES REMAIN UNCHANGED
============================================================

Parent deal category:

/category/electronics
            ↓
No redirect
            ↓
The deal-category page opens normally


Deal subcategory:

/category/beauty/lipstick
            ↓
No redirect
            ↓
The deal-subcategory page opens normally


============================================================
11. WHEN THIS CODE RUNS
============================================================

Vercel starts the Next.js deployment
            ↓
Next.js connects to WPGraphQL
            ↓
Next.js collects all required slugs
            ↓
Next.js generates exact redirect rules
            ↓
Vercel deploys those rules
            ↓
Visitors use the prepared redirects

WordPress is not queried every time a visitor opens an old URL.


============================================================
12. RANDOM URL BEHAVIOUR
============================================================

Visitor or bot requests:

/random-fake-url
            ↓
No exact redirect exists
            ↓
Next.js returns 404
            ↓
WordPress is not contacted


============================================================
FINAL RESULT
============================================================

Old blog post:
  /post-slug
            ↓
  /blog/post-slug


Old blog category:
  /category/blog-category-slug
            ↓
  /blog/category/blog-category-slug


Parent deal category:
  /category/electronics
            ↓
  Remains unchanged


Deal subcategory:
  /category/beauty/lipstick
            ↓
  Remains unchanged
============================================================
*/