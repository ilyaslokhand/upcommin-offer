import { createMetaDescription } from "./createMetaDescription";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://upcomingoffer.com"
).replace(/\/$/, "");

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "UpcomingOffer",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/upcomingofferblack@2x.png`,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "UpcomingOffer",
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items = [], currentPath = "") {
  if (!Array.isArray(items) || items.length === 0 || !currentPath) {
    return null;
  }

  const validItems = items.filter(
    (item, index) => item?.label && (item.href || index === items.length - 1),
  );

  if (validItems.length < 2) {
    return null;
  }

  const itemListElement = validItems.map((item, index) => {
    const isLast = index === validItems.length - 1;

    const path = isLast ? currentPath : item.href;

    const absoluteUrl = path.startsWith("http")
      ? path
      : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

    return {
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function buildDealSchema(deal, { storeName, path } = {}) {
  if (!deal?.title || !path) return null;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${cleanPath}`;

  // Convert values such as "₹1,299" into "1299".
  const rawPrice = String(deal.finalPrice ?? "")
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");

  const priceNumber = Number(rawPrice);

  // Product Offer schema requires a valid price.
  // Price 0 is allowed for a genuinely free product.
  if (rawPrice === "" || !Number.isFinite(priceNumber) || priceNumber < 0) {
    return null;
  }

  const isExpired =
    deal.isExpired === true ||
    deal.isExpired === "true" ||
    deal.isExpired === 1 ||
    deal.isExpired === "1";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: deal.title,
    url,
    offers: {
      "@type": "Offer",
      url,
      price: String(priceNumber),
      priceCurrency: "INR",
      availability: isExpired
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  const image = deal.featuredImage?.node?.sourceUrl;

  if (image) {
    schema.image = [image];
  }

  const description = createMetaDescription(deal.productDescription);

  if (description) {
    schema.description = description;
  }

  if (storeName) {
    schema.offers.seller = {
      "@type": "Organization",
      name: storeName,
    };
  }

  return schema;
}
