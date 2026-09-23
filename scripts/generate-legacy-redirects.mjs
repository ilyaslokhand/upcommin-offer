import { mkdir, writeFile } from "node:fs/promises";

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is missing from .env.local");
}

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

async function generateRedirectData() {
  console.log("Downloading WordPress slugs...");

  const [postSlugs, blogCategorySlugs, dealCategorySlugs] = await Promise.all([
    getAllSlugs(POST_SLUGS_QUERY, "posts"),
    getAllSlugs(BLOG_CATEGORY_SLUGS_QUERY, "categories"),
    getAllSlugs(DEAL_CATEGORY_SLUGS_QUERY, "dealCategories"),
  ]);

  const redirectData = {
    postSlugs,
    blogCategorySlugs,
    dealCategorySlugs,
  };

  await mkdir("src/lib/seo", {
    recursive: true,
  });

  await writeFile(
    "src/lib/seo/legacyRedirects.json",
    `${JSON.stringify(redirectData, null, 2)}\n`,
    "utf8",
  );

  console.log("Redirect file created successfully.");
  console.log(`Posts: ${postSlugs.length}`);
  console.log(`Blog categories: ${blogCategorySlugs.length}`);
  console.log(`Deal categories: ${dealCategorySlugs.length}`);
}

generateRedirectData().catch((error) => {
  console.error("Could not generate redirects:", error);
  process.exit(1);
});
