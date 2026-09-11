import Image from "next/image";
import Link from "next/link";

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, "").trim() ?? "";
}

export default function BlogCard({ post }) {
  const category = post.categories?.nodes?.[0]?.name;
  const img = post.featuredImage?.node?.sourceUrl;
  const date = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const excerpt = stripHtml(post.excerpt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white border border-line rounded-[14px] overflow-hidden flex flex-col hover:shadow-md transition group"
    >
      {/* Featured image + category badge */}
      <div className="relative h-[200px] w-full bg-[#e7e9f1]">
        {img && (
          <Image
            src={img}
            alt={post.featuredImage?.node?.altText || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        )}
        {category && (
          <span className="absolute top-3 left-3 bg-[rgba(28,28,28,0.85)] text-white rounded-[5px] px-2.5 py-1 text-[11px] font-bold uppercase">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <span className="text-[12px] font-medium text-muted">{date}</span>
        <h3 className="text-[16px] font-semibold leading-snug text-text line-clamp-2">
          {post.title}
        </h3>
        {excerpt && (
          <p className="text-[13px] text-muted line-clamp-2 leading-relaxed">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}