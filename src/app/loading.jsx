export default function Loading() {
    return (
        <main
            className="flex min-h-[100dvh] w-full items-start justify-center px-5 pt-24"
            aria-busy="true"
            aria-live="polite"
        >
            <div className="flex flex-col items-center gap-3">
                <span
                    className="size-10 animate-spin rounded-full border-[3px] border-line border-t-brand motion-reduce:animate-none"
                    aria-hidden="true"
                />

                <p className="text-[14px] font-semibold text-muted">
                    Loading…
                </p>

                <span className="sr-only">Loading page content</span>
            </div>
        </main>
    );
}