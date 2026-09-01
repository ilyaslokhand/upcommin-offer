import { fetchGraphQL } from "../client";


const ALL_DEALS_QUERY = `
  query AllDeals($first: Int = 20, $after: String, $where: RootQueryToDealConnectionWhereArgs) {
    deals(first: $first, after: $after, where: $where) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        date
        finalPrice
        originalPrice
        priceLabel
        discountPercent
        dealType
        couponCode
        isExpired
        affiliateLink
        featuredImage { node { sourceUrl altText } }
        dealTags { nodes { name slug } }
        terms { nodes { name taxonomyName } }
      }
    }
  }
`;

export async function getAllDeals({ first = 20, after = null, where = null } = {}) {
  const data = await fetchGraphQL(ALL_DEALS_QUERY, { first, after, where });
  return {
    deals: data?.deals?.nodes ?? [],
    pageInfo: data?.deals?.pageInfo ?? { hasNextPage: false, endCursor: null },
  };
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
