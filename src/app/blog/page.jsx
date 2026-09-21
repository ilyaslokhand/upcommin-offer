import Breadcrumb from "@/components/common/Breadcrumb";
import BlogFeed from "@/components/blog/BlogFeed";
import { getPosts } from "@/lib/graphql/queries/blog";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import JsonLd from "@/lib/seo/JsonLd";

export const metadata = buildMetadata({
    title: "Latest Deals, Offers & Savings Guides",
    description:
        "Read the latest deals, offers, shopping guides, cashback tips and money-saving articles from UpcomingOffer.",
    path: "/blog",
    type: "website",
});

export default async function BlogPage() {

    const { posts, pageInfo } = await getPosts({
        first: 20,
    });

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Blog" },
    ];

    return (
        <div>
            <JsonLd
                data={buildBreadcrumbSchema(
                    breadcrumbItems,
                    "/blog"
                )}
            />

            <Breadcrumb items={breadcrumbItems} />

            <div className="container-wrap pt-4">
                <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
                    Latest Articles
                </h1>
            </div>

            <div className="container-wrap py-6">
                <BlogFeed
                    initialPosts={posts}
                    initialPageInfo={pageInfo}
                />
            </div>
        </div>
    );
}