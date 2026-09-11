import { fetchGraphQL } from "../client";

const PAGE_BY_SLUG_QUERY = `
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      seo {
        title
        description
        canonicalUrl
      }
    }
  }
`;

export async function getPageBySlug(slug) {
  const data = await fetchGraphQL(PAGE_BY_SLUG_QUERY, { slug });
  return data?.page ?? null;
}