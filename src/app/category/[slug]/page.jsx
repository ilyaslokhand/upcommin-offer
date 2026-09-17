import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryHero from "@/components/common/CategoryHero";
import StoreSeoSection from "@/components/common/StoreSeoSection";
import { getAllDeals } from "@/lib/graphql/queries/deals";
import { buildDealsWhere } from "@/lib/deals/buildDealsWhere";
import { buildMetadata } from "@/lib/seo/buildMetadata";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return {};

  return buildMetadata({
    seo: {
      title: category.rankMathTitle,
      description: category.rankMathDescription,
      canonicalUrl: category.rankMathCanonical,
    },
    title: category.name,
    path: `/category/${category.slug}`,
    type: "website",
  });
}



export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || !category.slug) notFound();


  const subcategories = category.children?.nodes ?? [];

  const where = buildDealsWhere({
    category: category.slug,
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
        { label: "Categories", href: "/category" },
        { label: category.name },  // current — no href
      ]} />

      {/* Hero */}
      <CategoryHero
        name={category.name}
        description={category.description}
        count={category.count}
        icon={category.categoryIcon}
      />

      {/* Listing */}
      <DealListing
        baseFilter={{ category: category.slug }}
        tabs={[{ label: "Latest", value: "daily-deal" }, { label: "Hot", value: "hot" }]}
        filterOptions={subcategories}
        filterLabel="Subcategories"
        filterParam="subcategory"
        showFilter={true}
        initialDeals={initialDeals}
        initialPageInfo={initialPageInfo}

      />

      <StoreSeoSection
        seoDescription={category.seoDescription}
        faqs={category.faqs}
        storeName={category.name}
      />

    </div>
  );
}