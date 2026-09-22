import { fetchAllNodes } from "../fetchAllNodes";

// Blog posts: /blog/[slug]
const SITEMAP_POSTS_QUERY = `
  query SitemapPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function getSitemapPosts() {
  return fetchAllNodes(SITEMAP_POSTS_QUERY, "posts", 100);
}

// Deals: /deals/[slug]
const SITEMAP_DEALS_QUERY = `
  query SitemapDeals($first: Int!, $after: String) {
    deals(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function getSitemapDeals() {
  return fetchAllNodes(SITEMAP_DEALS_QUERY, "deals", 100);
}

// Stores: /store/[slug]
const SITEMAP_STORES_QUERY = `
  query SitemapStores($first: Int!, $after: String) {
    stores(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function getSitemapStores() {
  return fetchAllNodes(SITEMAP_STORES_QUERY, "stores", 20);
}

// Sales: /sale/[slug]
const SITEMAP_SALES_QUERY = `
  query SitemapSales($first: Int!, $after: String) {
    sales(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function getSitemapSales() {
  return fetchAllNodes(SITEMAP_SALES_QUERY, "sales", 20);
}

// Blog categories: /blog/category/[slug]
const SITEMAP_BLOG_CATEGORIES_QUERY = `
  query SitemapBlogCategories($first: Int!, $after: String) {
    categories(
      first: $first
      after: $after
      where: { hideEmpty: true }
    ) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export function getSitemapBlogCategories() {
  return fetchAllNodes(SITEMAP_BLOG_CATEGORIES_QUERY, "categories", 20);
}

// Parent deal categories and their subcategories.
const SITEMAP_DEAL_CATEGORIES_QUERY = `
  query SitemapDealCategories($first: Int!, $after: String) {
    dealCategories(
      first: $first
      after: $after
      where: { parent: 0 }
    ) {
      nodes {
        slug
        children(first: 100) {
          nodes {
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// run this query, read the dealCategories results, and fetch parent categories 20 at a time until all parents are collected.

export function getSitemapDealCategories() {
  return fetchAllNodes(SITEMAP_DEAL_CATEGORIES_QUERY, "dealCategories", 20);
}
