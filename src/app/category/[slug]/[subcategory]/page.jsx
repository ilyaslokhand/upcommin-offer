import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryHero from "@/components/common/CategoryHero";
import StoreSeoSection from "@/components/common/StoreSeoSection";
import { getAllDeals } from "@/lib/graphql/queries/deals";
import { buildDealsWhere } from "@/lib/deals/buildDealsWhere";


export default async function SubcategoryPage({ params }) {
    const { slug, subcategory } = await params;


    // Fetch the subcategory (it's a deal-category term, so same function works)
    const subcat = await getCategoryBySlug(subcategory);

    if (!subcat || !subcat.slug) {
        notFound();
    }

    const where = buildDealsWhere({
        category: subcat.slug,
        tag: "daily-deal",
    });

    const {
        deals: initialDeals,
        pageInfo: initialPageInfo,
    } = await getAllDeals({
        first: 20,
        after: null,
        where,
    });

    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: slug, href: `/category/${slug}` },  // parent category
                { label: subcat.name },  // current subcategory
            ]} />

            {/* Header */}
            <CategoryHero
                name={subcat.name}
                description={subcat.description}
                count={subcat.count}
                icon={subcat.categoryIcon}
            />

            {/* Deals — filtered to this subcategory, no subcategory filter in sidebar */}
            <DealListing
                baseFilter={{ category: subcat.slug }}
                tabs={[
                    { label: "Latest", value: "daily-deal" },
                    { label: "Hot", value: "hot" },
                ]}
                showFilter={false}
                initialDeals={initialDeals}
                initialPageInfo={initialPageInfo}
            />

            <StoreSeoSection
                seoDescription={subcat.seoDescription}
                faqs={subcat.faqs}
                storeName={subcat.name}
            />
        </div>
    );
}