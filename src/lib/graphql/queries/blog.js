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