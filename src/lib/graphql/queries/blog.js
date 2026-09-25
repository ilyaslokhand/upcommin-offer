import { fetchGraphQL } from "../client";
import { cache } from "react";

const POSTS_QUERY = `
  query Posts($first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node { sourceUrl altText }
        }
        categories(first: 1) {
          nodes { name slug }
        }
      }
    }
  }
`;

export async function getPosts({ first = 12, after = null } = {}) {
  const data = await fetchGraphQL(
    POSTS_QUERY,
    { first, after },
    {
      // Save blog lists for one day as a backup.
      // The WordPress webhook will normally refresh them immediately.
      revalidate: 86400,
      tags: ["blogs"],
    },
  );
  return {
    posts: data?.posts?.nodes ?? [],
    pageInfo: data?.posts?.pageInfo ?? { hasNextPage: false, endCursor: null },
  };
}

// Posts in a specific category
const POSTS_BY_CATEGORY_QUERY = `
  query PostsByCategory($slug: ID!, $after: String) {
    category(id: $slug, idType: SLUG) {
      name
      slug
      description
      seo {
        title
        description
        canonicalUrl
      }
      posts(
        first: 20
        after: $after
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
          categories(first: 1) { nodes { name slug } }
        }
      }
    }
  }
`;

export const getPostsByCategory = cache(async (slug, after = null) => {
  const data = await fetchGraphQL(
    POSTS_BY_CATEGORY_QUERY,
    { slug, after },
    {
      // Keep blog-category pages cached for one day.
      // Blog changes normally refresh them through the webhook.
      revalidate: 86400,
      tags: ["blogs"],
    },
  );

  return data?.category ?? null;
});

// One full blog post by slug
const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      databaseId
      commentCount
      slug
      content
      date
      modified
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories(first: 3) {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        description
        canonicalUrl
      }
    }
  }
`;

export const getPostBySlug = cache(async (slug) => {
  const data = await fetchGraphQL(
    POST_BY_SLUG_QUERY,
    { slug },
    {
      // Save each blog post using its own slug label.
      // This lets WordPress refresh only the post that changed.
      revalidate: 86400,
      tags: [`blog:${slug}`],
    },
  );
  return data?.post ?? null;
});
