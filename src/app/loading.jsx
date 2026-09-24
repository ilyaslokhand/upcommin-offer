export default function Loading() {
    return (
        <>
            {/* Keeps the temporary loading document at least viewport-height */}
            <div className="min-h-[100svh]" aria-hidden="true" />

            {/* Covers all temporary layout movement */}
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                role="status"
                aria-live="polite"
                aria-label="Loading page"
            >
                <div className="flex flex-col items-center gap-3">
                    <span
                        className="size-10 animate-spin rounded-full border-[3px] border-line border-t-brand motion-reduce:animate-none"
                        aria-hidden="true"
                    />

                    <p className="text-[14px] font-semibold text-muted">
                        Loading…
                    </p>
                </div>
            </div>
        </>
    );
}