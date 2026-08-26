import { fetchGraphQL } from "../client";

const ALL_SALES_QUERY = `
  query AllSales {
    sales(first: 10) {
      nodes {
        id
        title
        slug
        saleHeading
        saleSubtitle
        saleStatus
        startDate
        endDate
        saleStore
        featuredImage {
          node { sourceUrl altText }
        }
      }
    }
  }
`;

export async function getAllSales() {
  const data = await fetchGraphQL(ALL_SALES_QUERY);
  return data?.sales?.nodes ?? [];
}