import Breadcrumb from "@/components/common/Breadcrumb";
import CategoryGrid from "@/components/common/CategoryGrid";
import CategorySections from "@/components/common/CategorySections";
import { getAllCategoriesWithChildren } from "@/lib/graphql/queries/taxonomies";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import JsonLd from "@/lib/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "Shop Deals by Category in India",
  description:
    "Browse the latest deals and offers across electronics, fashion, grocery, beauty, home appliances and other popular shopping categories.",
  path: "/category",
  type: "website",
});

export default async function CategoriesPage() {
  const categories = await getAllCategoriesWithChildren();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories" },
  ];

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbSchema(
          breadcrumbItems,
          "/category"
        )}
      />

      <Breadcrumb items={breadcrumbItems} />

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