import Breadcrumb from "@/components/common/Breadcrumb";
import DealFeed from "@/components/deal/DealFeed";
import { getAllDeals } from "@/lib/graphql/queries/deals";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import JsonLd from "@/lib/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";


export const metadata = buildMetadata({
    title: "Latest Deals, Coupons & Offers in India",
    description:
        "Discover the latest online deals, discount coupons and shopping offers from Amazon, Flipkart, Myntra and other popular stores in India.",
    path: "/deals",
    type: "website",
});

export default async function DealsPage() {
    const { deals, pageInfo } = await getAllDeals({
        first: 20,
    });

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Deals" },
    ];

    return (
        <div>
            <JsonLd
                data={buildBreadcrumbSchema(
                    breadcrumbItems,
                    "/deals"
                )}
            />

            <Breadcrumb items={breadcrumbItems} />

            <div className="container-wrap pt-4">
                <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
                    All Deals
                </h1>
            </div>

            <div className="container-wrap py-6">
                <DealFeed filters={{}} columns={4} initialDeals={deals}
                    initialPageInfo={pageInfo} />
            </div>
        </div>
    );
}