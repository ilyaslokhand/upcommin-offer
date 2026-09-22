"use client";
import { useState, useEffect, useCallback } from "react";
import BlogCard from "@/components/common/BlogCard";

export default function BlogFeed({
    category = null,
    initialPosts = [],
    initialPageInfo = null,
}) {
    const hasInitialData = initialPageInfo !== null;

    const [posts, setPosts] = useState(initialPosts);
    const [cursor, setCursor] = useState(
        initialPageInfo?.endCursor ?? null
    );

    const [hasNext, setHasNext] = useState(
        initialPageInfo?.hasNextPage ?? false
    );

    const [loading, setLoading] = useState(
        !hasInitialData
    );

    // Add the category to every request when this feed is on a category page.
    const buildUrl = useCallback(
        (after = null) => {
            const params = new URLSearchParams();
            if (category) params.set("category", category);
            if (after) params.set("after", after);
            return `/api/blog?${params.toString()}`;
        },
        [category]
    );

    const fetchPosts = useCallback(async (after = null, append = false) => {
        setLoading(true);
        try {
            const res = await fetch(buildUrl(after));

            if (!res.ok) {
                throw new Error("Failed to fetch blog posts");
            }

            const data = await res.json();

            setPosts((previous) =>
                append ? [...previous, ...data.posts] : data.posts
            );
            setCursor(data.pageInfo?.endCursor ?? null);
            setHasNext(data.pageInfo?.hasNextPage ?? false);
        } catch (error) {
            console.error("Unable to load blog posts:", error);
        } finally {
            setLoading(false);
        }
    },
        [buildUrl]
    );

    // Fetch the first batch only when the server did not provide it.
    useEffect(() => {
        if (hasInitialData) return;

        let cancelled = false;

        async function loadInitialPosts() {
            try {
                const res = await fetch(buildUrl());

                if (!res.ok) {
                    throw new Error("Failed to fetch blog posts");
                }

                const data = await res.json();
                if (cancelled) return;

                setPosts(data.posts);
                setCursor(data.pageInfo?.endCursor ?? null);
                setHasNext(data.pageInfo?.hasNextPage ?? false);
            } catch (error) {
                if (!cancelled) console.error("Unable to load blog posts:", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadInitialPosts();
        return () => {
            cancelled = true;
        };
    }, [hasInitialData, buildUrl]);


    return (
        <div className="flex flex-col gap-8 items-center">
            {loading && posts.length === 0 ? (
                <p className="text-muted text-center py-10">Loading articles…</p>
            ) : posts.length ? (
                <div className="w-full grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-4 gap-5">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-muted text-center py-10">
                    No articles yet.
                </p>
            )}

            {hasNext && (
                <button
                    onClick={() => fetchPosts(cursor, true)}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-[15px] font-semibold text-text hover:text-brand transition disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Loading…" : "Load more articles"}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </button>
            )}
        </div>
    );
}