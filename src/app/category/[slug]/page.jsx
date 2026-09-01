import { getCategoryBySlug } from "@/lib/graphql/queries/taxonomies";
import CategoryListing from "@/components/deal/CategoryListing";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  return <CategoryListing category={category} />;
}