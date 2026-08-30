import { fetchGraphQL } from "../client";

const ALL_DEALS_QUERY = `
  query AllDeals {
    deals(first: 20) {
      nodes {
        id
        title
        slug
        date
        finalPrice
        originalPrice
        priceLabel
        dealType
        couponCode
        isExpired
        affiliateLink
        featuredImage {
          node { sourceUrl altText }
        }
        dealTags {
          nodes { name slug }
        }
        terms {
          nodes { name taxonomyName }
        }
      }
    }
  }
`;

export async function getAllDeals() {
  const data = await fetchGraphQL(ALL_DEALS_QUERY);
  return data?.deals?.nodes ?? [];
}

const DEALS_COUNT_QUERY = `
  query DealsCount {
    deals(first: 1000) {
      nodes { id }
    }
  }
`;

export async function getDealsCount() {
  const data = await fetchGraphQL(DEALS_COUNT_QUERY);
  return data?.deals?.nodes?.length ?? 0;
}