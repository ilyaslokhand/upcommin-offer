import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import Link from "next/link";
import { notFound } from "next/navigation";

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
            <div className="container-wrap pt-6 flex items-center gap-2.5 text-[15px]">
                <Link href="/" className="text-[#6a7180] font-medium hover:text-brand">Home</Link>
                <span className="text-muted">/</span>
                <Link href={`/category/${slug}`} className="text-[#6a7180] font-medium hover:text-brand capitalize">{slug}</Link>
                <span className="text-muted">/</span>
                <span className="text-[#6a7180] font-medium">{subcat.name}</span>
            </div>

            {/* Header */}
            <div className="container-wrap pt-4">
                <div className="bg-white border border-line rounded-[24px] px-6 py-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 min-w-0">
                        <div className="size-[50px] bg-[#f1f1f1] rounded-[8px] flex items-center justify-center shrink-0 overflow-hidden">
                            {subcat.categoryIcon && <img src={subcat.categoryIcon} alt={subcat.name} className="size-7 object-contain" />}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                            <h1 className="tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                                {subcat.name} Deals
                            </h1>
                            {subcat.description && <p className="text-[15px] text-[#6a7180]">{subcat.description}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                        <span className="text-[22px] font-extrabold text-text">{subcat.count ?? 0}</span>
                        <span className="text-[13px] text-[#6a7180]">active deals</span>
                    </div>
                </div>
            </div>

            {/* Deals — filtered to this subcategory, no subcategory filter in sidebar */}
            <DealListing
                baseFilter={{ category: subcat.slug }}
                showSubcategoryFilter={false}
            />
        </div>
    );
}