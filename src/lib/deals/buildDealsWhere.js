export function buildDealsWhere({
  tag,
  sale,
  category,
  store,
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

  return taxArray.length
    ? {
        taxQuery: {
          relation: "AND",
          taxArray,
        },
      }
    : {};
}
