import { getPageBySlug } from "@/lib/graphql/queries/pages";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import JsonLd from "@/lib/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";


export const metadata = buildMetadata({
    title: "Affiliate Disclosure",
    description:
        "Learn how UpcomingOffer uses affiliate links and may earn a commission from qualifying purchases at no additional cost to our users.",
    path: "/affiliate-disclosure",
    type: "website",
});

export default async function DisclosurePage() {
    const page = await getPageBySlug("affiliate-disclosure");   // your WP slug
    if (!page) notFound();

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: page.title },
    ];

    return (
        <div>
            <JsonLd
                data={buildBreadcrumbSchema(
                    breadcrumbItems,
                    `/${page.slug}`
                )}
            />

            <Breadcrumb items={breadcrumbItems} />

            <div className="container-wrap py-6">
                <div className=" mx-auto w-full">
                    <h1 className="font-bold tracking-[-0.56px] text-text mb-5" style={{ fontFamily: "var(--font-display)" }}>
                        {page.title}
                    </h1>
                    <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
            </div>
        </div>
    );
}