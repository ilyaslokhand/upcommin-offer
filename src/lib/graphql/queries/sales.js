import { fetchGraphQL } from "../client";

const ALL_SALES_QUERY = `
  query AllSales {
    sales(first: 20) {
      nodes {
        id
        name
        slug
        saleHeading
        saleSubtitle
        saleStatus
        startDate
        endDate
        saleStore
        bannerImage
        count
      }
    }
  }
`;

export async function getAllSales() {
  const data = await fetchGraphQL(ALL_SALES_QUERY);
  return data?.sales?.nodes ?? [];
}

const SALE_BY_SLUG_QUERY = `
  query SaleBySlug($slug: ID!) {
    sale(id: $slug, idType: SLUG) {
      name
      slug
      count
      saleHeading
      saleSubtitle
      saleStatus
      startDate
      endDate
      saleStore
      bannerImage
    }
  }
`;

export async function getSaleBySlug(slug) {
  const data = await fetchGraphQL(SALE_BY_SLUG_QUERY, { slug });
  return data?.sale ?? null;
}

