const SITE_NAME = "UpcomingOffer";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://upcomingoffer.com"
).replace(/\/$/, "");

const DEFAULT_DESCRIPTION =
  "Verified deals, offers and coupons from top stores, updated daily. Save more on every purchase.";

function createCanonical(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildMetadata({
  seo,
  title,
  description,
  path = "",
  image,
  noindex = false,
  type = "website",
} = {}) {
  const metaTitle = seo?.title || title || SITE_NAME;

  const metaDescription =
    seo?.description || description || DEFAULT_DESCRIPTION;

  // Always build canonical URLs from the public Next.js domain and route.
  const canonical = createCanonical(path);

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical,
    },

    robots: {
      index: !noindex,
      follow: !noindex,
    },

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      type,
      ...(image
        ? {
            images: [{ url: image }],
          }
        : {}),
    },

    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}
