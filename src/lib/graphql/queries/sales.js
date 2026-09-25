import { fetchGraphQL } from "../client";
import { cache } from "react";

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
  const data = await fetchGraphQL(
    ALL_SALES_QUERY,
    {},
    {
      // Sales are refreshed immediately by the webhook.
      // One hour is the backup if the webhook fails.
      revalidate: 3600,
      tags: ["sales"],
    },
  );

  const sales = data?.sales?.nodes ?? [];

  // Hide ended sales from the frontend.
  return sales.filter((sale) => sale.saleStatus !== "ended");
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
      rankMathTitle
      rankMathDescription
      rankMathCanonical
    }
  }
`;

export const getSaleBySlug = cache(async (slug) => {
  const data = await fetchGraphQL(
    SALE_BY_SLUG_QUERY,
    { slug },
    {
      // Save each sale using its own slug label.
      // This lets WordPress refresh only the sale that changed.
      revalidate: 86400,
      tags: [`sale:${slug}`],
    },
  );

  return data?.sale ?? null;
});
