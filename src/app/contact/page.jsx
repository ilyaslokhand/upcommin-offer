import ContactPageClient from "./ContactPageClient";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Contact UpcomingOffer",
  description:
    "Contact UpcomingOffer for questions, feedback, deal corrections, partnership enquiries or assistance with content published on our website.",
  path: "/contact",
  type: "website",
});

export default function ContactPage() {
  return <ContactPageClient />;
}