"use client";
import { useState, useEffect, useCallback } from "react";
import { formatDate } from "@/lib/utils/deal";

function cleanComment(html) {
    return html?.replace(/<[^>]*>/g, "").trim() ?? "";
}

export default function Comments({ contentId, initialCount = 0 }) {
    const [comments, setComments] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchComments = useCallback(async (after = null, append = false) => {
        setLoading(true);
        const params = new URLSearchParams({ contentId: String(contentId) });
        if (after) params.set("after", after);

        const res = await fetch(`/api/comments?${params.toString()}`);
        const data = await res.json();

        setComments((prev) => (append ? [...prev, ...data.comments] : data.comments));
        setCursor(data.pageInfo?.endCursor ?? null);
        setHasNext(data.pageInfo?.hasNextPage ?? false);
        setLoading(false);
    }, [contentId]);

    useEffect(() => { fetchComments(null, false); }, [fetchComments]);

    return (
        <div className="bg-white border border-line rounded-[16px] px-6 py-7 flex flex-col gap-6">
            <h2 className="text-[20px] font-semibold text-text tracking-[-0.2px]" style={{ fontFamily: "var(--font-body)" }}>
                Comments ({initialCount})
            </h2>

            {/* Comment form — UI only for now (posting wired later) */}
            <div className="flex flex-col gap-4">
                <textarea placeholder="Share your thoughts" className="bg-[#f4f5f9] border border-line rounded-[8px] px-4 py-3 text-[13px] min-h-[94px] resize-none outline-none focus:border-brand" />
                <div className="flex flex-col sm:flex-row gap-4">
                    <input placeholder="Name" className="flex-1 bg-[#f4f5f9] border border-line rounded-[8px] px-4 py-3 text-[13px] outline-none focus:border-brand" />
                    <input placeholder="Email (Not Published)" className="flex-1 bg-[#f4f5f9] border border-line rounded-[8px] px-4 py-3 text-[13px] outline-none focus:border-brand" />
                </div>
                <button className="bg-[#1c1c1c] text-white px-4 py-2 rounded-[8px] text-[15px] font-semibold self-start flex items-center gap-1.5">
                    Post Comment
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
            </div>

            {/* Comments list */}
            {loading && comments.length === 0 ? (
                <p className="text-muted text-[13px]">Loading comments…</p>
            ) : comments.length > 0 ? (
                <div className="flex flex-col">
                    {comments.map((c) => (
                        <div key={c.id} className="flex gap-3.5 items-start py-3.5 border-t border-line">
                            <div className="size-[54px] rounded-full bg-[#eeebfd] shrink-0 flex items-center justify-center text-[18px] font-semibold text-brand">
                                {c.author?.node?.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="flex items-baseline gap-2">
                                    <span className="text-[15px] font-semibold text-text">{c.author?.node?.name || "Anonymous"}</span>
                                    <span className="text-[12px] text-muted">{formatDate(c.date)}</span>
                                </p>
                                <p className="text-[13px] text-muted mt-1">{cleanComment(c.content)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted text-[13px] py-2">No comments yet. Be the first!</p>
            )}

            {/* Load more comments */}
            {hasNext && (
                <button onClick={() => fetchComments(cursor, true)} disabled={loading}
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-brand self-center disabled:opacity-50 cursor-pointer">
                    {loading ? "Loading…" : "Load more comments"}
                </button>
            )}
        </div>
    );
}