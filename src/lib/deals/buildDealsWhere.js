export function buildDealsWhere({
  tag,
  sale,
  category,
  store,
  search,
  subcategories = [],
} = {}) {
  const taxArray = [];

  if (tag) {
    taxArray.push({
      taxonomy: "DEALTAG",
      field: "SLUG",
      terms: [tag],
      operator: "IN",
    });
  }

  if (sale) {
    taxArray.push({
      taxonomy: "SALE",
      field: "SLUG",
      terms: [sale],
      operator: "IN",
    });
  }

  if (store) {
    taxArray.push({
      taxonomy: "STORE",
      field: "SLUG",
      terms: [store],
      operator: "IN",
    });
  }

  if (subcategories.length) {
    taxArray.push({
      taxonomy: "DEALCATEGORY",
      field: "SLUG",
      terms: subcategories,
      operator: "IN",
    });
  } else if (category) {
    taxArray.push({
      taxonomy: "DEALCATEGORY",
      field: "SLUG",
      terms: [category],
      operator: "IN",
    });
  }

  // Add a text search when the keyword is not an exact store match.
  const where = {};
  if (search) where.search = search;

  // Keep your existing taxonomy filters.
  if (taxArray.length) {
    where.taxQuery = {
      relation: "AND",
      taxArray,
    };
  }

  return where;
}
