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

export async function getAllDeals({
  first = 20,
  after = null,
  where = null,
} = {}) {
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

// Single deal by slug (for the deal detail page)
const DEAL_BY_SLUG_QUERY = `
  query DealBySlug($slug: ID!) {
    deal(id: $slug, idType: SLUG) {
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
      affiliateLink
      isExpired
      productDescription
      moreAbout
      featuredImage { node { sourceUrl altText } }
      terms { nodes { name taxonomyName slug } }
      seo { title description canonicalUrl }
      bankOffers {
        bankName
        offerType
        discountValue
        minPurchase
        maxDiscount
        offerText
      }
    }
  }
`;

export async function getDealBySlug(slug) {
  const data = await fetchGraphQL(DEAL_BY_SLUG_QUERY, { slug });
  return data?.deal ?? null;
}

const STORE_DEALS_QUERY = `
  query StoreDeals($store: String!, $first: Int = 10) {
    deals(first: $first, where: {
      taxQuery: {
        taxArray: [
          { taxonomy: STORE, field: SLUG, terms: [$store], operator: IN }
        ]
      },
      excludeExpired: true
    }) {
      nodes {
        id
        title
        slug
        finalPrice
        originalPrice
        priceLabel
        discountPercent
        dealType
        affiliateLink
        isExpired
        date
        featuredImage { node { sourceUrl altText } }
        terms { nodes { name taxonomyName slug } }
      }
    }
  }
`;

export async function getStoreDeals(storeSlug, first = 10) {
  const data = await fetchGraphQL(STORE_DEALS_QUERY, {
    store: storeSlug,
    first,
  });
  return data?.deals?.nodes ?? [];
}
