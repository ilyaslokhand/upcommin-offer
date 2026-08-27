import { fetchGraphQL } from "../client";

const RECENT_POSTS_QUERY = `
  query RecentPosts {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
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

export async function getRecentPosts() {
  const data = await fetchGraphQL(RECENT_POSTS_QUERY);
  return data?.posts?.nodes ?? [];
}

// Posts in a specific category
const POSTS_BY_CATEGORY_QUERY = `
  query PostsByCategory($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      name
      slug
      description
      posts(first: 24, where: { orderby: { field: DATE, order: DESC } }) {
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

export async function getPostsByCategory(slug) {
  const data = await fetchGraphQL(POSTS_BY_CATEGORY_QUERY, { slug });
  return data?.category ?? null;
}

// One full blog post by slug
const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      date
      author { node { name } }
      featuredImage { node { sourceUrl altText } }
      categories(first: 3) { nodes { name slug } }
      seo { title description canonicalUrl }
    }
  }
`;

export async function getPostBySlug(slug) {
  const data = await fetchGraphQL(POST_BY_SLUG_QUERY, { slug });
  return data?.post ?? null;
}