import Image from "next/image";
import Link from "next/link";

function readTime(content, excerpt) {
  const text = (content || excerpt || "").replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogCard({ post }) {
  const category = post.categories?.nodes?.[0]?.name;
  const img = post.featuredImage?.node?.sourceUrl;
  const date = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const mins = readTime(post.content, post.excerpt);

  return (
    <Link href={`/blog/${post.slug}`} className="flex-1 min-w-0 bg-surface border border-line rounded-[10px] overflow-hidden pb-5 flex flex-col gap-2.5 hover:shadow-md transition">
      <div className="relative h-[240px] w-full bg-[#e7e9f1]">
        {img && <Image src={img} alt={post.featuredImage?.node?.altText || post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 416px" />}
        {category && (
          <span className="absolute top-3 left-2.5 bg-white rounded-[4px] px-2.5 py-[3px] text-[11px] font-extrabold uppercase text-muted">
            {category}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 px-4">
        <h3 className="text-[15px] font-semibold leading-[21px] text-text line-clamp-2">{post.title}</h3>
        <div className="flex items-center gap-2 text-[13px] font-medium text-muted">
          <span>{date}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-muted" />
          <span>{mins} min read</span>
        </div>
      </div>
    </Link>
  );
}