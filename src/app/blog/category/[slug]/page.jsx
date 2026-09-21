import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/graphql/queries/blog";
import BlogCard from "@/components/common/BlogCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { createMetaDescription } from "@/lib/seo/createMetaDescription";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import JsonLd from "@/lib/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getPostsByCategory(slug);

  if (!category) return {};

  const defaultTitle =
    "UpcomingOffer India's Deals Feed";

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

  const posts = category.posts?.nodes ?? [];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: category.name },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <JsonLd
        data={buildBreadcrumbSchema(
          breadcrumbItems,
          `/blog/category/${category.slug}`
        )}
      />

      <Breadcrumb items={breadcrumbItems} />

      {/* Heading */}
      <div className="container-wrap pt-4">
        <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          {category.name}
        </h1>
        <p className="text-muted mt-1">{posts.length} articles</p>
      </div>

      {/* Posts grid — 4 per row, reusing BlogCard */}
      <div className="container-wrap py-6">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-4 gap-5">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-10">No articles in this category yet.</p>
        )}
      </div>
    </div>
  );
}