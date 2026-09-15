"use client";
import { useState, useEffect, useCallback } from "react";
import BlogCard from "@/components/common/BlogCard";

export default function BlogFeed({
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

    const fetchPosts = useCallback(async (after = null, append = false) => {
        setLoading(true);
        const params = new URLSearchParams();
        if (after) params.set("after", after);

        const res = await fetch(`/api/blog?${params.toString()}`);
        const data = await res.json();

        setPosts((prev) => (append ? [...prev, ...data.posts] : data.posts));
        setCursor(data.pageInfo?.endCursor ?? null);
        setHasNext(data.pageInfo?.hasNextPage ?? false);
        setLoading(false);
    }, []);

    useEffect(() => {
        // The server already provided the first posts,
        // so don't request them again.
        if (hasInitialData) return;

        let cancelled = false;

        async function loadInitialPosts() {
            try {
                const res = await fetch("/api/blog");

                if (!res.ok) {
                    throw new Error(
                        "Failed to fetch blog posts"
                    );
                }

                const data = await res.json();

                if (cancelled) return;

                setPosts(data.posts);
                setCursor(
                    data.pageInfo?.endCursor ?? null
                );
                setHasNext(
                    data.pageInfo?.hasNextPage ?? false
                );
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "Unable to load blog posts:",
                        error
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadInitialPosts();

        return () => {
            cancelled = true;
        };
    }, [hasInitialData]);


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
                <p className="text-muted text-center py-10">No articles yet.</p>
            )}

            {hasNext && (
                <button
                    onClick={() => fetchPosts(cursor, true)}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-[15px] font-semibold text-text hover:text-brand transition disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Loading…" : "Load more articles"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </button>
            )}
        </div>
    );
}