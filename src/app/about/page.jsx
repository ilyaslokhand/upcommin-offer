import { getPageBySlug } from "@/lib/graphql/queries/pages";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import "./about.css";
import { buildMetadata } from "@/lib/seo/buildMetadata";


export const metadata = buildMetadata({
  title: "About UpcomingOffer",
  description:
    "Learn how UpcomingOffer discovers and shares verified online deals, discount coupons and shopping offers from popular stores across India.",
  path: "/about",
  type: "website",
});

export default async function AboutPage() {
  const page = await getPageBySlug("about-us");
  if (!page) notFound();

  return (
    <div >
     

      {/* Your full HTML + inline CSS renders as-is */}
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}