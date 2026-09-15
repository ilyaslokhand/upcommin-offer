import Breadcrumb from "@/components/common/Breadcrumb";
import BlogFeed from "@/components/blog/BlogFeed";
import { getPosts } from "@/lib/graphql/queries/blog";

export default async function BlogPage() {

    const { posts, pageInfo } = await getPosts({
        first: 20,
    });

    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
            ]} />

            <div className="container-wrap pt-4">
                <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
                    Latest Articles
                </h1>
            </div>

            <div className="container-wrap py-6">
                <BlogFeed
                    initialPosts={posts}
                    initialPageInfo={pageInfo}
                />
            </div>
        </div>
    );
}