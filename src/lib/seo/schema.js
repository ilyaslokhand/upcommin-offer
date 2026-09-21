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

export function buildBreadcrumbSchema(
  items = [],
  currentPath = ""
) {
  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    !currentPath
  ) {
    return null;
  }

  const validItems = items.filter(
    (item, index) =>
      item?.label &&
      (item.href || index === items.length - 1)
  );

  if (validItems.length < 2) {
    return null;
  }

  const itemListElement = validItems.map(
    (item, index) => {
      const isLast =
        index === validItems.length - 1;

      const path = isLast
        ? currentPath
        : item.href;

      const absoluteUrl = path.startsWith("http")
        ? path
        : `${SITE_URL}${
            path.startsWith("/") ? path : `/${path}`
          }`;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: absoluteUrl,
      };
    }
  );

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}