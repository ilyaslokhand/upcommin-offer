import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryHero from "@/components/common/CategoryHero";


export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || !category.slug) notFound();

  const subcategories = category.children?.nodes ?? [];

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
        subcategories={subcategories}
        showSubcategoryFilter={true}
      />
    </div>
  );
}