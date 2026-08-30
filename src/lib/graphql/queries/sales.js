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