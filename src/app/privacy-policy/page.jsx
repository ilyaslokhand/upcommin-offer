import { getPageBySlug } from "@/lib/graphql/queries/pages";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
    title: "Privacy Policy",
    description:
        "Read the UpcomingOffer privacy policy to understand how we collect, use and protect information when you visit and interact with our website.",
    path: "/privacy-policy",
    type: "website",
});

export default async function PrivacyPage() {
    const page = await getPageBySlug("privacy-policy");   // your WP slug
    if (!page) notFound();

    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: page.title },
            ]} />

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