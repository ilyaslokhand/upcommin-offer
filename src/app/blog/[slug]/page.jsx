import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/graphql/queries/blog";
import Comments from "@/components/common/Comments";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogCard from "@/components/common/BlogCard";
import Image from "next/image";
import { removeInlineStyles } from "@/lib/utils/content";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { createMetaDescription } from "@/lib/seo/createMetaDescription";
import JsonLd from "@/lib/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return buildMetadata({
    seo: {
      title: post.seo?.title,
      description: post.seo?.description,
      canonicalUrl: null,
    },
    title: post.title,
    description: createMetaDescription(post.content),
    path: `/blog/${post.slug}`,
    image: post.featuredImage?.node?.sourceUrl,
    type: "article",
  });
}


export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const [post, { posts: recentPosts }] = await Promise.all([
    getPostBySlug(slug),
    getPosts({ first: 3 }),
  ]);
  if (!post) notFound();


  const readMin = Math.max(
    1,
    Math.ceil((post.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0) / 200)
  );
  const category = post.categories?.nodes?.[0];
  const otherPosts = recentPosts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const cleanedContent = removeInlineStyles(post.content);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <div >
      {/* Breadcrumb */}
      <JsonLd
        data={buildBreadcrumbSchema(
          breadcrumbItems,
          `/blog/${post.slug}`
        )}
      />

      <Breadcrumb items={breadcrumbItems} />

      {/* Blog content — 870px centered inside container */}
      <div className="container-wrap py-6">
        <article className="w-full max-w-4xl">
          <div className="bg-white border border-[#EEEBFD] rounded-[16px] p-5">
            {category && (
              <span className="text-[13px] text-brand font-semibold">{category.name}</span>
            )}

            <h1 className="text-3xl mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-[13px] text-muted mb-5">
              <span>{post.author?.node?.name}</span>
              <span>·</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{readMin} min read</span>
            </div>

            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full aspect-video rounded-[12px] overflow-hidden mb-6">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width:870px) 100vw, 870px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Your HTML/CSS content renders as-is */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: cleanedContent }} />
          </div>
        </article>
      </div>

      {/* Comments — 870px centered inside container */}
      <div className="container-wrap pb-8 ">
        <div className=" w-full max-w-4xl  lg:block bg-white p-6 border border-line rounded-[16px]">
          <Comments contentId={post.databaseId} initialCount={post.commentCount} />
        </div>
      </div>

      {/* Recent Posts — full width */}
      {otherPosts.length > 0 && (
        <div className="container-wrap  pb-12">
          <h2
            className="font-bold tracking-[-0.56px] text-text mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl">
            {otherPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}