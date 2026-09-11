import { getPageBySlug } from "@/lib/graphql/queries/pages";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import "./about.css";

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