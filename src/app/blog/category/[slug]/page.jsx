import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/graphql/queries/blog";
import BlogFeed from "@/components/blog/BlogFeed";
import Breadcrumb from "@/components/common/Breadcrumb";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { createMetaDescription } from "@/lib/seo/createMetaDescription";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import JsonLd from "@/lib/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getPostsByCategory(slug);

  if (!category) return {};

  const defaultTitle = "UpcomingOffer India's Deals Feed";
  const defaultDescription =
    "Verified loot deals, coupons and offers updated every hour.";

  const seoTitle =
    category.seo?.title === defaultTitle
      ? undefined
      : category.seo?.title;

  const seoDescription =
    category.seo?.description === defaultDescription
      ? undefined
      : category.seo?.description;

  return buildMetadata({
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonicalUrl: null,
    },
    title: `${category.name} Articles`,
    description:
      createMetaDescription(category.description) ||
      `Read the latest ${category.name} articles, offers, guides and money-saving updates.`,
    path: `/blog/category/${category.slug}`,
    type: "website",
  });
}

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;
  const category = await getPostsByCategory(slug);

  if (!category) notFound();

  // WordPress provides the first 20 posts and the cursor for Load More.
  const posts = category.posts?.nodes ?? [];
  const pageInfo = category.posts?.pageInfo ?? {
    hasNextPage: false,
    endCursor: null,
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: category.name },
  ];

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbSchema(
          breadcrumbItems,
          `/blog/category/${category.slug}`
        )}
      />

      <Breadcrumb items={breadcrumbItems} />

      <div className="container-wrap pt-4">
        <h1
          className="font-bold tracking-[-0.56px] text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {category.name}
        </h1>
      </div>

      <div className="container-wrap py-6">
        <BlogFeed
          key={category.slug}
          category={category.slug}
          initialPosts={posts}
          initialPageInfo={pageInfo}
        />
      </div>
    </div>
  );
}