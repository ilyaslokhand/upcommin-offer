import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import Link from "next/link";
import { notFound } from "next/navigation";

// decode HTML entities like &amp;
function decode(str) {
  return str?.replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/&#8211;/g, "–") ?? "";
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || !category.slug) notFound();

  const subcategories = category.children?.nodes ?? [];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-wrap pt-6 flex items-center gap-2.5 text-[15px]">
        <Link href="/" className="text-[#6a7180] font-medium hover:text-brand">Home</Link>
        <span className="text-muted">/</span>
        <Link href="/category" className="text-[#6a7180] font-medium hover:text-brand">Categories</Link>
        <span className="text-muted">/</span>
        <span className="text-text font-medium">{category.name}</span>
      </div>

      {/* Hero */}
      <div className="container-wrap pt-4">
        <div className="bg-white border border-line rounded-[24px] px-5 py-5 md:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Icon + title + description */}
          <div className="flex items-center gap-4 md:gap-5 min-w-0">
            <div className="size-12.5 bg-[#f1f1f1] rounded-[8px] flex items-center justify-center shrink-0 overflow-hidden">
              {category.categoryIcon && (
                <img src={category.categoryIcon} alt={category.name} className="size-7 object-contain" />
              )}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h1 className="tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                {category.name} Deals
              </h1>
              {category.description && (
                <p className="text-[13px] md:text-[15px] text-[#6a7180]">{decode(category.description)}</p>
              )}
            </div>
          </div>

          {/* Count + active deals — row on mobile, stacked column on desktop */}
          <div className="flex items-center gap-2 md:flex-col md:items-end shrink-0 justify-center md:justify-start">
            <span className="text-[22px] font-extrabold text-text leading-none">{category.count ?? 0}</span>
            <span className="text-[13px] text-[#6a7180]">active deals</span>
          </div>
        </div>
      </div>

      {/* Listing */}
      <DealListing
        baseFilter={{ category: category.slug }}
        subcategories={subcategories}
        showSubcategoryFilter={true}
      />
    </div>
  );
}