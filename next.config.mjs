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

async function getAllPostSlugs() {
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
        query: POST_SLUGS_QUERY,
        variables: {
          first: 100,
          after,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog slugs: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors?.length) {
      throw new Error(result.errors[0].message);
    }

    const posts = result.data?.posts;

    if (!posts) {
      throw new Error("WordPress did not return the blog posts");
    }

    for (const post of posts.nodes ?? []) {
      if (post.slug) {
        slugs.push(post.slug);
      }
    }

    hasNextPage = posts.pageInfo?.hasNextPage ?? false;

    after = posts.pageInfo?.endCursor ?? null;
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
    const postSlugs = await getAllPostSlugs();

    return postSlugs
      .filter((slug) => !RESERVED_SLUGS.has(slug))
      .map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      }));
  },
};

export default nextConfig;


// Get all old blog names from WordPress
// ↓
// Protect your existing Next.js pages
// ↓
// Create exact permanent redirects
// ↓
// Old blog URL automatically opens the new blog URL