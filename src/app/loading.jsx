export default function Loading() {
    return (
        <main
            className="flex min-h-[60vh] w-full items-center justify-center px-5"
            aria-busy="true"
            aria-live="polite"
        >
            <div className="flex flex-col items-center gap-3">
                <span
                    className="relative size-10 rounded-full border-[3px] border-line
            before:absolute before:inset-[-3px] before:rounded-full
            before:border-[3px] before:border-transparent
            before:border-t-brand before:animate-spin
            motion-reduce:before:animate-none"
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