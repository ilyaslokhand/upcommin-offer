import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/graphql/queries/blog";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const readMin = Math.max(1, Math.ceil((post.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0) / 200));

  return (
    <main className="container-wrap py-8 max-w-190">
      <span className="text-xs text-brand font-medium">{post.categories?.nodes?.[0]?.name}</span>
      <h1 className="text-3xl mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-muted mb-6">
        <span>{post.author?.node?.name}</span><span>·</span>
        <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        <span>·</span><span>{readMin} min read</span>
      </div>
      {post.featuredImage?.node?.sourceUrl && (
        <img src={post.featuredImage.node.sourceUrl} alt={post.title} className="w-full rounded-card mb-6" />
      )}
      <article className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}