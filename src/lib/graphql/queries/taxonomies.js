import { fetchGraphQL } from "../client";

// fetch store count to show live count of stores on homepage

const STORES_COUNT_QUERY = `
  query StoresCount {
    stores(first: 1000) {
      nodes { id }
    }
  }
`;

export async function getStoresCount() {
  const data = await fetchGraphQL(STORES_COUNT_QUERY);
  return data?.stores?.nodes?.length ?? 0;
}

// fetch categories from wordpress for mega menu [ electronics, fashion, home & kitchen, etc. ]

const CATEGORIES_QUERY = `
  query Categories {
    dealCategories(first: 100) {
      nodes {
        id
        name
        slug
        categoryIcon
      }
    }
  }
`;

export async function getCategories() {
  const data = await fetchGraphQL(CATEGORIES_QUERY);
  return data?.dealCategories?.nodes ?? [];
}

// fetch stores from wordpress for mega menu

const STORES_QUERY = `
  query Stores {
    stores(first: 100) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export async function getStores() {
  const data = await fetchGraphQL(STORES_QUERY);
  return data?.stores?.nodes ?? [];
}

// fetch blog categories from wordpress or mega menu

const BLOG_CATEGORIES_QUERY = `
  query BlogCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export async function getBlogCategories() {
  const data = await fetchGraphQL(BLOG_CATEGORIES_QUERY);
  return data?.categories?.nodes ?? [];
}

// fetch trending stores which are used in homepage to show trending stores with their logo and reward points

const TRENDING_STORES_QUERY = `
  query TrendingStores {
    stores(first: 12) {
      nodes {
        id
        name
        slug
        count
        storeReward
        storeLogo
      }
    }
  }
`;

export async function getTrendingStores() {
  const data = await fetchGraphQL(TRENDING_STORES_QUERY);
  return data?.stores?.nodes ?? [];
}