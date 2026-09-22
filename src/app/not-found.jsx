import Link from "next/link";

export default function NotFound() {
    return (
        <main className="container-wrap min-h-[65vh] flex items-center py-12">
            <div className="w-full max-w-2xl mx-auto text-center">
                <span className="inline-block rounded-full bg-brand-tint px-4 py-1.5 text-sm font-semibold text-brand">
                    Error 404
                </span>

                <h1
                    className="mt-5 font-bold text-text"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    We couldn&apos;t find that page
                </h1>

                <p className="mt-4 text-muted">
                    The link may be outdated, or the page may have moved. Explore the
                    latest deals or head back to the homepage.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/deals"
                        className="w-full sm:w-auto rounded-[5px] bg-brand px-6 py-3 font-semibold text-white hover:opacity-90 transition"
                    >
                        Browse latest deals
                    </Link>

                    <Link
                        href="/"
                        className="w-full sm:w-auto rounded-[5px] border border-line bg-surface px-6 py-3 font-semibold text-text hover:text-brand transition"
                    >
                        Back to homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}