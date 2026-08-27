import Link from "next/link";
import { getRecentPosts } from "@/lib/graphql/queries/blog";
import BlogCard from "./BlogCard";

export default async function LatestBlog() {
  const posts = await getRecentPosts();
  if (!posts.length) return null;

  return (
    <section className="container-wrap py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-7">
        <h2 className=" font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          Latest from the Blog
        </h2>
        <Link href="/blog" className="flex items-center gap-[7px] text-[13px] font-semibold text-muted hover:text-brand">
          All Articles
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}