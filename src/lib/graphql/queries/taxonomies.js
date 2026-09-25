import { cache } from "react";
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
  const data = await fetchGraphQL(
    STORES_COUNT_QUERY,
    {},
    {
      // Store count changes rarely, so keep it cached for one day.
      revalidate: 86400,
      tags: ["stores"],
    },
  );

  return data?.stores?.nodes?.length ?? 0;
}

// fetch categories from wordpress for mega menu [ electronics, fashion, home & kitchen, etc. ]

const CATEGORIES_QUERY = `
  query Categories {
    dealCategories(first: 50, where: { parent: 0 }) {
      nodes {
        name
        slug
        count
        categoryIcon
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getCategories() {
  const data = await fetchGraphQL(
    CATEGORIES_QUERY,
    {},
    {
      // Category names, icons and structure change rarely.
      revalidate: 86400,
      tags: ["categories"],
    },
  );

  return data?.dealCategories?.nodes ?? [];
}

// fetch stores from wordpress (mega menu, homepage trending, store index)
const STORES_QUERY = `
  query Stores($first: Int = 100) {
    stores(first: $first) {
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

export async function getStores({ first = 100 } = {}) {
  const data = await fetchGraphQL(
    STORES_QUERY,
    { first },
    {
      // Store names, logos and rewards change rarely.
      revalidate: 86400,
      tags: ["stores"],
    },
  );

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
  const data = await fetchGraphQL(
    BLOG_CATEGORIES_QUERY,
    {},
    {
      // Blog-category names and structure change rarely.
      revalidate: 86400,
      tags: ["blog-categories"],
    },
  );

  return data?.categories?.nodes ?? [];
}

// fetch category by slug to show category details on category page

const CATEGORY_BY_SLUG_QUERY = `
  query CategoryBySlug($slug: ID!) {
    dealCategory(id: $slug, idType: SLUG) {
      name
      slug
      description
      count
      categoryIcon
       seoDescription
         
    rankMathTitle
    rankMathDescription
    rankMathCanonical
      
      faqs {
        question
        answer
      }
      children {
        nodes {
          name
          slug
          count
          categoryIcon
        }
      }
    }
  }
`;

export const getCategoryBySlug = cache(async (slug) => {
  const data = await fetchGraphQL(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    {
      revalidate: 86400,
      tags: [`category:${slug}`],
    },
  );

  return data?.dealCategory ?? null;
});

// fetch store by slug to show store details on store page

const STORE_BY_SLUG_QUERY = `
  query StoreBySlug($slug: ID!) {
    store(id: $slug, idType: SLUG) {
      name
      slug
      description
      count
      storeLogo
      storeReward
       seoDescription
       rankMathTitle
      rankMathDescription
      rankMathCanonical
      faqs {
        question
        answer
      }
    }
  }
`;

export const getStoreBySlug = cache(async (slug) => {
  const data = await fetchGraphQL(
    STORE_BY_SLUG_QUERY,
    { slug },
    {
      revalidate: 86400,
      tags: [`store:${slug}`],
    },
  );

  return data?.store ?? null;
});

// fetch store categories by store slug to show store categories on store page

const STORE_CATEGORIES_QUERY = `
  query StoreCategories($store: String!) {
    storeCategories(store: $store) {
      name
      slug
      count
      categoryIcon
    }
  }
`;

export async function getStoreCategories(storeSlug) {
  const data = await fetchGraphQL(
    STORE_CATEGORIES_QUERY,
    { store: storeSlug },
    {
      revalidate: 86400,
      tags: ["deals", `store:${storeSlug}`],
    },
  );

  return data?.storeCategories ?? [];
}

const ALL_CATEGORIES_WITH_CHILDREN_QUERY = `
  query AllCategoriesWithChildren {
    dealCategories(first: 100, where: { parent: 0 }) {
      nodes {
        name
        slug
        count
        categoryIcon
        children {
          nodes {
            name
            slug
            count
            categoryIcon
          }
        }
      }
    }
  }
`;

export async function getAllCategoriesWithChildren() {
  const data = await fetchGraphQL(
    ALL_CATEGORIES_WITH_CHILDREN_QUERY,
    {},
    {
      revalidate: 86400,
      tags: ["categories"],
    },
  );

  return data?.dealCategories?.nodes ?? [];
}

const SALE_CATEGORIES_QUERY = `
  query SaleCategories($sale: String!) {
    saleCategories(sale: $sale) {
      name
      slug
    }
  }
`;

export async function getSaleCategories(saleSlug) {
  const data = await fetchGraphQL(
    SALE_CATEGORIES_QUERY,
    { sale: saleSlug },
    {
      revalidate: 86400,
      tags: ["deals", `sale:${saleSlug}`],   // This one uses deals because sale categories depend on which deals belong to that sale.
    },
  );

  return data?.saleCategories ?? [];
}
