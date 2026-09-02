import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import DealListing from "@/components/deal/DealListing";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const subcategories = category.children?.nodes ?? [];


  return (
    <div>
      <h1 className="container-wrap pt-6 text-2xl font-bold">
        {category.name} Deals
      </h1>
      <DealListing
        baseFilter={{ category: category.slug }}
        subcategories={subcategories}
        showSubcategoryFilter={true}
      />
    </div>
  );
}
