import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryGrid from "@/components/common/CategoryGrid";
import CategorySections from "@/components/common/CategorySections";
import { getAllCategoriesWithChildren } from "@/lib/graphql/queries/taxonomies";


export default async function CategoriesPage() {
  const categories = await getAllCategoriesWithChildren();

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />

      <div className="container-wrap pt-4">
        <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          Shop Smarter: Explore Deals Across Top Categories
        </h1>
      </div>

      <div className="container-wrap pt-6">
        <CategoryGrid categories={categories} columns={5} />
      </div>

      <div className="container-wrap py-8">
        <CategorySections categories={categories} />
      </div>

    </div>
  );
}