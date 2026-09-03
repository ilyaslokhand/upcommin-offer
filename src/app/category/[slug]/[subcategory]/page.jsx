import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryHero from "@/components/common/CategoryHero";


export default async function SubcategoryPage({ params }) {
    const { slug, subcategory } = await params;


    // Fetch the subcategory (it's a deal-category term, so same function works)
    const subcat = await getCategoryBySlug(subcategory);

    if (!subcat || !subcat.slug) {
        notFound();
    }

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
                showSubcategoryFilter={false}
            />
        </div>
    );
}