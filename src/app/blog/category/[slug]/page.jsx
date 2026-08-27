import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/graphql/queries/blog";

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;
  const category = await getPostsByCategory(slug);
  if (!category) notFound();

  const posts = category.posts?.nodes ?? [];

  return (
    <main className="container-wrap py-8">
      <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-display)" }}>{category.name}</h1>
      <p className="text-muted mb-8">{posts.length} articles</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block bg-surface border border-line rounded-card overflow-hidden hover:shadow-lg transition">
            {post.featuredImage?.node?.sourceUrl && (
              <img src={post.featuredImage.node.sourceUrl} alt={post.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <span className="text-xs text-brand font-medium">{post.categories?.nodes?.[0]?.name}</span>
              <h2 className="text-base font-semibold mt-1 line-clamp-2">{post.title}</h2>
              <p className="text-xs text-muted mt-2">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}