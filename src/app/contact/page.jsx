import ContactPageClient from "./ContactPageClient";
import Breadcrumb from "@/components/common/Breadcrumb";

import { buildMetadata } from "@/lib/seo/buildMetadata";
import JsonLd from "@/lib/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "Contact UpcomingOffer",
  description:
    "Contact UpcomingOffer for questions, feedback, deal corrections, partnership enquiries or assistance with content published on our website.",
  path: "/contact",
  type: "website",
});

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema(
          breadcrumbItems,
          "/contact"
        )}
      />

      <Breadcrumb items={breadcrumbItems} />

      <ContactPageClient />
    </>
  );
}