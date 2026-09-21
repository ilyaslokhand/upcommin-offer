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
