import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/graphql/queries/blog";
import BlogCard from "@/components/common/BlogCard";
import Breadcrumb from "@/components/common/Breadcrumb";

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;
  const category = await getPostsByCategory(slug);
  if (!category) notFound();

  const posts = category.posts?.nodes ?? [];

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.name },
        ]}
      />

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